# SMIF Materials Pitch: Linde (LIN)

The interactive slide deck for the FIU SMIF Materials team's pitch on Linde plc (Nasdaq: LIN), presented to the investment committee on **Thursday, December 3, 2026** (to be confirmed with the professor).

**Live deck:** `[GitHub Pages link goes here once the repo is set up]`
**Fill sheet (words and numbers):** https://docs.google.com/spreadsheets/d/1L23-LMUrW2D_asj35BNkO9VRB62ysRj2feFtmR7NBQA/edit
**Google Drive (files, Bloomberg exports, PDFs):** https://drive.google.com/drive/folders/1KYzA6_Ho54VGtIHFcqJoHiwdiI2oOjsL

---

## Why this repo exists

The deck is one HTML file built from a few source files. Before this repo, every change went through one person. GitHub lets several of us edit the same deck without overwriting each other. It saves every version, shows who changed what, and lets us undo any mistake. Every time someone saves, the live link rebuilds itself about a minute later.

## Which tool do I use?

| You want to change... | Use | Why |
|---|---|---|
| Words or numbers on a slide (a headline, a gold [placeholder], a data point) | **The fill sheet** | It's the easiest place, and every number gets a source and a date. It goes into the deck every Wednesday. |
| Layout, a chart, the order of slides, a new or removed slide | **This repo**, through a pull request | These are code changes, so Alexander or Gabriel reviews them first. |
| A file you pulled (Bloomberg export, PDF, screenshot) | **The shared Google Drive folder**, in your own subfolder | GitHub is for the deck's code, not research files. Drive is also where everyone's Claude can read them. |

If you're not sure, post in the group chat: **"Slide #, what to change, why."**

### Research files on Google Drive

All research files go in the shared Google Drive folder (link at the top), not in this repo and not on SharePoint. Anyone with the link can open and edit it, so keep the link inside the team.

- **Upload:** drag files into your own subfolder (from your laptop or the Google Drive phone app). Filings, earnings transcripts and other docs everyone uses go in `Shared`.
- **Name files clearly:** `LIN 10-Q Q3 2026.pdf`, not `download (3).pdf`.
- **Convert Excel exports:** when you upload a Bloomberg `.xlsx`, open it with Google Sheets and save it as a Sheet. Claude reads Sheets more reliably than raw Excel files.
- **Let your Claude read the folder:** in Claude, go to **Settings > Connectors**, connect **Google Drive** and sign in with your Gmail. Open the folder link once while signed in so it shows up in your Drive. Then you can ask things like "summarize the Q3 10-Q in our SMIF Drive folder."

---

## Team

| Person | Owns | Role in this repo |
|---|---|---|
| Gabriel Castillo | Cover, the call, Linde at a glance, the question, macro, industry and next markets (slides 1-8), the close (21); backs up Ryan on growth (12-13) | Co-lead. Approves changes to the finance slides. |
| Alexander Jovanovic | Peer margins, pass-through, capex and cash, the free cash flow bridge, coordination (slides 14-17); backs up Aaron on the pre-mortem (18) | Co-lead. Approves changes and runs the Wednesday deck update. |
| Aaron Piz | Pre-mortem and valuation (slides 18-20); owns the valuation model and its reconciliation (backup) | Editor |
| Daniel Vazquez | End markets, contracts, the end-market forecast (slides 9-11) | Editor |
| Ryan Hernandez | Market size and the signed backlog (slides 12-13) | Editor |

---

## How to edit a slide (no install needed)

1. Open this repo on github.com and click into `src/`.
2. Open the file you need. Most text edits happen in `src/slides.html`.
3. Press `Ctrl+F` (or `Cmd+F` on a Mac) and search for the slide's ID or its headline. Each slide starts with a line like `<section ... data-id="cmix" ...>`.
4. Click the **pencil icon** at the top right of the file.
5. Make your change. Only change the text between tags. Leave anything inside `< >` alone unless you know what it does.
6. Click **Commit changes**, choose **"Create a new branch and start a pull request"**, give it a short name like `daniel-cmix-headline`, and click **Propose changes**.
7. In the pull request, write one line on what you changed and why, then tag Alexander or Gabriel.
8. Once it's approved and merged, the live deck updates in about a minute.

Tip: press `.` (the period key) on the repo page to open a full editor in your browser. It's handy when you're editing several files at once.

### Rules that keep the deck from breaking

