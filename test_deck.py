"""Open every slide of the built deck in a headless browser and check for errors.

    python build.py
    python test_deck.py

Needs: pip install playwright, then: playwright install chromium
Set CHROMIUM_PATH to use a browser you already have installed.
"""
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent
DECK = ROOT / "out" / "smif-materials-pitch.html"
SHOTS = ROOT / "out" / "shots"


def main():
    if not DECK.exists():
        sys.exit("Run python build.py first.")
    shots = "--shots" in sys.argv
    if shots:
        SHOTS.mkdir(parents=True, exist_ok=True)

    errors, offline = [], []
    with sync_playwright() as p:
        exe = os.environ.get("CHROMIUM_PATH")
        browser = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
        page = browser.new_page(viewport={"width": 1600, "height": 900})
        page.on("pageerror", lambda e: errors.append(f"[slide {current[0]}] {e}"))
        page.on("console", lambda m: m.type == "error" and errors.append(f"[slide {current[0]}] console: {m.text}"))
        page.on("requestfailed", lambda r: offline.append(r.url))
        current = [0]

        page.goto(DECK.as_uri())
        page.wait_for_function("window.__A && typeof window.__A.go === 'function'", timeout=10000)
        slides = page.eval_on_selector_all("section.slide", "els => els.map(e => [e.dataset.id, e.dataset.title || e.dataset.id])")

        for i, (sid, title) in enumerate(slides):
            current[0] = i + 1
            page.evaluate(f"window.__A.go({i})")
            page.wait_for_timeout(500)
            if not page.evaluate(f"document.querySelectorAll('section.slide')[{i}].classList.contains('active')"):
                errors.append(f"[slide {i + 1}] did not open ({title})")
            if shots:
                page.screenshot(path=str(SHOTS / f"{i + 1:02d}-{sid}.png"))
            print(f"  {i + 1:2d}  {title}")
        browser.close()

    # Without internet the 3D library can't load; that's expected offline, not a deck bug.
    if offline:
        print(f"\nNote: {len(offline)} file(s) could not load (no internet?): " + ", ".join(sorted(set(offline))))
        errors = [e for e in errors if "THREE" not in e and "ERR_" not in e and "Failed to load resource" not in e]

    if errors:
        print(f"\nFAILED: {len(errors)} error(s)")
        for e in errors:
            print("  " + e)
        sys.exit(1)
    print(f"\nOK: all {len(slides)} slides opened with no errors.")


if __name__ == "__main__":
    main()
