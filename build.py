"""Build the deck into one self-contained file: out/smif-materials-pitch.html

    python build.py

Combines src/slides.html, src/deck.css, src/engine.js, src/widgets.js,
gas-scene.js and the fonts in vendor/ into a single HTML file you can open
in any browser or email to someone. Fails on purpose if any source file
contains an em dash.
"""
import base64
import json
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

SOURCES = ["src/slides.html", "src/deck.css", "src/engine.js", "src/widgets.js", "gas-scene.js", "src/editor.js"]
EDITABLE_OUT = ROOT / "out" / "smif-materials-pitch-editable.html"


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


def inline_logos(js):
    """PITCH.logo / orgLogo may point at a file in vendor/logos/: embed it so the deck stays one file."""
    def to_data_uri(m):
        path = ROOT / m.group(2)
        if not path.exists():
            print(f"  note: {m.group(2)} not found, showing the name instead")
            return "null"
        mime = "image/svg+xml" if path.suffix == ".svg" else "image/" + path.suffix.lstrip(".").replace("jpg", "jpeg")
        return m.group(1) + f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii") + m.group(1)

    return re.sub(r"(['\"])(vendor/logos/[^'\"]+\.(?:png|jpg|jpeg|svg))\1", to_data_uri, js)


def build():
    check_em_dashes()
    scripts = "\n".join(f"<script>\n{read(p)}\n</script>" for p in THREE_JS)
    write(OUT, "\n".join([
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
        inline_logos(read("src/engine.js")),
        "</script>",
        "<script>",
        inline_logos(read("src/widgets.js")),
        "</script>",
        "",
        "</body></html>",
        "",
    ]))


def build_editable():
    """The copy published on claude.ai: same deck plus edit mode (src/editor.js).

    It is laid out the way claude.ai publishes a page (a fixed head, then the
    deck inside <body>), so Save in edit mode can republish the whole file.
    """
    check_em_dashes()
    deck = [*THREE_JS, "gas-scene.js"]
    scripts = "\n".join(f"<script data-deck>\n{read(p)}\n</script>" for p in deck)
    reset = BASE_CSS
    write(EDITABLE_OUT, "".join([
        "<!doctype html><html><head><meta charset=utf8>"
        '<meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">'
        f"<style>{reset}</style></head><body>",
        f"<title>{TITLE}</title>\n",
        f'<meta name="description" content="{DESCRIPTION}">\n',
        "<style>\n", inline_fonts(read("vendor/fonts.css")), "\n", read("src/deck.css"), "\n</style>\n",
        '<div id="viewport"><div id="stage">\n', read("src/slides.html"), "\n</div></div>",
        f"\n<script data-deck>\n{read('src/editor.js')}\n"
        f"DeckEdit.reset = {json.dumps(reset)};\nDeckEdit.capture();\n</script>\n",
        scripts, "\n",
        f"<script data-deck>\n{inline_logos(read('src/engine.js'))}\n</script>\n",
        f"<script data-deck>\n{inline_logos(read('src/widgets.js'))}\n</script>\n",
        "<script data-deck>\nDeckEdit.start();\n</script>\n",
        "</body></html>\n",
    ]))


def write(path, html):
    path.parent.mkdir(exist_ok=True)
    path.write_text(html, encoding="utf-8")
    slides = len(re.findall(r'<section class="slide', html))
    print(f"Built {path.relative_to(ROOT)} ({len(html) // 1024} KB, {slides} slides)")


if __name__ == "__main__":
    if "--editable" in sys.argv:
        build_editable()
    else:
        build()
