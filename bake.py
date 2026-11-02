"""Put the fill sheet's answers into the built deck.

    python build.py
    python bake.py out/smif-materials-pitch.html "SMIF Linde fill sheet.xlsx"

Download the fill sheet first: File > Download > Microsoft Excel (.xlsx).
Needs: pip install openpyxl

Every row with something in "Your answer" goes into the deck:
  - gold boxes on the slides (IDs like cmix.2) are replaced with the answer,
    with "Source and date" shown when you hover over it
  - pitch basics (pitch.price, pitch.rating, owners.aaron.last), the three
    reasons (reason1.tag ...) and chart text (fcast.why.1, next.verdict.2 ...)
    are set in the deck's data before it starts
Rows for "Numbers to pull" (data.*) and backup slides that are not in this
deck are listed at the end so nothing is silently dropped.

The deck file is changed in place. Run build.py again to start from a clean deck.
"""
import html
import json
import pathlib
import re
import sys

MARK = "<!-- baked from fill sheet -->"
VERDICTS = {"play": "play", "option": "option", "watch": "watch", "pass": "pass"}
PILLAR_KEYS = {"tag", "h", "assume", "see", "worth", "go", "expect", "signal", "sell"}
OWNER_KEYS = {"gabriel": "G", "aaron": "A", "daniel": "D", "ryan": "R", "alexander": "X"}


def read_sheet(path):
    import openpyxl

    rows = {}
    wb = openpyxl.load_workbook(path, data_only=True)
    for ws in wb.worksheets:
        if ws.title.lower() == "start here":
            continue  # instructions and the example row
        cols = None
        for row in ws.iter_rows(values_only=True):
            cells = ["" if c is None else str(c).strip() for c in row]
            if cells and cells[0] == "ID":
                cols = {name: i for i, name in enumerate(cells)}
                continue
            if not cols or not cells or not cells[0] or "Your answer" not in cols:
                continue
            fid = cells[0]
            if fid.endswith(".example"):
                continue

            def col(name):
                i = cols.get(name)
                return cells[i] if i is not None and i < len(cells) else ""

            answer = col("Your answer")
            if answer:
                rows[fid] = {"answer": answer, "source": col("Source and date"),
                             "status": col("Status"), "tab": ws.title}
    return rows


def number(text):
    m = re.search(r"-?\d[\d,]*\.?\d*", text)
    if not m:
        raise ValueError(f"expected a number, got '{text}'")
    return float(m.group(0).replace(",", ""))


def slide_numbers(text, ids):
    out = []
    for part in re.split(r"[,;\s]+", text):
        if part.isdigit() and 1 <= int(part) <= len(ids):
            out.append(ids[int(part) - 1])
        elif part:
            raise ValueError(f"'{part}' is not a slide number from 1 to {len(ids)}")
    return out


def slide_id(text, ids, titles):
    t = text.strip().lower()
    if t.isdigit() and 1 <= int(t) <= len(ids):
        return ids[int(t) - 1]
    for i, (sid, title) in enumerate(zip(ids, titles)):
        if t in (sid.lower(), title.lower()):
            return sid
    raise ValueError(f"no slide called '{text}' (use its number, e.g. 12)")


