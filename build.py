"""Build the deck into one self-contained file: out/smif-materials-pitch.html

    python build.py

Combines src/slides.html, src/deck.css, src/engine.js, src/widgets.js,
gas-scene.js and the fonts in vendor/ into a single HTML file you can open
in any browser or email to someone. Fails on purpose if any source file
contains an em dash.
"""
import base64
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / "out" / "smif-materials-pitch.html"

TITLE = "SMIF Materials Pitch"
DESCRIPTION = "Interactive pitch deck for the FIU SMIF Materials sector pitch on Linde plc (LIN)."

# The 3D models need three.js r128. It is built into the deck, so the 3D slides work offline.
THREE_JS = ["vendor/three.min.js", "vendor/OrbitControls.js"]

# Page reset that the deck's CSS assumes.
BASE_CSS = (
    ":root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);"
    "padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}"
    "body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}"
    "img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}"
)

SOURCES = ["src/slides.html", "src/deck.css", "src/engine.js", "src/widgets.js", "gas-scene.js"]


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8").rstrip("\n")


def check_em_dashes():
    bad = []
    for rel in SOURCES:
        for n, line in enumerate(read(rel).split("\n"), 1):
            if "—" in line:
                bad.append(f"  {rel}:{n}: {line.strip()[:100]}")
    if bad:
        print("Build failed: em dashes found. Use a comma, colon or 'to' instead.\n" + "\n".join(bad))
        sys.exit(1)


def inline_fonts(css):
    def to_data_uri(m):
        data = base64.b64encode((ROOT / "vendor" / m.group(1)).read_bytes()).decode("ascii")
        return f"url(data:font/woff2;base64,{data})"

    return re.sub(r"url\((fonts/[^)]+\.woff2)\)", to_data_uri, css)


def build():
    check_em_dashes()
    scripts = "\n".join(f"<script>\n{read(p)}\n</script>" for p in THREE_JS)
    html = "\n".join([
        "<!doctype html>",
        '<html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
        f"<title>{TITLE}</title>",
        f'<meta name="description" content="{DESCRIPTION}">',
        f"<style>{BASE_CSS}</style>",
        "<style>",
        inline_fonts(read("vendor/fonts.css")),
        read("src/deck.css"),
        "</style>",
        "</head><body>",
        '<div id="viewport"><div id="stage">',
        "",
        read("src/slides.html"),
        "",
        "</div></div>",
        "",
        scripts,
        "<script>",
        read("gas-scene.js"),
        "</script>",
        "<script>",
        read("src/engine.js"),
        "</script>",
        "<script>",
        read("src/widgets.js"),
        "</script>",
        "",
        "</body></html>",
        "",
    ])
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    slides = len(re.findall(r'<section class="slide', html))
    print(f"Built {OUT.relative_to(ROOT)} ({len(html) // 1024} KB, {slides} slides)")


if __name__ == "__main__":
    build()
