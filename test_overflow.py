"""Flag any text that spills off a slide or gets cut off inside its box.

    python build.py
    python test_overflow.py              # check the deck as built
    python test_overflow.py out/smif-materials-pitch.html   # or any built/baked deck

Slides are a fixed 1600 x 900, so long text does not wrap onto a new page:
it runs off the edge or gets clipped. This opens every slide and reports
each piece of text that ends up outside the slide or outside its card.

Needs: pip install playwright, then: playwright install chromium
Set CHROMIUM_PATH to use a browser you already have installed.
"""
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent
DEFAULT = ROOT / "out" / "smif-materials-pitch.html"

# Runs inside the page for the active slide. Returns a list of problems.
FIND = """
(sec) => {
  const tol = 2, out = [];
  const stage = document.getElementById('stage').getBoundingClientRect();
  const scale = stage.width / 1600 || 1;
  const hasText = el => Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim());
  const label = el => {
    const t = (el.innerText || el.textContent || '').trim().replace(/\\s+/g, ' ');
    return t.length > 70 ? t.slice(0, 67) + '...' : t;
  };
  const seen = new Set();
  sec.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return;
    if (el.closest('svg, canvas, [aria-hidden="true"]')) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    // 1. Text running off the slide
    if (hasText(el) && (r.right > stage.right + tol || r.bottom > stage.bottom + tol ||
                        r.left < stage.left - tol || r.top < stage.top - tol)) {
      const px = Math.round(Math.max(r.right - stage.right, r.bottom - stage.bottom,
                                     stage.left - r.left, stage.top - r.top) / scale);
      const key = 'off:' + label(el);
      if (!seen.has(key)) { seen.add(key); out.push('runs ' + px + 'px off the slide: "' + label(el) + '"'); }
    }
    // 3. Text pushed out of its card and hidden underneath another card on the slide
    // (Skips 3D views, which layer their own labels, and the two faces of a flip card.)
    const flipFace = () => { for (let e = el; e && e !== sec; e = e.parentElement)
      if (getComputedStyle(e).backfaceVisibility === 'hidden') return true; return false; };
    if (hasText(el) && !el.closest('.g3host') && !flipFace()) {
      const x = r.left + Math.min(r.width / 2, 8), y = r.top + r.height / 2;
      const top = document.elementFromPoint(x, y);
      if (top && sec.contains(top) && top !== el && !el.contains(top) && !top.contains(el)) {
        const key = 'hid:' + label(el);
        if (!seen.has(key)) { seen.add(key); out.push('hidden under another box: "' + label(el) + '"'); }
      }
    }
    // 2. Text cut off inside a box that hides overflow (only text counts, not decoration)
    const clips = /(hidden|clip)/.test(cs.overflow + cs.overflowX + cs.overflowY);
    // 2b. Text cut short by a line clamp (it ends in an ellipsis instead of spilling)
    const lc = cs.webkitLineClamp || cs.getPropertyValue('-webkit-line-clamp');
    if (clips && lc && lc !== 'none' && el.scrollHeight > el.clientHeight + tol) {
      const key = 'clamp:' + label(el);
      if (!seen.has(key)) { seen.add(key); out.push('cut short to ' + lc + ' lines: "' + label(el) + '"'); }
    }
    if (clips && (el.scrollHeight > el.clientHeight + tol || el.scrollWidth > el.clientWidth + tol)) {
      el.querySelectorAll('*').forEach(t => {
        if (!hasText(t) || t.closest('svg, canvas, [aria-hidden="true"]')) return;
        const tr = t.getBoundingClientRect();
        if (!tr.width || !tr.height) return;
        const px = Math.round(Math.max(tr.right - r.right, tr.bottom - r.bottom, r.left - tr.left, r.top - tr.top) / scale);
        if (px <= tol) return;
        const key = 'clip:' + label(t);
        if (!seen.has(key)) { seen.add(key); out.push('cut off by ' + px + 'px inside its box: "' + label(t) + '"'); }
      });
    }
  });
  return out;
}
"""


def main():
    deck = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT
    if not deck.exists():
        sys.exit("Run python build.py first.")

    problems = []
    with sync_playwright() as p:
        exe = os.environ.get("CHROMIUM_PATH")
        browser = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
        page = browser.new_page(viewport={"width": 1600, "height": 900})
        page.goto(deck.resolve().as_uri())
        page.wait_for_function("window.__A && typeof window.__A.go === 'function'", timeout=10000)
        page.wait_for_timeout(500)
        slides = page.eval_on_selector_all("section.slide", "els => els.map(e => [e.dataset.id, e.dataset.title || e.dataset.id])")

        for i, (sid, title) in enumerate(slides):
            page.evaluate(f"window.__A.go({i})")
            page.wait_for_timeout(900)  # let entrance animations finish
            found = page.eval_on_selector(f'section.slide[data-id="{sid}"]', FIND)
            status = "OK" if not found else f"{len(found)} problem(s)"
            print(f"  {i + 1:2d}  {title:<38} {status}")
            for f in found[:3]:
                problems.append(f"Slide {i + 1} ({title}, {sid}): {f}")
            if len(found) > 3:
                problems.append(f"Slide {i + 1} ({title}, {sid}): ...and {len(found) - 3} more on this slide")
        browser.close()

    if problems:
        print("\nFAILED: text spills or gets cut off. Shorten the text on these slides:")
        for pr in problems:
            print("  " + pr)
        sys.exit(1)
    print(f"\nOK: no text spills off any of the {len(slides)} slides.")


if __name__ == "__main__":
    main()