- **Never edit `main` directly.** Always go through a pull request. Main is locked, so GitHub will push you to a pull request anyway.
- **One slide per pull request** when you can. Small changes are easy to review and easy to undo.
- **Keep the tags matched.** Every `<div>` needs its `</div>`. If a slide looks broken after your change, a tag is usually missing.
- **Keep text short.** Slides are a fixed 1600 x 900 size, so long text spills off the slide instead of wrapping onto a new page.
- **Do not type over a gold placeholder in the HTML.** Placeholders (`<span class="fill" data-f="...">`) are filled from the fill sheet. Write your answer in the sheet instead.
- **No em dashes** ( — ). The build fails on purpose if it finds one.

---

## What's in the repo

```
src/
  slides.html     Every slide: headlines, cards, gold placeholders and speaker notes. Most edits happen here.
  deck.css        The look: colors, fonts, spacing, card styles.
  engine.js       How the deck runs: navigation, timer, notes window, build mode, team plan, pitch basics (PITCH block).
  widgets.js      The interactive charts and sliders on each slide, and the sample data behind them (DATA block).
gas-scene.js      The 3D models (slide 6 and two backup slides).
vendor/           Fonts (Source Serif 4) and the 3D library (three.js), built into the deck so it works offline. Body text uses Arial.
build.py          Combines everything above into one file: out/smif-materials-pitch.html
bake.py           Puts fill sheet answers into the built deck.
test_deck.py      Opens every slide in a headless browser and checks for errors.
test_overflow.py  Flags any text that spills off a slide, gets cut off or ends up hidden under another box.
.github/workflows/build.yml   Builds the deck, opens every slide and checks for spilling text on each pull request and merge. Download the built deck from the run's page under the Actions tab.
```

### Slide IDs

Every slide has a short ID (`data-id`), and every gold placeholder has a fill ID (`data-f`, for example `cmix.2`). The fill ID matches a row in the fill sheet. To find one, open the live deck, press **B** (build mode) and hover over a gold box.

---

## Running it on your own computer (optional)

You only need this for big layout changes. You'll need Python 3.

```bash
git clone [repo URL]
cd [repo folder]
python build.py                                    # builds out/smif-materials-pitch.html
open out/smif-materials-pitch.html                 # Mac; on Windows, double-click the file
```

To check your change before you open a pull request:

```bash
pip install playwright
playwright install chromium
python test_deck.py        # every slide loads with no errors
python test_deck.py --shots   # also saves a screenshot of every slide to out/shots/
python test_overflow.py    # no text spills off a slide
```

To put the fill sheet into the deck: download the Google Sheet (File > Download > Microsoft Excel), then run:

```bash
pip install openpyxl
python build.py
python bake.py out/smif-materials-pitch.html "SMIF Linde fill sheet.xlsx"
python test_overflow.py    # check the answers fit on their slides
```

`bake.py` fills every gold box, the pitch basics (price, target, rating, date), the three reasons and the chart text from the sheet. It lists anything it left out: "Numbers to pull" rows (Alexander enters those in `src/widgets.js`) and rows for backup slides that are not in this deck. It also lists answers it could not use, like a verdict that isn't Play it now, Option value, Watch or Pass. Bake changes the built file, so run `build.py` again before baking a newer sheet.

---

## Using the deck while presenting

| Key | What it does |
|---|---|
| `→` / `←` | Next / previous slide |
| `N` | Speaker notes panel (current slide on the left, next slide on the right) |
| `P` | Notes in a separate window for a second screen |
| `S` | Start or stop the timer (the main run is 14:10 of the 15:00 slot) |
| `G` | Jump to any slide |
| `T` | Team plan: who owns each slide and how long it runs |
| `B` | Build mode: shows what each slide must prove and the fill ID on every gold box |
| `Q` | Presentation mode (the default: approved numbers, no sliders) or Q&A mode (every slider and what-if is back) |
| `F` | Full screen |
| `Backspace` | After a jump from an evidence link, back to the slide you jumped from |

With two screens set to extend, not mirror: press P on the laptop for the notes window, and F on the projector for full screen. N docks notes under the slide and shrinks it, so do not use N on a mirrored projector.

---

## Key dates

| Date | Milestone |
|---|---|
| Tue Nov 3 | Q3 refresh: update anything Linde's Q3 numbers change |
| Thu Nov 5 | First run-through, timer on |
| Tue Nov 10 | Final numbers: every row in your name says Done |
| Thu Nov 12 | Final review in class |
| Thu Nov 19 | Dress rehearsal 1 |
| Tue Dec 1 | Dress rehearsal 2, price refreshed |
| Thu Dec 3 | Pitch day (to be confirmed with the professor) |

Homework is due Tuesday at 11:59 pm, the deck is updated from the fill sheet every Wednesday, and we review together in class every Thursday.

---

*FIU Student Managed Investment Fund · Materials sector · Fall 2026. Educational project, not investment advice.*
# SMIFMATERIALS