def bake(deck_path, sheet_path):
    deck = pathlib.Path(deck_path)
    page = deck.read_text(encoding="utf-8")
    if MARK in page:
        sys.exit("This deck was already baked. Run python build.py first, then bake again.")

    rows = read_sheet(sheet_path)
    slides = re.findall(r'<section class="slide[^"]*"[^>]*data-id="([^"]+)"[^>]*data-title="([^"]+)"', page)
    ids, titles = [s[0] for s in slides], [html.unescape(s[1]) for s in slides]

    patch = {"pitch": {}, "pillars": {}, "owners": {}, "data": [], "plan": {}}
    done, skipped, problems = [], [], []

    for fid, row in sorted(rows.items()):
        ans = row["answer"]
        try:
            # 1. Gold boxes in the slide HTML
            pat = re.compile(r'<span class="fill" data-f="' + re.escape(fid) + r'">.*?</span>', re.S)
            if pat.search(page):
                tip = f' title="{html.escape(row["source"])}"' if row["source"] else ""
                page = pat.sub(lambda m: f'<span data-f="{fid}"{tip}>{html.escape(ans)}</span>', page)
                done.append(fid)
                continue

            parts = fid.split(".")
            # 2. Pitch basics
            if parts[0] == "pitch" and len(parts) == 2:
                k = parts[1]
                if k in ("price", "target"):
                    patch["pitch"][k] = number(ans)
                elif k == "rating":
                    r = ans.upper().split()[0]
                    if r not in ("BUY", "SELL"):
                        raise ValueError("rating must be BUY or SELL")
                    patch["pitch"][k] = r
                else:
                    patch["pitch"][k] = ans
            elif parts[0] == "owners" and len(parts) == 3 and parts[1] in OWNER_KEYS:
                patch["owners"].setdefault(OWNER_KEYS[parts[1]], {})[parts[2]] = ans
            # 3. The three reasons
            elif re.fullmatch(r"reason[123]", parts[0]) and len(parts) == 2:
                n = int(parts[0][-1])
                if parts[1] == "slides":
                    patch["plan"][n] = slide_numbers(ans, ids)
                elif parts[1] in PILLAR_KEYS:
                    val = slide_id(ans, ids, titles) if parts[1] == "go" else ans
                    patch["pillars"].setdefault(n - 1, {})[parts[1]] = val
                else:
                    raise KeyError
            # 4. Chart text inside the deck's DATA block
            elif fid == "macro.focus":
                patch["data"].append([["macro", "focus"], int(number(ans)) - 1])
            elif fid == "macro.ours":
                patch["data"].append([["macro", "ours"], ans])
            elif parts[0] == "fcast" and parts[1] in ("why", "signal") and len(parts) == 3:
                patch["data"].append([["fcast", parts[1], int(parts[2]) - 1], ans])
            elif parts[0] == "next" and parts[1] == "verdict" and len(parts) == 3:
                key = VERDICTS.get(ans.lower().split()[0])
                if not key:
                    raise ValueError("verdict must start with Play it now, Option value, Watch or Pass")
                patch["data"].append([["next", "t", int(parts[2]) - 1, "v"], key])
            elif parts[0] == "next" and parts[1] == "today" and len(parts) == 3:
                patch["data"].append([["next", "t", int(parts[2]) - 1, "today"], ans])
            # 5. Not something bake can place
            elif parts[0] == "data":
                skipped.append(f"{fid} (numbers to pull: Alexander enters these in src/widgets.js)")
                continue
            else:
                raise KeyError
            done.append(fid)
        except KeyError:
            skipped.append(f"{fid} (no gold box with this ID in the deck)")
        except ValueError as e:
            problems.append(f"{fid} [{row['tab']} tab]: {e}")

    script = (
        f"{MARK}\n<script>\n(function (F) {{\n"
        "  var P = window.PITCH, D = window.DATA, O = window.OWNERS, L = window.PLAN;\n"
        "  Object.keys(F.pitch).forEach(function (k) { P[k] = F.pitch[k]; });\n"
        "  Object.keys(F.pillars).forEach(function (i) { Object.assign(P.pillars[i], F.pillars[i]); });\n"
        "  Object.keys(F.owners).forEach(function (k) { var o = O[k]; Object.assign(o, F.owners[k]);"
        " if (F.owners[k].last && o.n.indexOf(' ') < 0) o.n = o.n + ' ' + F.owners[k].last; });\n"
        "  F.data.forEach(function (d) { var p = d[0], t = D; for (var i = 0; i < p.length - 1; i++) t = t[p[i]];"
        " t[p[p.length - 1]] = d[1]; });\n"
        "  Object.keys(F.plan).forEach(function (n) { n = +n; Object.keys(L).forEach(function (id) {"
        " var r = (L[id].r || []).filter(function (x) { return x !== n; });"
        " if (F.plan[n].indexOf(id) >= 0) r.push(n); L[id].r = r.sort(); }); });\n"
        "})(" + json.dumps(patch, ensure_ascii=False).replace("</", "<\\/") + ");\n</script>\n"
    )
    page = page.replace("\n</body></html>", "\n" + script + "</body></html>", 1)
    deck.write_text(page, encoding="utf-8")

    not_done = sorted(f for f in done if rows[f]["status"].lower() != "done")
    print(f"Baked {len(done)} answers into {deck}")
    if not_done:
        print(f"  {len(not_done)} of them are not marked Done yet: {', '.join(not_done)}")
    if skipped:
        print(f"\nLeft out ({len(skipped)}):\n  " + "\n  ".join(skipped))
    if problems:
        print(f"\nCould not use ({len(problems)}), fix these in the sheet and bake again:\n  " + "\n  ".join(problems))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit('Usage: python bake.py out/smif-materials-pitch.html "SMIF Linde fill sheet.xlsx"')
    bake(sys.argv[1], sys.argv[2])
