/* ================================================================
   DATA · one block per slide. sample:true shows a gold SAMPLE tag.
   Replace values with sourced numbers and set sample:false.
   ================================================================ */
window.DATA = {
  /* focus: the tile Gabriel talks about (0-3); ours: one line on what it means for Linde */
  macro: { sample: true, focus: 0, ours: null, tiles: [
    { k: '10Y Treasury yield', v: '4.9%', c: '+0.7 pts this year', st: 'warn', sw: 'Headwind', why: 'Higher long-term rates raise the discount rate on 15-20 year contracts and the cost of financing new plants.' },
    { k: 'US dollar (DXY)', v: '101', c: '−4% this year', st: 'good', sw: 'Tailwind', why: 'A weaker dollar lifts the dollar value of sales earned abroad. Most of the big gas companies sell more outside the US than inside.' },
    { k: 'ISM manufacturing', v: '49.5', c: 'Below 50 = shrinking', st: 'warn', sw: 'Watch', why: 'Factory activity drives volumes for merchant and packaged gas. On-site volumes are protected by take-or-pay minimums.' },
    { k: 'Industrial power price', v: '8.6¢/kWh', c: '+6% this year', st: 'ctx', sw: 'Passed on', why: 'Electricity is the largest running cost of an air separation plant. On-site contracts pass it to customers; merchant and packaged prices catch up with a lag.' }
  ]},
  stab: { sample: false,
    eps: [ { n: 'Industrial gases', lo: -7, hi: 21 }, { n: 'Specialty chemicals', lo: -11, hi: 50 }, { n: 'Basic and diversified chemicals', lo: -42, hi: 137 } ],
    covid: [ { n: 'Linde', v: -6, l: '≈ −6%, about half the median' }, { n: 'Materials peer median', v: -12, l: '−12%' } ]
  },
  modes: [
    { k: 'pipeline', n: 'On-site pipeline', c: '15-20 yr', p: 'Take-or-pay minimums (the customer pays even if it uses less) and energy cost passed through.' },
    { k: 'trucks', n: 'Bulk liquid (merchant)', c: '3-7 yr', p: 'Liquid delivered by truck to tanks at the customer. Prices reset more often.' },
    { k: 'cylinders', n: 'Packaged cylinders', c: '1-3 yr', p: 'Small customers such as welders and labs. Cylinder rental plus gas.' }
  ],
  structure: { big3: 76, sizes: { 94: 'MarketsandMarkets (2024)', 100: 'Linde’s own estimate, more than $100B a year', 122: 'Kings Research (2025)' },
    events: [
      { y: 1992, h: 'Praxair spun off from Union Carbide', b: 'Praxair becomes an independent US gas company. It later merges with Linde.' },
      { y: 2016, h: 'Air Liquide buys Airgas', b: 'Announced Nov 17, 2015, closed May 23, 2016: $143 a share, $13.4B including debt. Airgas was the last big US-listed independent.' },
      { y: 2018, h: 'Linde and Praxair merge', b: 'Closed October 2018. Regulators required asset sales to Messer and Nippon Sanso before approving it.' },
      { y: 2026, h: 'Air Liquide buys DIG Airgas (Korea)', b: 'Bought from a Macquarie fund for EUR 2.85B enterprise value, closed Jan 13, 2026.' }
    ]
  },
  /* logos: files in vendor/logos/ (built into the deck); a missing file shows the name instead */
  moat: { sample: true, peers: ['Linde', 'Air Products', 'Air Liquide'], tick: ['LIN', 'APD', 'AI'],
    logos: ['vendor/logos/linde.png', 'vendor/logos/air-products.png', 'vendor/logos/air-liquide.svg'], rows: [
    { n: 'On-site share of sales', v: [4, 5, 4], raw: ['23.8% of 2025 sales (Bloomberg FA)', '[x%]', '[x%]'] },
    { n: 'Signed backlog vs sales', v: [4, 3, 3], raw: ['$8.1B sale-of-gas backlog as of [quarter], about 24% of 2025 sales (register #7)', '[x%]', '[EUR 6B backlog vs sales]'] },
    { n: 'Operating margin', v: [5, 3, 3], raw: ['29.1% adjusted, 2025 (Bloomberg)', '[x%]', '[x%]'] },
    { n: 'Return on capital', v: [5, 2, 3], raw: ['11.5% GAAP, 24.2% Linde-adjusted, 2025 (Bloomberg, register #4)', '[x%]', '[x%]'] },
    { n: 'Pricing track record', v: [5, 4, 4], raw: ['25 years of positive pricing (register #4)', '[ ]', '[ ]'] }
  ]},
  threats: { sample: true, cards: [
    { h: 'Customers build their own plants', watch: '[On-site contract renewal rate]' },
    { h: 'Hydrogen projects nobody buys', watch: '[Project exit charges, cancelled projects]' },
    { h: 'Chip fabs recycle their helium', watch: '[Helium volumes and price]' },
    { h: 'An industrial recession hits merchant and packaged volumes', watch: '[Base volume growth]' }
  ]},
  buyers: [
    { k: 'fab', n: 'Chip fab', u: 'Ultra-pure nitrogen keeps every wafer step free of oxygen and moisture. Specialty gases etch and deposit the circuits.' },
    { k: 'hospital', n: 'Hospital', u: 'Medical oxygen for patients, delivered as liquid by truck or in cylinders.' },
    { k: 'steel', n: 'Steel mill', u: 'Oxygen is blown into the furnace to burn off carbon. Argon stirs and shields the molten metal.' },
    { k: 'refinery', n: 'Refinery and chemicals', u: 'Hydrogen strips sulfur out of fuels. Nitrogen keeps tanks and lines safe from fire.' },
    { k: 'food', n: 'Food and beverage', u: 'Nitrogen and CO2 flash-freeze food, carbonate drinks and fill packages so food keeps longer.' },
    { k: 'rocket', n: 'Launch pad', u: 'Liquid oxygen and liquid hydrogen are rocket propellants. Nitrogen and helium purge the systems.' },
    { k: 'workshop', n: 'Metal fabrication', u: 'Argon, CO2 and acetylene for welding and cutting, delivered in cylinders.' }
  ],
  snap: { sample: false, tiles: [
    ['Market cap', '$222.1B', 'Bloomberg, Oct 8, 2026'], ['Enterprise value', '$246.7B', 'market cap + debt + minorities \u2212 cash'], ['Revenue, last 12 months', '$35.4B', '+6.6% vs a year earlier'], ['Operating margin, adj.', '29.2%', 'last 12 months'],
    ['EPS, adj., 2026E', '$17.88', '+8.6% · consensus'], ['EV / EBITDA, 2026E', '17.4x', 'on consensus EBITDA of $14.2B'], ['Net debt / EBITDA', '1.8x', 'end of 2025'], ['Dividend per share', '$6.41', '2026E · $3.50 in 2019']
  ], regions: [ { n: 'Americas', v: 44.7, b: 15.2 }, { n: 'Europe, Middle East, Africa', v: 25.2, b: 8.5 }, { n: 'Asia Pacific', v: 19.6, b: 6.7 }, { n: 'Engineering', v: 6.6, b: 2.3 }, { n: 'Other', v: 3.9, b: 1.3 } ] },
  /* mix: Linde via register #7. g = latest growth where known (null = still to pull) */
  endm: { sample: false, defensive: 62, gLabel: 'Q2 2026 vs a year earlier', rows: [
    { n: 'Chemicals and energy', s: 21, g: null, d: false, u: 'Hydrogen and oxygen for refineries and chemical plants.' },
    { n: 'Manufacturing', s: 21, g: null, d: false, u: 'Welding, cutting, heat treating, glass and automotive.' },
    { n: 'Healthcare', s: 17, g: null, d: true, u: 'Medical oxygen, hospital gases and US home care (Lincare).' },
    { n: 'Metals and mining', s: 13, g: null, d: false, u: 'Oxygen and argon for steel, copper and other metals.' },
    { n: 'Food and beverage', s: 9, g: null, d: true, u: 'Freezing, carbonation and packaging gases.' },
    { n: 'Electronics', s: 9, g: 18, d: false, u: 'Ultra-pure nitrogen and specialty gases for chip fabs. Fastest-growing market in Q2 2026.' },
    { n: 'Other', s: 10, g: null, d: false, u: 'Aerospace, space, water treatment, labs and more.' }
  ]},
  /* long: take-or-pay (the first big number); multi: on a multi-year contract, 3+ yr (the second) */
  cmix: { sample: false, segs: [
    { n: 'On-site', v: 23.8, b: 8.1, yrs: '15-20 yr', long: true, multi: true, c: '#6B432B', p: 'Take-or-pay minimums and energy pass-through. The most protected revenue. Up from 22.2% of sales in 2019.' },
    { n: 'Merchant bulk', v: 29.9, b: 10.2, yrs: '3-7 yr', long: false, multi: true, c: '#A57C61', p: 'Liquid by truck. Prices reset every few years; energy is passed on with a lag.' },
    { n: 'Packaged', v: 34.9, b: 11.9, yrs: '1-3 yr', long: false, c: '#C9B3A3', p: 'Cylinders for small customers. Most sensitive to the industrial cycle, but the largest piece.' },
    { n: 'Engineering and other', v: 11.3, b: 3.9, yrs: 'per project', long: false, c: '#2B5780', p: 'Engineering ($2.3B in 2025) builds plants for others: lumpy and lower margin, but it wins future gas contracts.' }
  ]},
  tam: { sample: true, themes: [
    { n: 'AI and chips', st: [ ['Chipmaker capex, 2032 (BI core case)', 262], ['Electronics gases spend', 18], ['Share we can serve', 6], ['Our revenue today', 3.1] ], g: '7.5% a year (BI core case)', how: ['Headline: Bloomberg Intelligence chip capex outlook (register #5).', 'Gas slice: [electronics gases market, Linde and Air Liquide disclosures].', 'Our share: [fabs within Linde\u2019s pipeline reach].', 'Revenue: about 9% of Linde\u2019s 2025 sales of $34.0B (register #7, Bloomberg).'] },
    { n: 'Space', st: [ ['Global launch market', 15], ['Propellants and gases', 2], ['Share we can serve', 1.3], ['Our revenue today', 0.5] ], g: '[double digits]', how: ['Headline: [launch market estimate].', 'Gas slice: [ ].', 'Our share: Linde supplies 65-75% of launches (register #4).', 'Revenue: Linde has invested about $0.5B and expects a $1B business (register #4); revenue today [ ].'] },
    { n: 'Clean energy', st: [ ['Clean hydrogen and carbon capture', 40], ['Gas company addressable', 10], ['Share we can serve', 3], ['Our revenue today', 0.8] ], g: '[slowed: register #6 caution]', how: ['Headline: [hydrogen market estimate].', 'Gas slice: [ ].', 'Our share: [contracted projects only].', 'Revenue: [ ].'] },
    { n: 'Healthcare', st: [ ['Medical gases and home care', 30], ['Gas and supply spend', 14], ['Share we can serve', 6], ['Our revenue today', 5.8] ], g: '[x% a year]', how: ['Headline: [medical gas market estimate].', 'Gas slice: [ ].', 'Our share: [ ].', 'Revenue: about 17% of Linde\u2019s 2025 sales of $34.0B (register #7, Bloomberg).'] }
  ]},
  /* end-market forecasts, same order as endm.rows: growth % a year for the next three years.
     why / signal: the team's one line of evidence and the signal that would change the view, per market (null = placeholder) */
  fcast: { sample: true, start: 'base',
    why: [null, null, null, null, null, null, null],
    signal: [null, null, null, null, null, null, null],
    scen: { bear: [-2, -3, 3, -5, 2, 4, -1], base: [2, 2, 4, 0, 3, 12, 2], bull: [4, 4, 5, 3, 4, 18, 3] },
    ind: ['US chemical output (ACC), refinery utilization (EIA)', 'ISM manufacturing PMI, US industrial production (Fed G.17)', 'Hospital admissions, Medicare home-oxygen rates (CMS)', 'Global steel output (worldsteel), US steel capacity use (AISI)', 'Food manufacturing output, US CO2 supply', 'Fab equipment spending (SEMI), chipmaker capex guidance', 'Aerospace build rates, launch cadence']
  },
  /* new industries that run on gas. x = years until it matters for us, y = new gas demand at scale (0 low to 1 high) */
  next: { sample: true, t: [
    { n: 'AI and chips', x: 2, y: .78, v: null, today: 'Electronics is about 9% of sales (about $3.1B in 2025) and grew 18% in Q2 2026. Linde added a ~$1B Phoenix fab expansion to its backlog in July 2026.', gases: ['Ultra-pure nitrogen', 'Hydrogen', 'Argon', 'Etch gases (NF3, WF6)', 'Neon'], how: 'Chip fabs are among the biggest single users of industrial gas. Ultra-pure nitrogen blankets every step, and specialty gases etch and deposit the circuits. Gas use per wafer rises at the most advanced chips.', src: 'Register #4 (gas intensity at advanced nodes), #5 (chip capex), #7 (Phoenix); Q2 2026 call' },
    { n: 'Quantum computing', x: 8, y: .17, v: null, gases: ['Helium-3', 'Helium-4', 'Liquid nitrogen'], how: 'Most quantum computers sit inside dilution refrigerators that reach near absolute zero with a sealed mix of helium-3 and helium-4. Newer "dry" systems need little liquid helium refilling, so volumes stay small; the value is in scarce helium.', src: 'Register #3 (helium supply after the Qatar outage)' },
    { n: 'Robotics', x: 4.3, y: .38, v: null, gases: ['Argon', 'CO2', 'Nitrogen', 'Oxygen'], how: 'Robots are built from precision-cut and welded metal, plus chips and batteries. That means argon and CO2 for welding and nitrogen or oxygen for laser cutting, so demand grows with factory automation, mostly through packaged and merchant gas.', src: '[industry source]' },
    { n: 'Bioengineering', x: 3.5, y: .3, v: null, gases: ['Liquid nitrogen', 'CO2', 'Oxygen'], how: 'Cell therapies, biobanks and IVF clinics store living cells in liquid nitrogen at about \u2212196 \u00B0C. CO2 keeps incubators at the right acidity, and oxygen feeds the cells growing in bioreactors.', src: '[industry source]' },
    { n: 'Space', x: 2.5, y: .34, v: null, today: 'Supplies 65-75% of all space launches, has invested about $0.5B in rocket propellants and expects a $1B business within a few years.', gases: ['Liquid oxygen', 'Liquid hydrogen', 'Helium', 'Nitrogen'], how: 'Rockets burn liquid oxygen with a fuel such as kerosene, methane or liquid hydrogen. Helium and nitrogen pressurize and purge the systems. ', src: 'Register #4 (Linde Q4 2025 call)' },
    { n: 'Clean energy', x: 6.5, y: .78, v: null, today: 'About two-thirds of the record $10B total project backlog supports contracted clean-energy projects (Feb 2026 call). The sale-of-gas backlog charted on the backlog slide is a narrower measure.', gases: ['Hydrogen', 'Captured CO2', 'Oxygen'], how: 'Hydrogen for refining, ammonia and clean fuels, plus capturing CO2. It is the largest potential market, but forecasts have been cut for lack of buyers, and Air Products cancelled its Louisiana project in June 2026.', src: 'Register #6 (hydrogen caution), #7 (APD project exits)' }
  ]},
  backlog: { sample: true, q: [ ['Q1 25', 6.8], ['Q2 25', 7.0], ['Q3 25', 7.2], ['Q4 25', 7.1], ['Q1 26', 7.4], ['Q2 26', 8.1] ],
    proj: [
      { n: 'Fab gas supply A', m: 'Electronics', y: 2027, c: 1000, r: 'US' }, { n: 'Fab gas supply B', m: 'Electronics', y: 2027.5, c: 600, r: 'Asia' },
      { n: 'Steel plant oxygen', m: 'Metals', y: 2026.5, c: 350, r: 'India' }, { n: 'Launch propellants', m: 'Space', y: 2026.8, c: 250, r: 'US' },
      { n: 'Chemicals park', m: 'Chemicals', y: 2027.8, c: 450, r: 'China' }, { n: 'Clean hydrogen', m: 'Clean energy', y: 2028.5, c: 900, r: 'US Gulf' },
      { n: 'Hospital network', m: 'Healthcare', y: 2026.3, c: 120, r: 'Europe' }
    ]},
  cat: { sample: true, ev: [
    { d: 2026.83, l: 'Q3 earnings', h: 'Q3 2026 results', x: 'Management promised details of cost cuts on this call (Q2 2026 call). [What else we expect: backlog, margin]', w: '[A backlog decline or a guidance cut]' },
    { d: 2027.0, l: 'Lincare', h: 'Lincare review: sell part or all of the US home-healthcare unit', x: '[What a sale would do to margins and EPS]', w: '[ ]' },
    { d: 2027.1, l: 'Q4 earnings', h: 'Q4 2026 results and 2027 EPS guidance', x: '[ ]', w: '[ ]' },
    { d: 2027.33, l: 'Q1 earnings', h: 'Q1 2027 results', x: '[ ]', w: '[ ]' },
    { d: 2027.5, l: 'Start-ups', h: 'Backlog start-ups: 20+ projects (~$1.3B) from late 2026 (Q2 2026 call)', x: '[ ]', w: '[ ]' },
    { d: 2027.75, l: 'Space', h: '[Space reported as its own end market once big enough (Q2 2026 call)]', x: '[ ]', w: '[ ]' }
  ]},
  /* Timing from the Q3 2026 call (CFO): on-site energy is recovered in the current month; merchant and packaged with a 3 to 6 month lag.
     Linde does not disclose energy as a share of sales: 30% is illustrative (10-K: energy is 'the single largest cost item'). */
  pass: { energyShare: 30, otherCost: 45, modes: [ { k: 'on', n: 'On-site', pt: 1, d: 'Full pass-through, immediately.' }, { k: 'mer', n: 'Merchant bulk', pt: 0.6, d: 'Price formulas catch up after a 3 to 6 month lag, so about 60% comes back in year one.' }, { k: 'pkg', n: 'Packaged', pt: 0.6, d: 'Surcharges and list prices, also a 3 to 6 month lag: about 60% back in year one.' } ] },
  /* Bloomberg FA, pulled Oct 8, 2026. GAAP figures include Praxair merger amortization. */
  marg: { modes: {
    adj: { t: 'Operating margin, Bloomberg adjusted, %', years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026E', '2027E'], est: 7, series: [ { n: 'Linde', c: '#6B432B', v: [18.68, 21.30, 22.55, 22.95, 26.88, 28.66, 29.14, 29.65, 30.57] },
      /* Air Products: company-reported adjusted operating margin, fiscal years to Sept 30 (10-K, annual reports, sec.gov).
         2019-21 computed from reported segment operating income / sales. GAAP is left out: 2024 includes the LNG sale gain
         (36.9% GAAP margin) and 2025 $3.7B of project-exit charges (-7.3%). */
      { n: 'Air Products', c: '#2B5780', v: [24.33, 24.88, 21.97, 19.00, 21.74, 24.36, 23.74, null, null] } ] },
    om: { t: 'Operating margin, GAAP, %', years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'], series: [ { n: 'S&P 500 Materials', c: '#C9B3A3', v: [10.05, 6.91, 15.57, 15.26, 12.48, 10.95, 11.39] }, { n: 'Linde', c: '#6B432B', v: [10.39, 12.19, 15.44, 15.35, 23.70, 25.43, 25.58] } ] },
    roc: { t: 'Return on capital, GAAP, %', years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'], series: [ { n: 'S&P 500 Materials', c: '#C9B3A3', v: [5.45, 2.10, 10.34, 10.36, 7.84, 6.02, 4.90] }, { n: 'Linde', c: '#6B432B', v: [3.42, 4.07, 6.32, 7.18, 11.07, 11.55, 11.46] } ] }
  }},
  /* Linde 10-K FY2025 cash flow statement, $B. Net borrowing = debt increases (decreases), net. Other, net is computed: acquisitions, other investing, NCI and other, cash build, less divestitures and FX. */
  uses: { sample: false, items: [ ['Operations', 10.35], ['Net borrowing', 2.91], ['Capex', -5.26], ['Dividends', -2.81], ['Buybacks', -4.58] ] },
  risks: { sample: true, r: [
    { n: 'Industrial recession cuts merchant and packaged volumes', p: .55, i: .62 },
    { n: 'Energy spike not fully passed through', p: .45, i: .38 },
    { n: 'Clean-hydrogen projects written off', p: .3, i: .8 },
    { n: 'Chip spending slows, fab projects slip', p: .38, i: .55 },
    { n: 'Helium price falls back', p: .72, i: .22 },
    { n: 'Higher rates lower the valuation multiple', p: .62, i: .45 }
  ]},
  /* fcf0 = 2025 free cash flow per share (Bloomberg). price \u2248 market cap \u00F7 shares, Oct 8, 2026. Growth, WACC and terminal growth are sample inputs for Gabriel's model. g1 (the 2019-2025 pace) stands in for our growth on slides 22-24 only while PITCH.growth is unset and the bridge is still sample data. */
  val: { sample: true, price: 480, fcf0: 10.84, g1: 13.9, years: 10, w: 7.8, g: 2.8, hist: 13.9 },
  /* cash flow bridge: % a year each driver adds to free cash flow per share, 2025 to 2029. 'link' = taken from the end-market forecast */
  /* Driver values, % a year added to free cash flow per share, 2025-2029. 2025 base: operating cash flow $10.35B, capex $5.26B,
     free cash flow $5.09B (10-K). New plants: $7.9B sale-of-gas backlog (Q3 2026 10-Q) x 35% sales per $ of capex (mgmt range
     20-50%, Q2 2026 call) / 4 years = $0.69B sales a year at the 2025 cash margin (30.5%) = $0.21B a year. Margin: +40 bps a year
     (mgmt 30-50, Q4 2025 call) on $34.0B sales after 22.4% tax = $0.11B. Capex: $5.26B to $6.15B by 2029 (Gabriel's model; 2026
     guide $5.5-6.0B) = $0.22B more a year. Shares: diluted count -2.05% in 2025 (10-K). End markets: slide 11 x cash leverage. */
  bridge: { sample: false, years: 4, d: [
    { k: 'em', n: 'End markets', s: 'slide 11 forecast x2 cash leverage', v: null, link: 'fcast' },
    { k: 'bl', n: 'New plants', s: '$7.9B backlog starting up', v: 4.1 },
    { k: 'mg', n: 'Margin', s: '+40 bps a year (mgmt 30-50)', v: 2.1 },
    { k: 'cx', n: 'Capex', s: '$5.3B to ~$6.2B by 2029', v: -4.4 },
    { k: 'sh', n: 'Fewer shares', s: 'diluted shares -2% a year', v: 2.1 }
  ]},
  /* pre-mortem odds: chance of each story by 2029, % */
  premortem: { sample: true, p: [20, 10, 10] },
  scen: { sample: true, s: [
    { k: 'bear', n: 'Bear', v: 400, p: 25, a: '[Industrial recession: volumes \u22125%, margin \u22122 pts, multiple de-rates]' },
    { k: 'base', n: 'Base', v: 520, p: 50, a: '[Backlog starts on time, pricing tracks inflation]' },
    { k: 'bull', n: 'Bull', v: 620, p: 25, a: '[Electronics and space beat plan, Lincare sold at a good price]' }
  ], ff: [ ['52-week range', 420, 495], ['Analyst targets', 470, 590], ['Comps, EV/EBITDA', 440, 540],
    ['DCF, WACC 7-9%', null, null], /* null = computed by the deck's own dcf() at our FCF growth (PITCH.growth, else the slide 20 bridge) and val's long-run growth; type numbers here to override */
    ['Our scenarios', 400, 620] ] },
  /* FY2025, GAAP basis. Linde and the sector: Bloomberg FA benchmark (Oct 8, 2026). null = still to pull. */
  comps: { cols: ['Company', 'P/E', 'EV/EBITDA', 'Price/book', 'Op. margin', 'Return on capital', 'Net debt/EBITDA'], fmt: ['', 'x', 'x', 'x', '%', '%', 'x'],
    rows: [ ['Linde (LIN)', 25.91, 17.39, 5.17, 25.58, 11.46, 1.79], ['S&P 500 Materials', 24.30, 13.99, 2.88, 11.39, 4.90, 2.17], ['Air Products (APD)', null, null, null, null, null, null], ['Air Liquide (AI FP)', null, null, null, null, null, null], ['Nippon Sanso (4091 JP)', null, null, null, null, null, null] ] },
  sources: [
    ['1', 'BI, "Industrial Gases’ Stability Is Unique in Materials"', 'Nov 8, 2022', 'Stale: business-model facts only', 'EPS stability, contract tiers, 150-mile trucking range'],
    ['2', 'BI, "Linde’s Diverse Markets Mute Drag From Materials Downturn"', 'Oct 30, 2023', 'Moderately stale', 'Covid volume test, end-market mix (2021)'],
    ['3', 'Bloomberg Economics, "Chipmakers to Stay Afloat on US Helium for Now"', 'Jun 15, 2026', 'Fresh', 'Helium supply shock, recycling at fabs'],
    ['4', 'Linde Q4 2025 earnings call summary (AI-generated)', 'Feb 5, 2026', 'Recent: verify against transcript', 'Guidance, backlog, pricing, space'],
    ['5', 'BI, Semiconductor capital-equipment outlook', 'Feb 28, 2024', 'Stale-ish, long-range forecast', 'Chip capex $262B by 2032 (core)'],
    ['6', 'BI, AI Infrastructure 2025 Outlook', 'Feb 12, 2025', 'Stale-ish', 'Data-center spend, hydrogen caution'],
    ['7', 'Ryan Hernandez, "Industrial Gases: The Big Three"', 'Sep 24, 2026', 'Fresh', 'Market size, structure, deals, backlogs, guidance'],
    ['8', 'SMIF Equities Screener: Materials', 'Sep 2026', 'Fresh', 'Eligible universe; only LIN and APD are gas names'],
    ['9', 'Bloomberg FA: Linde (LIN US) statements, segments, ratios and the S&P 500 Materials benchmark', 'Oct 8, 2026', 'Fresh', 'Snapshot, regions, supply-mode mix, margins, returns, cash flow, comps'],
    ['10', 'Linde Q2 2026 earnings call', 'Jul 31, 2026', 'Fresh: verify against the transcript', 'Electronics +18%, Lincare review, cost cuts, project start-ups'],
    ['+', '[Add each new source here]', '[date]', '[freshness]', '[what it supports]']
  ]
};

/* explanations for anything clicked in the 3D model */
window.UNIT_INFO = {
  intake: 'Outside air is the raw material and it costs nothing. The filter house removes dust before compression.',
  compressor: 'Big electric motors squeeze the air. Electricity is the largest running cost of the whole plant.',
  coldbox: 'Inside this insulated tower, liquid air is distilled. Nitrogen boils off at −196 °C, argon at −186 °C, oxygen at −183 °C.',
  tanks: 'Liquid product waits here for trucks. Storing liquid lets the plant keep running when demand dips.',
  pylons: 'Grid power feeds the compressors. On-site contracts pass power cost changes to the customer.',
  pipeline: 'Gas flows straight to a big customer next door, under a 15-20 year take-or-pay contract.',
  trucks: 'Bulk liquid goes by truck to mid-size customers on 3-7 year contracts.',
  cylinders: 'Small customers buy gas in cylinders on 1-3 year terms, often with a cylinder rental fee.',
  ring: 'Liquid gas is heavy and cold to move. Trucking only pays within about 150 miles, so every plant serves a local market.',
  fab: 'Chip fabs need huge volumes of ultra-pure nitrogen plus specialty gases. Gas use per wafer rises at advanced nodes.',
  steel: 'Steelmakers blow oxygen into the furnace to burn off carbon. Usually supplied by pipeline on long contracts.',
  refinery: 'Refineries use hydrogen to strip sulfur from fuels and nitrogen to keep equipment safe.',
  hospital: 'Hospitals cannot run out of medical oxygen, so supply security matters more than price.',
  food: 'Nitrogen and CO2 freeze, carbonate and package food and drinks.',
  rocket: 'Launches burn liquid oxygen and hydrogen; nitrogen and helium purge the lines.',
  workshop: 'Welders and fabricators buy argon, CO2 and acetylene in cylinders.',
  hq: 'Customers pay every month. Long contracts with minimum volumes make this cash steady.',
  newplant: 'A new plant costs cash for 2-3 years before start-up, then earns for 15-20 years: the J-curve.',
  passthru: 'When power costs rise, on-site contracts bill the change to the customer, so profit dollars hold.'
};

(function(){
'use strict';
const A = window.__A; const {RM, $, $$, S, T, H, esc, lin, clamp, usd, sg, pct, mmss, clear, F, tween, rng, pick, showTip, hideTip, hov, gridY, C, samp, INIT} = A;
const D = window.DATA;
const SHORT = () => window.PITCH.short || window.PITCH.ticker || 'the company';
/* status label on an exhibit: kind 'fc' = team forecast, otherwise reported data */
function srcok(sl, text, sel, kind){ $$(sel || '.samp', sl).forEach(x => { x.className = 'samp ' + (kind === 'fc' ? 'src-fc' : 'src-ok'); x.textContent = (kind === 'fc' ? 'Team forecast · ' : 'Reported · ') + text; }); }
const FL = s => esc(s).replace(/\[([^\]]*)\]/g, '<span class="fill">[$1]</span>');

/* ---- the call ---- */
INIT.call = sl => {
  const box = $('#pillars', sl);
  const LB = ['Reason 1', 'Reason 2', 'Reason 3'];
  window.PITCH.pillars.forEach((p, i) => {
    const b = H('button', {type: 'button', class: 'pillar'}, '<div class="pn">' + (i + 1) + '</div><div class="pb"><span class="ptag">' + F(p.tag, '2-3 word tag') + '</span><h3>' + F(p.h, LB[i] + ': a short headline') + '</h3><div class="pr"><span>Market assumes</span><span>' + F(p.assume, 'what the price implies') + '</span><span>We see</span><span>' + F(p.see, 'our evidence') + '</span><span>Worth</span><span>' + F(p.worth, '$ per share') + '</span></div><span class="go">Go to the evidence →</span></div>', box);
    b.addEventListener('click', e => { if (e.detail > 0 && !e.target.closest('.go')) return; const k = A.idx(p.go); if (k >= 0) A.jump(k); });
  });
};

/* ---- agenda ---- */
INIT.agenda = sl => {
  const box = $('#agendaCards', sl);
  const AG = [ ['macro', 'Industry', 'Macro in thirty seconds, then why industrial gases and who wins.'], ['buyers', 'Linde', 'Customers, end markets, our forecast, contracts.'], ['next', 'Growth', 'Next markets, market size by theme, signed backlog.'], ['money', 'The money', 'Pass-through, margins, capex and the cash flow bridge.'], ['premortem', 'Risks', 'How we could be wrong, and the odds.'], ['implied', 'Valuation', 'What the price assumes and what it is worth.'] ];
  AG.forEach((a, n) => {
    const i = A.idx(a[0]); if (i < 0) return;
    const sec = A.SECS.find(s => s.a <= i + 1 && s.b >= i + 1);
    let secs = 0; for (let k = sec.a - 1; k < sec.b; k++) secs += A.meta(k).t || 0;
    const own = window.OWNERS[A.meta(i).o];
    const b = H('button', {type: 'button', class: 'agc'}, '<div class="agn"><span>' + (n + 1) + '</span><small>' + mmss(secs) + '</small></div><div class="agb"><h3></h3><p></p><span class="agl"></span></div>', box);
    $('h3', b).textContent = a[1]; $('p', b).textContent = a[2]; $('.agl', b).textContent = own.s + ' · ' + (sec.a === sec.b ? 'slide ' + sec.a : 'slides ' + sec.a + '-' + sec.b) + ' →';
    b.addEventListener('click', () => A.jump(i));
  });
};

/* ---- the question: what the price needs vs what we expect, and the roadmap ---- */
INIT.question = sl => {
  const v = D.val, P = window.PITCH, price = priceNow();
  const imp = impG(price, v.w / 100, v.g / 100) * 100;
  // our growth: PITCH.growth, else the bridge once its drivers are ours (never the 2019-2025 stand-in)
  const ours = A.ourGrowthNow(), ourT = P.growth != null && P.growth !== '' ? P.growth : ours == null ? null : ours.toFixed(1) + '%';
  const TL = [
    { k: 'The price needs', v: imp.toFixed(1) + '%', c: 'free cash flow growth a year for ten years, at about ' + usd(price) + ' a share', cls: 'need' },
    { k: SHORT() + ' delivered', v: v.hist + '%', c: 'free cash flow per share growth a year, 2019-2025' },
    { k: 'We expect', v: ourT, c: ours == null ? 'free cash flow growth a year, from our model' : sg(ours - imp, 1, ' pts') + ' vs what the price needs', cls: 'ours', f: 'x% a year' }
  ];
  const box = $('#qTest', sl);
  TL.forEach((t, i) => {
    H('div', {class: 'qt ' + (t.cls || '')}, '<span class="tk">' + esc(t.k) + '</span><span class="tv">' + F(t.v, t.f || '[ ]') + '</span><span class="tc">' + esc(t.c) + '</span>', box);
    if (i === 0) H('div', {class: 'qvs'}, 'vs', box);
  });
  // the same numbers on one line: where the price sits against history and us
  const svg = $('#qLine', sl), x0 = 60, x1 = 1400, X = lin(0, 20, x0, x1), yl = 86;
  const pts = [[imp, 'Price needs ' + imp.toFixed(1) + '%', C.gold, -1], [v.hist, 'Delivered ' + v.hist + '%', C.steel, 1], [ours, ours == null ? '' : 'We expect ' + ourT, C.navy, 1]];
  const live = pts.filter(q => q[0] != null && !isNaN(q[0])).sort((a, b) => a[0] - b[0]);
  // tick labels near a lower stem are skipped (the tick stays) so no stem cuts through a number
  const stems = live.filter(q => q[3] > 0).map(q => X(clamp(q[0], 0, 20)));
  S('line', {x1: x0, x2: x1, y1: yl, y2: yl, stroke: C.light, 'stroke-width': 3}, svg);
  for (let k = 0; k <= 20; k += 2){ S('line', {x1: X(k), x2: X(k), y1: yl - 6, y2: yl + 6, stroke: C.light, 'stroke-width': 2}, svg); if (stems.every(sx => Math.abs(sx - X(k)) >= 20)) T('text', {x: X(k), y: yl + 30, 'text-anchor': 'middle', class: 'ax'}, k + '%', svg); }
  // labels go in the lowest free row on their side (two rows a side), so close values never overprint
  const taken = {up: [[], []], dn: [[], []]};
  const placed = live.map(q => {
    const x = X(clamp(q[0], 0, 20)), up = q[3] < 0, w = q[1].length * 9.5, tx = clamp(x, w / 2 + 4, 1440 - w / 2 - 4), sp = [tx - w / 2 - 6, tx + w / 2 + 6], rows = taken[up ? 'up' : 'dn'];
    let row = rows.findIndex(r => r.every(o => sp[1] <= o[0] || sp[0] >= o[1])); if (row < 0) row = 1;
    rows[row].push(sp);
    return {q, x, up, tx, row, sp};
  });
  placed.forEach(p => S('line', {x1: p.x, x2: p.x, y1: yl, y2: p.up ? yl - 34 - 24 * p.row : yl + 34 + 24 * p.row, stroke: p.q[2], 'stroke-width': 2}, svg));
  // hollow dot: a different measure (one year of EPS) from the ten-year FCF points
  placed.forEach(p => S('circle', {cx: p.x, cy: yl, r: p.q[2] === C.navy || p.q[2] === C.gold ? 11 : 8, fill: p.q[4] === 'hollow' ? '#fff' : p.q[2], stroke: p.q[4] === 'hollow' ? p.q[2] : '#fff', 'stroke-width': 3}, svg));
  placed.forEach(p => T('text', {x: p.tx, y: p.up ? yl - 42 - 24 * p.row : yl + 52 + 24 * p.row, 'text-anchor': 'middle', class: 'dlb', style: 'font-size:17px;fill:' + (p.q[2] === C.gold ? '#2B5780' : p.q[2]) + ';paint-order:stroke;stroke:var(--tint);stroke-width:6px;stroke-linejoin:round'}, p.q[1], svg));
  // the axis title moves above the line when a lower label needs its corner
  const tUp = placed.some(p => !p.up && p.sp[1] > x1 - 130);
  T('text', {x: x1, y: tUp ? yl - 16 : yl + 58, 'text-anchor': 'end', class: 'axt', style: 'font-size:15px;paint-order:stroke;stroke:var(--tint);stroke-width:6px;stroke-linejoin:round'}, 'Growth a year →', svg);
  if (ours == null){ T('text', {x: X(19.6), y: yl - 22, 'text-anchor': 'end', class: 'dl', style: 'fill:#2B5780;font-size:15px'}, '[We expect: our number lands here]', svg); }
  // roadmap from the section list
  const road = $('#qRoad', sl);
  A.SECS.filter(sc => ['Open', 'Close', 'Backup'].indexOf(sc.n) < 0).forEach((sc, n) => {
    const own = [], tm = [0];
    for (let k = sc.a - 1; k < sc.b; k++){ const m = A.meta(k); tm[0] += m.t || 0; if (own.indexOf(m.o) < 0) own.push(m.o); }
    const b = H('button', {type: 'button', class: 'qr'}, '<span class="qn">' + (n + 1) + '</span><b></b><span class="qo">' + own.map(o => '<i style="background:' + window.OWNERS[o].c + '">' + esc(window.OWNERS[o].s) + '</i>').join('') + '</span><span class="qm">' + mmss(tm[0]) + ' · ' + (sc.a === sc.b ? 'slide ' + sc.a : 'slides ' + sc.a + '-' + sc.b) + '</span>', road);
    $('b', b).textContent = sc.n;
    b.addEventListener('click', () => A.jump(sc.a - 1));
  });
};

/* ---- macro ---- */
INIT.macro = sl => {
  const d = D.macro, box = $('#macroTiles', sl);
  samp(sl, d.sample, '#macroS');
  const tiles = d.tiles.map((t, i) => {
    const b = H('button', {type: 'button', class: 'tile'}, '<span class="tk"></span><span class="tv"></span><span class="tc"></span><span class="pill ' + t.st + '" style="align-self:flex-start"></span>', box);
    $('.tk', b).textContent = t.k; $('.tv', b).textContent = t.v; $('.tc', b).textContent = t.c; $('.pill', b).textContent = t.sw;
    b.addEventListener('click', () => sel(i)); return b;
  });
  function sel(i){ tiles.forEach((b, k) => b.classList.toggle('on', k === i)); const t = d.tiles[i]; $('#macroH', sl).textContent = t.k + ' · what it means for industrial gases'; $('#macroB', sl).innerHTML = '<p>' + esc(t.why) + '</p>' + (i === (d.focus || 0) ? '<p><b>For our company:</b> ' + F(d.ours, 'One line in your words') + '</p>' : '') ; }
  sel(d.focus || 0);
};

/* ---- stability ---- */
INIT.stab = sl => {
  const svg = $('#stabSvg', sl), note = $('#stabNote', sl), d = D.stab;
  function draw(m){
    clear(svg);
    const x0 = 340, x1 = 920;
    if (m === 'eps'){
      const x = lin(-62, 150, x0, x1), rows = d.eps, rh = 140, y0 = 50;
      [-40, 0, 40, 80, 120].forEach(t => { S('line', {x1: x(t), x2: x(t), y1: y0 - 20, y2: y0 + rows.length * rh, stroke: t === 0 ? C.grey : C.line, 'stroke-width': t === 0 ? 1.5 : 1}, svg); T('text', {x: x(t), y: y0 + rows.length * rh + 26, 'text-anchor': 'middle', class: 'ax'}, (t > 0 ? '+' : t < 0 ? '−' : '') + Math.abs(t) + '%', svg); });
      T('text', {x: (x0 + x1) / 2, y: y0 + rows.length * rh + 56, 'text-anchor': 'middle', class: 'axt'}, 'Range of yearly adjusted EPS growth, 2007-2020', svg);
      rows.forEach((r, i) => {
        const y = y0 + i * rh + rh / 2;
        T('text', {x: x0 - 16, y: y + 6, 'text-anchor': 'end', class: 'axl', style: i === 0 ? 'fill:#6B432B;font-weight:700' : ''}, r.n, svg);
        const bar = S('rect', {x: x(r.lo), y: y - 20, width: 0, height: 40, fill: i === 0 ? C.navy : C.light}, svg);
        tween(0, x(r.hi) - x(r.lo), 700 + i * 120, w => bar.setAttribute('width', w));
        T('text', {x: x(r.lo) - 8, y: y + 6, 'text-anchor': 'end', class: 'dl'}, '−' + Math.abs(r.lo) + '%', svg);
        T('text', {x: x(r.hi) + 8, y: y + 6, class: 'dl'}, '+' + r.hi + '%', svg);
        hov(bar, sl, () => '<b>' + esc(r.n) + '</b>: worst year ' + r.lo + '%, best year +' + r.hi + '%. Spread ' + (r.hi - r.lo) + ' points.');
      });
      note.innerHTML = '<p>Each bar spans the worst and the best year of earnings growth from 2007 to 2020, which includes the financial crisis.</p><p><b>Short bar = steady earnings.</b> Industrial gases moved 28 points from worst to best; basic chemicals moved 179.</p>';
    } else {
      const x = lin(-14, 2, x0, x1), rows = d.covid, rh = 210, y0 = 80;
      [-12, -8, -4, 0].forEach(t => { S('line', {x1: x(t), x2: x(t), y1: y0 - 30, y2: y0 + rows.length * rh, stroke: t === 0 ? C.grey : C.line, 'stroke-width': t === 0 ? 1.5 : 1}, svg); T('text', {x: x(t), y: y0 + rows.length * rh + 26, 'text-anchor': 'middle', class: 'ax'}, (t < 0 ? '−' : '') + Math.abs(t) + '%', svg); });
      T('text', {x: (x0 + x1) / 2, y: y0 + rows.length * rh + 56, 'text-anchor': 'middle', class: 'axt'}, 'Sales volume change, worst Covid quarter (2Q20)', svg);
      rows.forEach((r, i) => {
        const y = y0 + i * rh + rh / 2;
        T('text', {x: x0 - 16, y: y + 6, 'text-anchor': 'end', class: 'axl', style: i === 0 ? 'fill:#6B432B;font-weight:700' : ''}, r.n, svg);
        const bar = S('rect', {x: x(0), y: y - 24, width: 0, height: 48, fill: i === 0 ? C.navy : C.light}, svg);
        tween(0, x(0) - x(r.v), 700, w => { bar.setAttribute('width', w); bar.setAttribute('x', x(0) - w); });
        T('text', {x: x(r.v) - 10, y: y + 6, 'text-anchor': 'end', class: 'dl'}, r.l, svg);
      });
      note.innerHTML = '<p>In the worst Covid quarter, Materials companies lost a median 12% of volume. Linde lost about half that.</p><p>Management classes only about <b>one third</b> of sales as cyclical.</p>';
    }
  }
  pick($$('#stabTabs .chip', sl), 'data-m', draw);
  draw('eps');
};

/* ---- 3D model slides ---- */
let GS = null, gsTried = false, gsSlide = null;
const FLOWC = { air: ['#7F9CC4', 'Air in'], energy: ['#2B5780', 'Power'], gas: ['#6B432B', 'Gas out'], cash: ['#2E7D4F', 'Cash in'], passthru: ['#1A1A1A', 'Pass-through'] };
const STOPFLOWS = { site: {air: 1, gas: 1, energy: 1, cash: 0, passthru: 0}, make: {air: 1, gas: 1, energy: 1, cash: 0, passthru: 0}, deliver: {air: 0, gas: 1, energy: 0, cash: 0, passthru: 0}, buyers: {air: 0, gas: 1, energy: 0, cash: 0, passthru: 0}, money: {air: 0, gas: 0, energy: 1, cash: 1, passthru: 1} };
const g3hooks = new Map();
function gas(){
  if (!gsTried){
    gsTried = true;
    try { GS = window.GasScene ? window.GasScene.create({ onPick: k => { const h = gsSlide && g3hooks.get(gsSlide); if (h) h.pick(k); } }) : null; } catch (e){ console.warn('3D unavailable', e); GS = null; }
  }
  return GS;
}
INIT.g3 = sl => {
  const host = $('.g3host', sl), fall = $('.g3fall', host);
  const steps = sl.dataset.steps ? sl.dataset.steps.split(',') : null;
  let stop = sl.dataset.stop;
  const bar = H('div', {class: 'g3bar'}, null, host);
  const stops = [['site', 'Whole site'], ['make', 'Make'], ['deliver', 'Deliver'], ['buyers', 'Buyers'], ['money', 'Money']];
  const sb = stops.map(s => { const b = H('button', {type: 'button', class: 'chip' + (s[0] === stop ? ' on' : '')}, s[1], bar); b.addEventListener('click', () => { if (!GS) return; if (steps && steps.indexOf(s[0]) >= 0){ setStep(s[0]); return; } sb.forEach(x => x.classList.toggle('on', x === b)); GS.go(s[0]); flows = Object.assign({}, STOPFLOWS[s[0]]); syncLegend(); }); return b; });
  H('button', {type: 'button', class: 'chip'}, 'Reset view', bar).addEventListener('click', () => { if (!GS || gsSlide !== sl) return; const lit = sb.findIndex(x => x.classList.contains('on')); GS.go(lit >= 0 ? stops[lit][0] : stop); GS.setFlows(Object.assign({}, flows)); });
  // steps: one slide, several stops, each with its own panel in the right column
  const stepBtns = $$('[data-step]', sl), panels = $$('[data-panel]', sl);
  function setStep(k){
    stop = k;
    stepBtns.forEach(b => { const on = b.dataset.step === k; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); });
    panels.forEach(p => { p.hidden = p.dataset.panel !== k; });
    sb.forEach((x, i) => x.classList.toggle('on', stops[i][0] === k));
    rows.forEach(r => r.b.classList.remove('on'));
    $$('[data-sel]', sl).forEach((x, i) => { x.innerHTML = selDef[i]; });
    if (GS && gsSlide === sl){ GS.highlight(null); GS.go(k); }
    flows = Object.assign({}, STOPFLOWS[k]); syncLegend();
  }
  stepBtns.forEach(b => b.addEventListener('click', () => setStep(b.dataset.step)));
  H('div', {class: 'g3hint'}, 'Drag to orbit · pinch or Ctrl+scroll to zoom · click a building', host);
  let flows = Object.assign({}, STOPFLOWS[stop]);
  const lg = $('[data-legend]', sl), lbtn = {};
  if (lg) lg.dataset.legend.split(',').forEach(k => { const b = H('button', {type: 'button', class: 'lg', 'aria-pressed': 'true'}, '<i style="background:' + FLOWC[k][0] + '"></i>' + FLOWC[k][1], lg); b.addEventListener('click', () => { flows[k] = flows[k] ? 0 : 1; const o = {}; o[k] = !!flows[k]; if (GS) GS.setFlows(o); syncLegend(); }); lbtn[k] = b; });
  function syncLegend(){ Object.keys(lbtn).forEach(k => lbtn[k].setAttribute('aria-pressed', String(!!flows[k]))); }
  const selDef = $$('[data-sel]', sl).map(x => x.innerHTML);
  const curSel = () => $$('[data-sel]', sl).find(x => !x.closest('[hidden]'));
  const rows = [];
  function info(k){
    const selc = curSel(); if (!selc) return;
    const name = (GS && GS.units.find(u => u.key === k) || {}).name || k;
    selc.innerHTML = '<span class="k">Selected</span><b></b><p></p>'; $('b', selc).textContent = name; $('p', selc).textContent = window.UNIT_INFO[k] || '';
    rows.forEach(r => r.b.classList.toggle('on', r.k === k));
  }
  function choose(k){ if (GS){ GS.highlight(k); } info(k); }
  // supply-mode rows (deliver) and customer rows (buyers)
  const mr = $('#modeRows', sl);
  if (mr) D.modes.forEach(m => { const b = H('button', {type: 'button', class: 'mrow'}, '<b></b><span></span><em></em>', mr); $('b', b).textContent = m.n; $('span', b).textContent = m.c; $('em', b).textContent = m.p; b.addEventListener('click', () => choose(m.k)); rows.push({k: m.k, b}); });
  const br = $('#buyerRows', sl);
  if (br) D.buyers.forEach(m => { const b = H('button', {type: 'button', class: 'mrow'}, '<b></b>', br); $('b', b).textContent = m.n; b.addEventListener('click', () => { choose(m.k); const selc = curSel(); if (selc){ $('p', selc).textContent = m.u; $('.k', selc).textContent = 'Why they buy'; } }); rows.push({k: m.k, b}); });
  const hook = {
    pick(k){ info(k); const bk = D.buyers.find(b => b.k === k); const selc = curSel(); if (bk && br && selc){ $('p', selc).textContent = bk.u; $('.k', selc).textContent = 'Why they buy'; } },
    enter(dir){
      const g = gas();
      if (!g){ if (steps) setStep(dir < 0 ? steps[steps.length - 1] : steps[0]); fall.textContent = '3D needs WebGL, which this browser has turned off. The cards on the right carry the same story.'; return; }
      gsSlide = sl; fall.hidden = true;
      g.mount(host); g.highlight(null); rows.forEach(r => r.b.classList.remove('on'));
      if (steps) setStep(dir < 0 ? steps[steps.length - 1] : steps[0]);
      sb.forEach((x, i) => x.classList.toggle('on', stops[i][0] === stop));
      g.go(stop);
      flows = Object.assign({}, STOPFLOWS[stop]); syncLegend();
      g.start();
    },
    step(d){ if (!steps) return false; const n = steps.indexOf(stop) + d; if (n < 0 || n >= steps.length) return false; setStep(steps[n]); return true; },
    leave(){ if (GS && gsSlide === sl){ GS.stop(); GS.highlight(null); } }
  };
  g3hooks.set(sl, hook);
  return hook;
};

/* ---- market structure ---- */
INIT.structure = sl => {
  const d = D.structure, st = $('#tamStack', sl), note = $('#tamNote', sl);
  const a = H('div', {style: 'background:#6B432B;flex-grow:76'}, '', st), b = H('div', {style: 'background:#EDDDD3;color:#1A1A1A;flex-grow:24'}, '', st);
  function draw(t){
    t = +t; const sh = d.big3 / t * 100;
    a.style.flexGrow = String(d.big3); b.style.flexGrow = String(t - d.big3);
    a.innerHTML = '<span>Big Three, 2025 revenue</span><b>$' + d.big3 + 'B · ' + Math.round(sh) + '%</b>';
    b.innerHTML = '<span>Everyone else</span><b>$' + (t - d.big3) + 'B</b>';
    note.textContent = 'Market size $' + t + 'B: ' + d.sizes[t] + '. The Big Three’s combined 2025 revenue of about $76B is ' + Math.round(sh) + '% of it. Growing about 5-6% a year.';
  }
  pick($$('#tamTabs .chip', sl), 'data-t', draw); draw(100);
  const tl = $('#consTl', sl), x = lin(1988, 2029, 3, 97);
  H('div', {class: 'ln'}, '', tl);
  [1990, 2000, 2010, 2020].forEach(y => { const m = H('div', {class: 'mo'}, String(y), tl); m.style.left = x(y) + '%'; });
  const evs = d.events.map((e, i) => {
    const b = H('button', {type: 'button', class: 'ev', 'aria-label': e.y + ': ' + e.h}, '', tl); b.style.left = x(e.y) + '%';
    const l = H('div', {class: 'evl'}, String(e.y), tl); l.style.left = x(e.y) + '%';
    b.addEventListener('click', () => sel(i)); return b;
  });
  function sel(i){ evs.forEach((b, k) => b.classList.toggle('on', k === i)); const e = d.events[i]; $('#consNote', sl).innerHTML = '<b>' + e.y + ' · ' + esc(e.h) + '.</b> ' + esc(e.b); }
  sel(1);
};

/* ---- moat scorecard ---- */
INIT.moat = sl => {
  const d = D.moat, rowsBox = $('#moatRows', sl), peersBox = $('#moatPeers', sl);
  samp(sl, d.sample);
  let hi = 0;
  const names = d.peers, tick = d.tick || names, logos = d.logos || [];
  const COL = [C.navy, C.gold, '#8C8C8C'];  // Linde dark brown, Air Products navy, Air Liquide grey: one colour per company everywhere on the slide
  const pick = i => { hi = i; chipsEl.forEach((x, k) => { x.classList.toggle('on', k === i); x.setAttribute('aria-pressed', String(k === i)); }); paint(); };
  const chipsEl = names.map((n, i) => {
    const b = H('button', {type: 'button', class: 'mpeer' + (i === 0 ? ' on' : ''), 'aria-pressed': String(i === 0), style: '--pc:' + COL[i], title: n},
      (logos[i] ? '<img src="' + esc(logos[i]) + '" alt="' + esc(n) + '">' : '<span class="mpn">' + esc(n) + '</span>') + '<span class="mpt">' + esc(tick[i]) + '</span>', peersBox);
    b.addEventListener('click', () => pick(i));
    return b;
  });
  const cells = [], tots = names.map(() => 0);
  const show = (r, pi, v) => { $('#moatH', sl).textContent = r.n; $('#moatB', sl).innerHTML = '<p><b style="color:' + COL[pi] + '">' + esc(names[pi]) + ':</b> score ' + v + ' of 5' + (d.sample ? ' <span class="samp">Sample score</span>' : '') + '</p><p>Raw value: ' + FL(r.raw[pi]) + '</p>'; };
  d.rows.forEach(r => {
    const row = H('div', {class: 'mrowx'}, '<span class="mrn">' + esc(r.n) + '</span>', rowsBox);
    const bars = H('div', {class: 'mbars'}, null, row);
    r.v.forEach((v, pi) => {
      tots[pi] += v;
      const line = H('div', {class: 'mbar', style: '--pc:' + COL[pi], title: names[pi] + ': ' + v + ' of 5'}, '<b>' + esc(tick[pi]) + '</b><span class="mtr"><i></i></span><em>' + v + '</em>', bars);
      line.addEventListener('click', () => show(r, pi, v));
      cells.push({line, v, pi});
    });
  });
  const tot = H('div', {class: 'mrowx mtot'}, '<span class="mrn">Total, out of ' + (d.rows.length * 5) + '</span>', rowsBox);
  const tw = H('div', {class: 'mtots'}, null, tot);
  const totEl = names.map((n, pi) => H('span', {style: '--pc:' + COL[pi]}, '<b>' + esc(tick[pi]) + '</b><em>' + tots[pi] + '</em>', tw));
  function paint(){
    cells.forEach(c => { c.line.classList.toggle('dim', c.pi !== hi); c.line.querySelector('i').style.width = (c.v / 5 * 100) + '%'; });
    totEl.forEach((e, pi) => e.classList.toggle('dim', pi !== hi));
  }
  requestAnimationFrame(paint);
};

/* ---- threats (flip cards) ---- */
INIT.threats = sl => {
  const d = D.threats, box = $('#threatCards', sl);
  d.cards.forEach((c, i) => {
    const b = H('button', {type: 'button', class: 'flip', 'aria-pressed': 'false'}, '<div class="fi"><div class="ff"><span class="k">Threat ' + (i + 1) + '</span><h3></h3><span class="samp" style="align-self:flex-start">Sample</span><span class="k" style="margin-top:18px">If it happens</span><p style="font-size:18px;line-height:1.4;color:#fff"><span class="fill">[What it would do to volumes, prices or margins]</span></p><span class="k" style="margin-top:6px">We watch</span><p class="wt" style="font-size:18px;line-height:1.4;color:#fff"></p><span class="hint">Click to see why it may not bite</span></div><div class="fb"><h4>Why it may not bite</h4><p><span class="fill">[Evidence in two lines]</span></p><h4 style="margin-top:auto">What we watch</h4><p></p></div></div>', box);
    $('h3', b).textContent = c.h; $('.ff .wt', b).innerHTML = '<span class="fill">' + esc(c.watch) + '</span>'; $$('.fb p', b)[1].innerHTML = '<span class="fill">' + esc(c.watch) + '</span>';
    if (!d.sample) $('.samp', b).classList.add('hidden');
    b.addEventListener('click', () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
  });
};

/* ---- company snapshot ---- */
INIT.snap = sl => {
  const d = D.snap, box = $('#snapTiles', sl);
  box.style.cssText += ';flex:1;grid-template-rows:auto 1fr 1fr';
  H('div', {style: 'grid-column:1/-1;display:flex;align-items:center;gap:12px'}, '<span class="eyebrow">Key numbers</span><span class="samp">Sample data</span>', box);
  d.tiles.forEach(t => { H('div', {class: 'tile'}, '<span class="tk">' + esc(t[0]) + '</span><span class="tv">' + esc(t[1]) + '</span><span class="tc">' + esc(t[2]) + '</span>', box); });
  if (!d.sample) srcok(sl, 'Bloomberg FA');
  const svg = $('#snapDonut', sl), cx = 200, cy = 150, R = 120, r0 = 70, tot = d.regions.reduce((a, b) => a + b.v, 0);
  const cols = [C.navy, C.steel, C.light, C.gold, C.sky];
  let a0 = -Math.PI / 2; const arcs = [];
  d.regions.forEach((g, i) => {
    const a1 = a0 + g.v / tot * Math.PI * 2, la = a1 - a0 > Math.PI ? 1 : 0;
    const p = (r, a) => (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1);
    const path = S('path', {d: 'M' + p(R, a0) + ' A' + R + ' ' + R + ' 0 ' + la + ' 1 ' + p(R, a1) + ' L' + p(r0, a1) + ' A' + r0 + ' ' + r0 + ' 0 ' + la + ' 0 ' + p(r0, a0) + 'Z', fill: cols[i % cols.length], stroke: '#fff', 'stroke-width': 3}, svg);
    path.style.cursor = 'pointer'; path.addEventListener('click', () => sel(i)); hov(path, sl, () => '<b>' + esc(g.n) + '</b>: ' + g.v + '% · $' + g.b + 'B'); arcs.push(path);
    a0 = a1;
  });
  const ct = T('text', {x: cx, y: cy - 2, 'text-anchor': 'middle', class: 'dlb', style: 'font-size:34px'}, '', svg);
  const cs = T('text', {x: cx, y: cy + 24, 'text-anchor': 'middle', class: 'ax'}, '', svg);
  function sel(i){ arcs.forEach((p, k) => p.setAttribute('opacity', k === i ? 1 : .45)); const g = d.regions[i]; ct.textContent = g.v + '%'; cs.textContent = 'of 2025 sales'; $('#snapNote', sl).innerHTML = '<b>' + esc(g.n) + ':</b> $' + g.b + 'B of sales in 2025. <span class="fill">[growth, margin, what drives it]</span>'; }
  sel(0);
};

/* ---- end markets ---- */
INIT.endm = sl => {
  const d = D.endm, box = $('#endBars', sl);
  if (!d.sample) srcok(sl, 'Register #7 · Q2 2026 call');
  const hb = H('div', {class: 'hb'}, null, box);
  const items = d.rows.map((r, i) => {
    const n = H('span', {class: 'hn'}, esc(r.n), hb);
    const t = H('div', {class: 'ht'}, '<i></i><em></em>', hb);
    t.addEventListener('click', () => sel(i));
    return {t, n, r};
  });
  let mode = 'share';
  function draw(){
    const max = mode === 'share' ? 25 : 20;
    items.forEach(o => {
      const v = mode === 'share' ? o.r.s : o.r.g, w = v == null ? 0 : Math.max(0, v) / max * 82;
      o.t.firstChild.style.width = w + '%'; o.t.classList.toggle('z', w === 0); o.t.firstChild.style.background = o.r.d ? C.navy : C.light;
      const em = o.t.lastChild; em.style.left = 'calc(' + w + '% + 10px)';
      if (v == null) em.innerHTML = '<span class="fill">[pull from the Q3 release]</span>'; else em.textContent = mode === 'share' ? v + '%' : sg(v, 0, '%');
    });
    $('#endH', sl).textContent = mode === 'share' ? 'Linde sales by end market, % of total' : 'Sales growth by end market, ' + d.gLabel;
  }
  function sel(i){ items.forEach((o, k) => { o.t.classList.toggle('on', k === i); o.n.classList.toggle('on', k === i); }); const r = d.rows[i]; $('#endNh', sl).textContent = r.n; $('#endNote', sl).innerHTML = '<p>' + esc(r.u) + '</p><p><b>' + (r.d ? 'Fully defensive' : 'Cyclical or mixed') + '</b> · ' + r.s + '% of sales · ' + (r.g == null ? '<span class="fill">[growth: pull]</span>' : sg(r.g, 0, '%') + ' (' + esc(d.gLabel) + ')') + '</p><p><span class="fill">[What this means for our thesis]</span></p>'; }
  pick($$('#endTabs .chip', sl), 'data-m', m => { mode = m; draw(); });
  const known = d.rows.filter(r => r.g != null).sort((a, b) => b.g - a.g);
  // the tile is the sum of the dark bars, so it always matches the chart; Linde's broader ~62% stays as a cited second line
  const tot = d.rows.reduce((a, r) => a + r.s, 0), def = Math.round(d.rows.filter(r => r.d).reduce((a, r) => a + r.s, 0) / tot * 100);
  $('#endKv', sl).innerHTML = '<div class="hi"><span>Fully defensive markets</span><b>' + def + '%</b><i>of sales<br>Linde: ~' + d.defensive + '% resilient, broader set (register #7)</i></div><div><span>Fastest growing</span><b style="font-size:22px">' + (known[0] ? esc(known[0].n) : '<span class="fill">[ ]</span>') + '</b><i>' + (known[0] ? sg(known[0].g, 0, '%') + ', ' + esc(d.gLabel) : '') + '</i></div>';
  requestAnimationFrame(draw);
};

/* ---- contract mix ---- */
INIT.cmix = sl => {
  const d = D.cmix, st = $('#mixStack', sl), lg = $('#mixLegend', sl);
  if (!d.sample) srcok(sl, 'Bloomberg FA, 2025', '.card .ch .samp');
  const segs = d.segs.map((s2, i) => { const el = H('div', {style: 'background:' + s2.c + ';flex-grow:' + s2.v + (s2.c === '#C9B3A3' ? ';color:#1A1A1A' : '')}, '<span>' + esc(s2.n) + '</span><b>' + s2.v + '%</b>', st); el.addEventListener('click', () => sel(i)); H('span', null, '<i style="display:inline-block;width:14px;height:14px;background:' + s2.c + ';vertical-align:-2px;margin-right:6px"></i>' + esc(s2.n) + ' · ' + esc(s2.yrs), lg); return el; });
  const locked = d.segs.filter(x => x.long).reduce((a, x) => a + x.v, 0);
  const multi = d.segs.filter(x => x.long || x.multi).reduce((a, x) => a + x.v, 0);
  const lc = $('#mixLockedCap', sl); if (lc) lc.textContent = 'Take-or-pay, ' + d.segs.filter(x => x.long).map(x => x.yrs).join(', ');
  tween(0, locked, 900, v => { $('#mixLocked', sl).textContent = v.toFixed(1) + '%'; });
  tween(0, multi, 900, v => { $('#mixMulti', sl).textContent = v.toFixed(1) + '%'; });
  // the rest of the protection lives on other slides: link there instead of claiming it here
  const lk = id => '<button type="button" data-go="' + id + '">slide ' + (A.idx(id) + 1) + '</button>';
  $('#mixCall', sl).innerHTML = 'Contracts are only part of the protection: liquid deliveries only pay within about 150 miles (' + lk('make') + '), and on-site contracts pass energy through (' + lk('pass') + ').';
  $$('#mixCall button', sl).forEach(b => b.addEventListener('click', () => { const g = A.idx(b.dataset.go); if (g >= 0) A.jump(g); }));
  function sel(i){ segs.forEach((el, k) => { el.style.boxShadow = k === i ? '0 6px 0 #1A1A1A' : 'none'; }); const x = d.segs[i]; $('#mixH', sl).textContent = x.n + ' · ' + x.yrs; $('#mixNote', sl).innerHTML = '<p>' + esc(x.p) + '</p><p><b>' + x.v + '% of sales, $' + x.b + 'B in 2025.</b></p>'; }
  sel(0);
};

/* ---- TAM by theme ---- */
INIT.tam = sl => {
  const d = D.tam, svg = $('#tamSvg', sl), chipsBox = $('#tamThemes', sl);
  samp(sl, d.sample);
  const tk = SHORT();
  const chips = d.themes.map((t, i) => { const b = H('button', {type: 'button', class: 'chip' + (i === 0 ? ' on' : '')}, esc(t.n), chipsBox); b.addEventListener('click', () => { chips.forEach(x => x.classList.toggle('on', x === b)); draw(i); }); return b; });
  const hook = { enter(){ if (A.tamWant != null){ const k = d.themes.findIndex(t => t.n === A.tamWant); A.tamWant = null; if (k >= 0) chips[k].click(); } } };
  function draw(i){
    clear(svg);
    const t = d.themes[i], st = t.st, x0 = 330, x1 = 880, rh = 104;
    // revenue not yet sourced (how[3] holds a [ ] fill): st[3] is only a drawing width, so no $ figure or derived % is shown
    const unsourced = t.how[3].indexOf('[ ]') >= 0;
    const lx = v => Math.log10(Math.max(v, .05));
    const sc = lin(lx(.05), lx(400), 0, x1 - x0);
    $('#tamFH', sl).textContent = t.n + ' · from headline market to ' + tk + ' revenue ($B, log scale)';
    st.forEach((s, k) => {
      const y = 20 + k * rh, w = sc(lx(s[1])), cx = x0 + (x1 - x0) / 2;
      const lab = k === 2 ? s[0].replace('we', tk) : k === 3 ? s[0].replace('Our', tk) + (unsourced ? ' (sample)' : '') : s[0];
      T('text', {x: x0 - 18, y: y + 30, 'text-anchor': 'end', class: 'axl'}, lab, svg);
      const r = S('rect', {x: cx, y: y + 6, width: 0, height: 44, fill: [C.sky, C.light, C.steel, C.navy][k]}, svg);
      tween(0, w, 600 + k * 120, ww => { r.setAttribute('width', ww); r.setAttribute('x', cx - ww / 2); });
      T('text', {x: cx, y: y + 36, 'text-anchor': 'middle', class: 'dlb', style: k >= 2 ? 'fill:#fff' : ''}, k === 3 && unsourced ? 'Sample' : '$' + (s[1] >= 10 ? Math.round(s[1]) : s[1]) + 'B', svg);
      if (k < st.length - 1){ const c = st[k + 1][1] / s[1] * 100; T('text', {x: cx, y: y + 76, 'text-anchor': 'middle', class: 'ax', style: 'fill:#A57C61;font-weight:600'}, k === 2 && unsourced ? '↓ to be sourced' : '↓ ' + (c >= 10 ? Math.round(c) : c.toFixed(1)) + '% of this', svg); }
    });
    const share = st[3][1] / st[1][1] * 100;
    $('#tamKv', sl).innerHTML = '<div' + (unsourced ? '' : ' class="hi"') + '><span>' + esc(tk) + ' revenue today</span>' + (unsourced ? '<b style="font-size:22px">' + F(null, 'revenue today') + '</b>' : '<b>$' + st[3][1] + 'B</b>') + '<i>' + esc(t.n) + '</i></div><div><span>Share of gas slice</span>' + (unsourced ? '<b style="font-size:22px">' + F(null, 'share of gas slice') + '</b>' : '<b>' + (share >= 10 ? Math.round(share) : share.toFixed(1)) + '%</b>') + '<i>' + esc(st[1][0].toLowerCase()) + '</i></div><div style="grid-column:1/-1"><span>Market growth</span><b style="font-size:22px">' + F(t.g.indexOf('[') === 0 ? null : t.g, t.g.replace(/[\[\]]/g, '')) + '</b></div>';
    $('#tamHow', sl).innerHTML = t.how.map((h, k) => '<p><b>' + (k + 1) + '.</b> ' + esc(h).replace(/\[([^\]]*)\]/g, '<span class="fill">[$1]</span>') + '</p>').join('');
    $('#tamSrc', sl).innerHTML = 'Headline sources: source register #4-#7. Downstream stages: <span class="fill">[company disclosures, BI, as of date]</span>';
  }
  draw(0);
  return hook;
};

/* ---- end-market forecast ---- */
INIT.fcast = sl => {
  const em = D.endm.rows, d = D.fcast, rows = $('#fcRows', sl);
  if (!d.sample) $$('.samp', sl).forEach(x => x.classList.add('hidden'));
  const g = d.scen[d.start].slice();
  let setting = false, sel = -1;
  H('div', {class: 'fcr hd'}, '<span>End market</span><span class="r">Sales</span><span>Our forecast, % a year</span><span class="r">View</span><span>Outlook</span><span>Adds to growth</span><span class="r">Pts</span>', rows);
  const sc = H('div', {class: 'row', style: 'gap:8px'}, null, $('#fcScen', sl));
  const scen = ['bear', 'base', 'bull'].map(k => { const b = H('button', {type: 'button', class: 'chip' + (k === d.start ? ' on' : '')}, k[0].toUpperCase() + k.slice(1), sc); b.addEventListener('click', () => apply(k)); return {k, b}; });
  H('span', {class: 'xs muted', style: 'margin-left:6px'}, 'Drag any slider to set your own view', $('#fcScen', sl));
  const R = em.map((m, i) => {
    const r = H('div', {class: 'fcr'}, '<button type="button" class="nm"><i style="background:' + (m.d ? C.navy : C.light) + '"></i><span></span></button><span class="sh2">' + m.s + '%</span><input type="range" id="fcg' + i + '" min="-10" max="20" step="0.5" value="' + g[i] + '" aria-label="Forecast growth for ' + esc(m.n) + '"><output id="fcg' + i + 'o"></output><span class="pill"></span><div class="cbar"><i></i></div><b class="cpt"></b>', rows);
    $('.nm span', r).textContent = m.n;
    $('.nm', r).addEventListener('click', () => pickRow(i));
    const ctl = rng('fcg' + i, v => { g[i] = v; if (!setting) scen.forEach(x => x.b.classList.remove('on')); draw(); if (sel === i) note(); }, v => sg(v, 1, '%'));
    return {r, ctl, m};
  });
  function apply(k){ setting = true; scen.forEach(x => x.b.classList.toggle('on', x.k === k)); d.scen[k].forEach((v, i) => R[i].ctl.set(v)); setting = false; draw(); if (sel >= 0) note(); }
  function view(v){ return v >= 4 ? ['good', 'Tailwind'] : v >= 0 ? ['ctx', 'Steady'] : ['bad', 'Headwind']; }
  function draw(){
    const tot = em.reduce((a, m) => a + m.s, 0);
    const con = em.map((m, i) => m.s / tot * g[i]);
    const blend = con.reduce((a, b) => a + b, 0);
    const mx = Math.max(1.5, ...con.map(Math.abs));
    R.forEach((o, i) => {
      const [cls, lab] = view(g[i]); const p = $('.pill', o.r); p.className = 'pill ' + cls; p.textContent = lab;
      const w = Math.abs(con[i]) / mx * 50, bar = $('.cbar i', o.r);
      bar.style.width = w + '%'; bar.style.left = con[i] >= 0 ? '50%' : (50 - w) + '%'; bar.style.background = con[i] >= 0 ? C.navy : C.bad;
      $('.cpt', o.r).textContent = sg(con[i], 2);
    });
    const grp = f => { const ms = em.map((m, i) => [m, i]).filter(x => f(x[0])); const s = ms.reduce((a, x) => a + x[0].s, 0); return s ? ms.reduce((a, x) => a + x[0].s * g[x[1]], 0) / s : 0; };
    $('#fcBig', sl).textContent = sg(blend, 1, '%');
    A.fcastBlend = blend;
    const on = scen.find(x => x.b.classList.contains('on')); A.fcastView = on ? on.k : 'custom';
    $('#fcKv', sl).innerHTML = '<div><span>Fully defensive markets</span><b>' + sg(grp(m => m.d), 1, '%') + '</b><i>a year</i></div><div><span>Cyclical or mixed</span><b>' + sg(grp(m => !m.d), 1, '%') + '</b><i>a year</i></div>';
    const top = con.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0])[0];
    $('#fcRead', sl).innerHTML = '<b>' + esc(em[top[1]].n) + '</b> adds the most: ' + sg(top[0], 1, ' pts') + ' of the ' + sg(blend, 1, '%') + '. Compare with <span class="fill">[management guidance or consensus]</span>.';
  }
  function note(){
    const m = em[sel];
    $('#fcH', sl).textContent = m.n + ' · ' + sg(g[sel], 1, '%') + ' a year';
    $('#fcNote', sl).innerHTML = '<p><b>Why we think this:</b> ' + F(d.why[sel], 'one line of evidence') + '</p><p><b>What would change our view:</b> ' + F(d.signal[sel], 'the signal') + '</p><p><b>Indicator to watch:</b> ' + esc(d.ind[sel]) + '</p>';
  }
  function pickRow(i){ sel = i; R.forEach((o, k) => o.r.classList.toggle('on', k === i)); note(); }
  draw(); pickRow(em.findIndex(m => m.n === 'Electronics') >= 0 ? em.findIndex(m => m.n === 'Electronics') : 0);
  // leaving slide 11 on Bear or Bull snaps back to Base, so the bridge never carries a side case by accident; a dragged custom view still flows through
  return { leave(){ const on = scen.find(x => x.b.classList.contains('on')); if (on && on.k !== d.start) apply(d.start); } };
};

/* ---- next markets: opportunity map ---- */
INIT.next = sl => {
  const d = D.next, svg = $('#nxSvg', sl), cbox = $('#nxChips', sl);
  if (!d.sample) $$('.samp', sl).forEach(x => x.classList.add('hidden'));
  const VERD = { play: ['Play it now', C.navy, '#fff'], option: ['Option value', C.steel, '#fff'], watch: ['Watch', C.sky, C.ink], pass: ['Pass', '#FFFFFF', C.grey] };
  const verdict = d.t.map(t => t.v);
  let sel = 0;
  const chips = d.t.map((t, i) => { const b = H('button', {type: 'button', class: 'chip'}, esc(t.n), cbox); b.addEventListener('click', () => pick(i)); return b; });
  const x0 = 70, x1 = 940, yt = 20, yb = 560, X = lin(0, 10, x0, x1), Y = lin(0, 1, yb, yt);
  // quadrants
  [[0, 5, .5, 1, 'Play it now', 'soon and big'], [5, 10, .5, 1, 'Build the option', 'big but later'], [0, 5, 0, .5, 'Nice extra', 'soon but small'], [5, 10, 0, .5, 'Watch', 'small and later']].forEach((q, k) => {
    S('rect', {x: X(q[0]), y: Y(q[3]), width: X(q[1]) - X(q[0]), height: Y(q[2]) - Y(q[3]), fill: k === 0 ? '#F4EFE7' : k === 1 ? '#F7F4EF' : k === 2 ? '#FBF9F6' : '#FFFFFF', stroke: C.line}, svg);
    const left = k === 2, ly = k === 2 ? Y(q[2]) - 30 : Y(q[3]) + 24, lx = left ? X(q[0]) + 12 : X(q[1]) - 12, an = left ? 'start' : 'end';
    T('text', {x: lx, y: ly, 'text-anchor': an, class: 'axl', style: 'fill:#A57C61;font-size:14px;letter-spacing:.08em;text-transform:uppercase'}, q[4], svg);
    T('text', {x: lx, y: ly + 18, 'text-anchor': an, class: 'ax', style: 'font-size:13px'}, q[5], svg);
  });
  [[0, 'Now'], [2.5, '2-3 yrs'], [5, '5 yrs'], [7.5, '7-8 yrs'], [10, '10+ yrs']].forEach(t => T('text', {x: X(t[0]), y: yb + 22, 'text-anchor': 'middle', class: 'ax'}, t[1], svg));
  T('text', {x: (x0 + x1) / 2, y: yb + 48, 'text-anchor': 'middle', class: 'axt'}, 'When it matters for ' + SHORT() + ' →', svg);
  T('text', {x: 22, y: (yt + yb) / 2, 'text-anchor': 'middle', class: 'axt', transform: 'rotate(-90 22 ' + ((yt + yb) / 2) + ')'}, 'New gas demand at scale →', svg);
  const G = d.t.map((t, i) => {
    const g = S('g', {style: 'cursor:pointer', tabindex: '0', role: 'button', 'aria-label': t.n}, svg);
    const ring = S('circle', {cx: X(t.x), cy: Y(t.y), r: 38, fill: 'none', stroke: C.gold, 'stroke-width': 5, opacity: 0}, g);
    const c = S('circle', {cx: X(t.x), cy: Y(t.y), r: 30, 'stroke-width': 2.5}, g);
    const tx = T('text', {x: X(t.x), y: Y(t.y) + 6, 'text-anchor': 'middle', style: 'font:700 18px "Source Serif 4",Georgia,serif'}, String(i + 1), g);
    const lb = T('text', {x: X(t.x), y: Y(t.y) + 54, 'text-anchor': 'middle', class: 'axl', style: 'font-size:15px'}, t.n, g);
    g.addEventListener('click', () => pick(i)); g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); pick(i); } });
    return {ring, c, tx};
  });
  function paint(){ G.forEach((o, i) => { const v = VERD[verdict[i]]; o.c.setAttribute('fill', v ? v[1] : '#FFFFFF'); o.c.setAttribute('stroke', v ? (verdict[i] === 'pass' ? C.grey : v[1]) : C.navy); o.c.setAttribute('stroke-dasharray', v ? '' : '5 4'); o.tx.setAttribute('fill', v ? v[2] : C.navy); o.ring.setAttribute('opacity', i === sel ? 1 : 0); }); }
  function pick(i){
    sel = i; chips.forEach((b, k) => b.classList.toggle('on', k === i));
    const t = d.t[i];
    $('#nxH', sl).textContent = (i + 1) + ' · ' + t.n;
    const tam = D.tam.themes.findIndex(x => x.n === t.n);
    const b = $('#nxB', sl);
    b.innerHTML = '<span class="eyebrow">How it uses gas</span><p class="small" style="margin-top:-4px"></p><div class="row" style="gap:6px" id="nxGas"></div>' +
      '<span class="eyebrow" style="margin-top:4px">What ' + esc(SHORT()) + ' sells here today</span><p class="small" style="margin-top:-4px">' + (t.today ? esc(t.today) : '<span class="fill">[product, customer or contract, with a number]</span>') + '</p>' +
      '<span class="eyebrow" style="margin-top:4px">Our verdict</span><div class="row" style="gap:6px" id="nxV"></div>' +
      '<p class="xs muted" style="margin-top:auto">Source: ' + esc(t.src).replace(/\[([^\]]*)\]/g, '<span class="fill">[$1]</span>') + '</p>' +
      (tam >= 0 ? '<button type="button" class="btn sm" id="nxGo" style="align-self:flex-start">Size it on slide ' + (A.idx('tam') + 1) + ' →</button>' : '');
    $('p.small', b).textContent = t.how;
    t.gases.forEach(gs => H('span', {class: 'pill ctx', style: 'text-transform:none;letter-spacing:0;font-size:13.5px'}, esc(gs), $('#nxGas', b)));
    Object.keys(VERD).forEach(k => { const vb = H('button', {type: 'button', class: 'chip' + (verdict[i] === k ? ' on' : '')}, VERD[k][0], $('#nxV', b)); vb.addEventListener('click', () => { verdict[i] = verdict[i] === k ? null : k; pick(i); }); });
    if (!verdict[i]) H('span', {class: 'xs muted'}, 'Not decided yet', $('#nxV', b));
    const go = $('#nxGo', b); if (go) go.addEventListener('click', () => { A.tamWant = t.n; A.jump(A.idx('tam')); });
    $('#nxG', sl).textContent = verdict[i] ? VERD[verdict[i]][0] : '';
    paint();
  }
  pick(0);
};

/* ---- backlog ---- */
INIT.backlog = sl => {
  const d = D.backlog, svg = $('#blSvg', sl), gs = $('#ganttSvg', sl);
  $$('.samp', sl).forEach(x => x.classList.toggle('hidden', d.sample === false));
  { const x0 = 20, x1 = 880, yb = 190, max = Math.ceil(Math.max(...d.q.map(q => q[1])) + 1), y = lin(0, max, yb, 18), bw = (x1 - x0) / d.q.length;
    gridY(svg, x0, x1, y, [0, 2, 4, 6, 8].filter(v => v <= max), v => '$' + v + 'B');
    d.q.forEach((q, i) => { const last = i === d.q.length - 1; const r = S('rect', {x: x0 + i * bw + bw * .2, y: yb, width: bw * .6, height: 0, fill: last ? C.navy : C.light}, svg); tween(0, yb - y(q[1]), 600 + i * 60, h => { r.setAttribute('y', yb - h); r.setAttribute('height', h); }); T('text', {x: x0 + i * bw + bw / 2, y: yb + 24, 'text-anchor': 'middle', class: 'ax'}, q[0], svg); T('text', {x: x0 + i * bw + bw / 2, y: y(q[1]) - 8, 'text-anchor': 'middle', class: last ? 'dlb' : 'dl'}, '$' + q[1] + 'B', svg); hov(r, sl, () => '<b>' + q[0] + '</b>: $' + q[1] + 'B signed, not yet built'); });
    S('line', {x1: x0, x2: x1, y1: yb, y2: yb, class: 'base'}, svg); }
  { const x0 = 230, x1 = 880, x = lin(2026, 2029, x0, x1), rh = 30, y0 = 10, P = d.proj;
    const MC = { Electronics: C.navy, Metals: C.grey, Space: C.gold, Chemicals: C.steel, 'Clean energy': C.good, Healthcare: '#7B5EA7' };
    [2026, 2027, 2028, 2029].forEach(yv => { S('line', {x1: x(yv), x2: x(yv), y1: y0, y2: y0 + P.length * rh, stroke: C.line}, gs); T('text', {x: x(yv), y: y0 + P.length * rh + 22, 'text-anchor': 'middle', class: 'ax'}, String(yv), gs); });
    P.forEach((p, i) => {
      const y = y0 + i * rh + rh / 2;
      T('text', {x: x0 - 12, y: y + 5, 'text-anchor': 'end', class: 'ax', style: 'fill:#1A1A1A'}, p.n, gs);
      S('line', {x1: x0, x2: x(p.y), y1: y, y2: y, stroke: MC[p.m] || C.steel, 'stroke-width': 3, 'stroke-dasharray': '2 5', 'stroke-linecap': 'round'}, gs);
      const c = S('circle', {cx: x(p.y), cy: y, r: 5 + Math.sqrt(p.c) / 5, fill: MC[p.m] || C.steel, stroke: '#fff', 'stroke-width': 2}, gs);
      c.style.cursor = 'pointer';
      c.addEventListener('click', () => { $('#blH', sl).textContent = p.n; $('#blNote', sl).innerHTML = '<p><b>' + esc(p.m) + ' · ' + esc(p.r) + '</b></p><p>Capex about $' + p.c.toLocaleString() + 'M, start-up ' + (p.y % 1 > .45 ? 'second half ' : 'first half ') + Math.floor(p.y) + '.</p><p><span class="fill">[Contract length, customer, why it matters]</span></p>'; });
      hov(c, sl, () => '<b>' + esc(p.n) + '</b> · ' + esc(p.m) + ' · start-up ' + Math.floor(p.y));
    });
  }
};

/* ---- catalysts ---- */
INIT.cat = sl => {
  const d = D.cat, tl = $('#catTl', sl), x = lin(2026.7, 2028.0, 2, 98);
  samp(sl, d.sample);
  H('div', {class: 'ln'}, '', tl);
  [['Oct 26', 2026.75], ['Jan 27', 2027.0], ['Apr 27', 2027.25], ['Jul 27', 2027.5], ['Oct 27', 2027.75]].forEach(m => { const e = H('div', {class: 'mo'}, m[0], tl); e.style.left = x(m[1]) + '%'; });
  const evs = d.ev.map((e, i) => { const b = H('button', {type: 'button', class: 'ev', 'aria-label': e.h}, String(i + 1), tl); b.style.left = x(e.d) + '%'; const l = H('div', {class: 'evl'}, esc(e.l), tl); l.style.left = x(e.d) + '%'; l.style.top = (i % 2 ? 8 : 30) + 'px'; b.addEventListener('click', () => sel(i)); return b; });
  const fl = s => esc(s).replace(/\[([^\]]*)\]/g, '<span class="fill">[$1]</span>');
  function sel(i){ evs.forEach((b, k) => b.classList.toggle('on', k === i)); const e = d.ev[i]; $('#catH', sl).innerHTML = fl(e.h); $('#catNote', sl).innerHTML = '<p><b>What we expect:</b> ' + fl(e.x) + '</p><p><b>Date:</b> <span class="fill">[exact date]</span></p>'; $('#catWatch', sl).innerHTML = '<p>' + fl(e.w) + '</p>'; }
  sel(0);
};

/* ---- pass-through ---- */
INIT.pass = sl => {
  const d = D.pass, svg = $('#passSvg', sl);
  let mode = 0;
  const mb = $('#passMode', sl);
  H('span', {class: 'eyebrow', style: 'margin-right:6px'}, 'Contract type', mb);
  const chips = d.modes.map((m, i) => { const b = H('button', {type: 'button', class: 'chip' + (i === 0 ? ' on' : '')}, esc(m.n), mb); b.addEventListener('click', () => { mode = i; chips.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
  const r = rng('passE', draw, v => sg(v, 0, '%'));
  function draw(){
    const x = r.v / 100, m = d.modes[mode], E0 = d.energyShare, O = d.otherCost, P0 = 100 - E0 - O;
    const dE = E0 * x, E1 = E0 + dE, R1 = 100 + m.pt * dE, P1 = R1 - E1 - O, m0 = P0 / 100 * 100, m1 = P1 / R1 * 100;
    clear(svg);
    const x0 = 20, x1 = 860, yb = 420, max = 140, y = lin(0, max, yb, 10);
    gridY(svg, x0, x1, y, [0, 35, 70, 105, 140], v => '$' + v);
    const G = [['Revenue', 100, R1], ['Energy cost', E0, E1], ['Other costs', O, O], ['Operating profit', P0, P1]], gw = (x1 - x0) / G.length;
    G.forEach((g, i) => {
      const cx = x0 + i * gw + gw / 2;
      [[g[1], C.light, -1], [g[2], i === 3 ? (P1 < P0 - .01 ? C.bad : C.navy) : C.navy, 1]].forEach(b => { const v = Math.max(0, b[0]); S('rect', {x: cx + (b[2] < 0 ? -74 : 4), y: y(v), width: 70, height: yb - y(v), fill: b[1]}, svg); T('text', {x: cx + (b[2] < 0 ? -39 : 39), y: y(v) - 8, 'text-anchor': 'middle', class: 'dl'}, '$' + b[0].toFixed(1), svg); });
      T('text', {x: cx, y: yb + 26, 'text-anchor': 'middle', class: 'axl'}, g[0], svg);
    });
    S('line', {x1: x0, x2: x1, y1: yb, y2: yb, class: 'base'}, svg);
    S('rect', {x: x1 - 230, y: 0, width: 14, height: 14, fill: C.light}, svg); T('text', {x: x1 - 210, y: 12, class: 'ax'}, 'Before', svg);
    S('rect', {x: x1 - 140, y: 0, width: 14, height: 14, fill: C.navy}, svg); T('text', {x: x1 - 120, y: 12, class: 'ax'}, 'After', svg);
    $('#passKv', sl).innerHTML = '<div><span>Revenue</span><b>' + sg(R1 - 100, 1, '%') + '</b><i>per $100 of sales</i></div><div><span>Profit dollars</span><b style="color:' + (P1 < P0 - .01 ? C.bad : C.navy) + '">' + sg((P1 / P0 - 1) * 100, 1, '%') + '</b><i>$' + P0.toFixed(1) + ' to $' + P1.toFixed(1) + '</i></div><div class="hi" style="grid-column:1/-1"><span>Operating margin</span><b>' + m0.toFixed(1) + '% → ' + m1.toFixed(1) + '%</b><i>' + esc(m.n) + ': ' + esc(m.d) + '</i></div>';
    $('#passRead', sl).innerHTML = m.pt === 1 ? 'Energy ' + sg(r.v, 0, '%') + ': revenue moves, <b>profit dollars do not</b>, so the margin % ' + (m1 < m0 ? 'falls' : 'rises') + ' only because revenue changed. A business can look weaker on margin and be just as profitable.' : 'Without full pass-through the company eats ' + Math.round((1 - m.pt) * 100) + '% of the cost change until prices reset, so <b>profit dollars move</b> too.';
  }
  draw();
};

/* ---- margins and returns ---- */
INIT.marg = sl => {
  const d = D.marg, svg = $('#margSvg', sl);
  srcok(sl, 'Bloomberg FA, Oct 8, 2026');
  let m = 'adj';
  function draw(){
    clear(svg);
    const md = d.modes[m], Y = md.years, x0 = 70, x1 = 720, yb = 370;
    const all = md.series.reduce((a, s2) => a.concat(s2.v.filter(v => v != null)), []);
    const mx = Math.ceil(Math.max(...all) / 5) * 5 + 5, y = lin(0, mx, yb, 20), x = lin(0, Y.length - 1, x0 + 10, x1 - 10);
    gridY(svg, x0, x1, y, Array.from({length: mx / 5 + 1}, (_, i) => i * 5), v => v + '%');
    Y.forEach((yr, i) => T('text', {x: x(i), y: yb + 26, 'text-anchor': 'middle', class: 'ax', style: md.est != null && i >= md.est ? 'font-style:italic' : ''}, yr, svg));
    if (md.est != null){ S('rect', {x: (x(md.est - 1) + x(md.est)) / 2, y: 20, width: x1 - (x(md.est - 1) + x(md.est)) / 2, height: yb - 20, fill: C.tint}, svg); T('text', {x: x1 - 6, y: 36, 'text-anchor': 'end', class: 'ax'}, 'Consensus estimates', svg); }
    md.series.forEach((sr, k) => {
      const isL = sr.n === 'Linde', act = sr.v.map((v, i) => [i, v]).filter(p => p[1] != null && (md.est == null || p[0] < md.est)), est = md.est != null ? sr.v.map((v, i) => [i, v]).filter(p => p[1] != null && p[0] >= md.est - 1) : [];
      const pl = S('polyline', {points: act.map(p => x(p[0]) + ',' + y(p[1])).join(' '), fill: 'none', stroke: sr.c, 'stroke-width': isL ? 4.5 : 3.5, 'stroke-linejoin': 'round'}, svg);
      if (est.length > 1) S('polyline', {points: est.map(p => x(p[0]) + ',' + y(p[1])).join(' '), fill: 'none', stroke: sr.c, 'stroke-width': 3, 'stroke-dasharray': '7 6'}, svg);
      if (!A.RM && pl.getTotalLength){ const L = pl.getTotalLength(); pl.style.strokeDasharray = L; pl.style.strokeDashoffset = L; pl.getBoundingClientRect(); pl.style.transition = 'stroke-dashoffset .9s ease'; pl.style.strokeDashoffset = 0; }
      sr.v.forEach((v, i) => { if (v == null) return; const c = S('circle', {cx: x(i), cy: y(v), r: 6, fill: md.est != null && i >= md.est ? '#fff' : sr.c, stroke: md.est != null && i >= md.est ? sr.c : '#fff', 'stroke-width': 2.5}, svg); hov(c, sl, () => '<b>' + esc(sr.n) + ' ' + Y[i] + '</b>: ' + v.toFixed(1) + '%'); });
      let li = sr.v.length - 1; while (li > 0 && sr.v[li] == null) li--; const lv = sr.v[li];
      T('text', {x: x(li) + 14, y: y(lv) + 6, class: isL ? 'dlb' : 'dl'}, sr.n + ' ' + lv.toFixed(1) + '%', svg);
    });
    S('line', {x1: x0, x2: x1, y1: yb, y2: yb, class: 'base'}, svg);
    $('#margH', sl).textContent = md.t;
    const L = md.series.find(s2 => s2.n === 'Linde').v, i25 = Y.indexOf('2025'), comp = md.series.find(s2 => s2.n !== 'Linde');
    let kv = '<div class="hi"><span>Linde, 2025</span><b>' + L[i25].toFixed(1) + '%</b><i>' + sg(L[i25] - L[0], 1, ' pts') + ' since 2019</i></div>';
    if (comp) kv += '<div><span>Gap to ' + esc(comp.n) + '</span><b>' + sg(L[i25] - comp.v[i25], 1, ' pts') + '</b><i>in 2025</i></div>';
    else kv += '<div><span>Consensus, 2027E</span><b>' + L[L.length - 1].toFixed(1) + '%</b><i>Bloomberg estimates</i></div>';
    kv += '<div><span>Why GAAP is lower</span><i style="font-size:15px;line-height:1.35;color:#1A1A1A">GAAP numbers carry amortization from the 2018 Praxair merger: $0.9B in 2025, $1.9B in 2019. Linde’s own adjusted return on capital was 24.2% in 2025 (register #4).</i></div>';
    $('#margKv', sl).innerHTML = kv;
  }
  pick($$('#margTabs .chip', sl), 'data-m', k => { m = k; draw(); });
  draw();
};

/* ---- capex J-curve + uses of cash ---- */
INIT.capex = sl => {
  const svg = $('#jcSvg', sl), su = $('#suSvg', sl);
  const cap = rng('jcCap', draw, v => '$' + v.toLocaleString() + 'M'), bld = rng('jcBuild', draw, v => v + (v === 1 ? ' yr' : ' yrs')), cash = rng('jcCash', draw, v => '$' + v + 'M'), yrs = rng('jcYrs', draw, v => v + ' yrs');
  function flows(){ const f = [], B = bld.v; for (let t = 0; t < B; t++) f.push(-cap.v / B); for (let t = 0; t < yrs.v; t++) f.push(cash.v * (t === 0 ? .6 : 1)); return f; }
  function irr(f){ let lo = -.9, hi = 1; const npv = r => f.reduce((a, c, t) => a + c / Math.pow(1 + r, t + 1), 0); if (npv(lo) * npv(hi) > 0) return null; for (let k = 0; k < 80; k++){ const mid = (lo + hi) / 2; if (npv(lo) * npv(mid) <= 0) hi = mid; else lo = mid; } return (lo + hi) / 2; }
  function draw(){
    const f = flows(), cum = []; f.reduce((a, c, i) => (cum[i] = a + c), 0);
    clear(svg);
    const x0 = 80, x1 = 880, mn = Math.min(0, ...cum), mx = Math.max(0, ...cum), pad = (mx - mn) * .1 || 100, y = lin(mn - pad, mx + pad, 442, 10), x = lin(0, f.length, x0, x1);
    const step = Math.pow(10, Math.floor(Math.log10((mx - mn) || 1))) * ((mx - mn) / Math.pow(10, Math.floor(Math.log10((mx - mn) || 1))) > 4 ? 1 : .5);
    const ticks = []; for (let v = Math.ceil((mn - pad) / step) * step; v <= mx + pad; v += step) ticks.push(v);
    gridY(svg, x0, x1, y, ticks, v => (v < 0 ? '−' : '') + '$' + Math.abs(Math.round(v)).toLocaleString());
    S('line', {x1: x0, x2: x1, y1: y(0), y2: y(0), stroke: C.grey, 'stroke-width': 1.5}, svg);
    let d = 'M' + x(0) + ' ' + y(0); cum.forEach((c, i) => { d += ' L' + x(i + 1) + ' ' + y(c); });
    S('path', {d: d + ' L' + x(cum.length) + ' ' + y(0) + ' Z', fill: C.sky, opacity: .55}, svg);
    S('path', {d, fill: 'none', stroke: C.navy, 'stroke-width': 4, 'stroke-linejoin': 'round'}, svg);
    const pb = cum.findIndex(c => c >= 0);
    if (pb > 0){ S('line', {x1: x(pb + 1), x2: x(pb + 1), y1: 10, y2: 442, stroke: C.gold, 'stroke-width': 2, 'stroke-dasharray': '5 4'}, svg); T('text', {x: x(pb + 1) + 6, y: 26, class: 'dl', style: 'fill:#2B5780'}, 'Payback, year ' + (pb + 1), svg); }
    S('rect', {x: x(0), y: 0, width: x(bld.v) - x(0), height: 460, fill: C.bad, opacity: .06}, svg); T('text', {x: x(0) + 6, y: 456, class: 'ax'}, 'Build', svg);
    for (let t = 0; t <= f.length; t += 5) T('text', {x: x(t), y: 482, 'text-anchor': 'middle', class: 'ax'}, 'yr ' + t, svg);
    const r = irr(f), tot = cum[cum.length - 1];
    $('#jcKv', sl).innerHTML = '<div class="hi"><span>Return on the plant (IRR)</span><b>' + (r == null ? 'n/a' : (r * 100).toFixed(1) + '%') + '</b><i>gas companies target above about 10%</i></div><div><span>Payback</span><b>' + (pb > 0 ? 'Yr ' + (pb + 1) : 'Never') + '</b><i>from first spend</i></div><div style="grid-column:1/-1"><span>Total cash over the contract</span><b>' + usd(tot) + 'M</b><i>before any renewal</i></div>';
  }
  draw();
  // where the cash comes from and where it goes: two stacked columns that balance
  const d = D.uses; if (!d.sample) srcok(sl, 'Linde 10-K, 2025', '.side .samp'); else samp(sl, d.sample, '.side .samp');
  const src = d.items.filter(v => v[1] > 0), use = d.items.filter(v => v[1] < 0).map(v => [v[0], -v[1]]);
  const gap = use.reduce((a, v) => a + v[1], 0) - src.reduce((a, v) => a + v[1], 0);
  if (gap > 0) src.push(['Other, net', gap]); else if (gap < 0) use.push(['Other, net', -gap]);
  // the headline's second sentence follows the same numbers as the chart
  const amt = n => { const it = d.items.find(v => v[0] === n); return it ? Math.abs(it[1]) : 0; };
  const bn = v => '$' + (Math.round(v * 10 + 1e-9) / 10).toFixed(1) + 'B';
  const left = amt('Operations') - amt('Capex') - amt('Dividends');
  const cxh = $('#cxH', sl); if (cxh) cxh.innerHTML = 'In 2025, operations ' + (left >= 0 ? 'covered' : 'did not cover') + ' capex and dividends; ' + (left >= amt('Buybacks') ? '<b>buybacks were covered too</b>' : '<b>net borrowing of ' + bn(amt('Net borrowing')) + ' helped fund buybacks</b>');
  const tot = src.reduce((a, v) => a + v[1], 0), yb = 262, y = lin(0, tot, yb, 22), cols = [[src, 'Sources', 60, [C.navy, C.sky]], [use, 'Uses', 215, [C.steel, C.light, C.sky, C.gold]]];
  cols.forEach(cl => {
    let acc = 0;
    cl[0].forEach((v, i) => {
      const y1 = y(acc + v[1]), y0 = y(acc), col = v[0] === 'Other, net' ? C.gold : cl[3][i % cl[3].length];
      const r = S('rect', {x: cl[2], y: y1, width: 105, height: Math.max(1, y0 - y1 - 2), fill: col}, su);
      hov(r, sl, () => '<b>' + esc(v[0]) + '</b>: ' + bn(v[1]));
      const dark = col === C.navy || col === C.steel || col === C.gold;
      if (y0 - y1 > 34){ T('text', {x: cl[2] + 8, y: y1 + 18, class: 'ax', style: 'font-size:13px;font-weight:600;fill:' + (dark ? '#fff' : '#1A1A1A')}, v[0], su); T('text', {x: cl[2] + 8, y: y1 + 34, class: 'ax', style: 'font-size:13px;fill:' + (dark ? '#fff' : '#1A1A1A')}, bn(v[1]), su); }
      else T('text', {x: cl[2] + 112, y: (y0 + y1) / 2 + 4, class: 'ax', style: 'font-size:12px'}, v[0] + ' ' + bn(v[1]), su);
      acc += v[1];
    });
    T('text', {x: cl[2] + 52, y: yb + 22, 'text-anchor': 'middle', class: 'axl'}, cl[1], su);
  });
  T('text', {x: 190, y: 10, 'text-anchor': 'middle', class: 'ax', style: 'font-size:13px'}, 'Each column totals ' + bn(tot) + ' in 2025', su);
};

/* ---- risk matrix ---- */
INIT.risks = sl => {
  const d = D.risks, m = $('#rmx', sl);
  samp(sl, d.sample);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++){ const sc = (2 - r) + c; H('div', {class: 'cell' + (sc >= 3 ? ' h3' : sc === 2 ? ' h2' : '')}, '', m); }
  const dots = d.r.map((k, i) => { const b = H('button', {type: 'button', class: 'rdot', 'aria-label': k.n}, String(i + 1), m); b.style.left = (k.p * 100) + '%'; b.style.top = ((1 - k.i) * 100) + '%'; b.addEventListener('click', () => sel(i)); hov(b, sl, () => esc(k.n)); return b; });
  function sel(i){ dots.forEach((b, k) => b.classList.toggle('on', k === i)); const k = d.r[i]; $('#rkH', sl).textContent = 'Risk ' + (i + 1); $('#rkB', sl).innerHTML = '<p><b>' + esc(k.n) + '</b></p><p><b>What we watch:</b> <span class="fill">[the number and its tripwire]</span></p><p><b>What limits the damage:</b> <span class="fill">[contracts, balance sheet, diversification]</span></p><p><b>Price impact:</b> <span class="fill">[$ per share in the bear case]</span></p>'; }
  const top = d.r.map((k, i) => [k.p * k.i, i]).sort((a, b) => b[0] - a[0])[0][1]; sel(top);
};

/* ---- reverse DCF ---- */
function dcf(fcf0, g1, years, w, g){ let v = 0, f = fcf0; for (let t = 1; t <= years; t++){ f *= 1 + g1; v += f / Math.pow(1 + w, t); } return v + f * (1 + g) / (w - g) / Math.pow(1 + w, years); }
/* the free cash flow growth a year (years 1-10) at which the DCF value equals the price */
function impG(price, w, g){ const d = D.val; let lo = -.2, hi = .4; for (let k = 0; k < 70; k++){ const mid = (lo + hi) / 2; if (dcf(d.fcf0, mid, d.years, w, g) < price) lo = mid; else hi = mid; } return (lo + hi) / 2; }
const priceNow = () => window.PITCH.price || D.val.price;
/* one source of truth for 'our growth': PITCH.growth once set; else the cash flow bridge (live edits, else its defaults)
   once its drivers are the team's own (bridge.sample false); until then the 2019-2025 pace (val.g1), labelled as that, never as 'our growth' */
const r1 = x => +x.toFixed(1);
const defBlend = () => { const em = D.endm.rows, sc = D.fcast.scen[D.fcast.start], tot = em.reduce((a, m) => a + m.s, 0); return em.reduce((a, m, i) => a + m.s / tot * sc[i], 0); };
/* End markets come in as sales growth (slide 11). Free cash flow moves about twice as much, because operating cash flow
   is about twice free cash flow (2025: $10.35B vs $5.09B after capex). cashLev() is that ratio, from DATA.uses. */
const cashLev = () => { const u = D.uses.items, ops = u.find(x => x[0] === 'Operations')[1], cx = -u.find(x => x[0] === 'Capex')[1]; return ops / (ops - cx); };
const emDrv = () => (A.fcastBlend != null ? A.fcastBlend : defBlend()) * cashLev();
const bridgeG = () => D.bridge.d.reduce((a, x) => a + r1(x.link ? emDrv() : x.v), 0);
const ourSrc = () => { const P = window.PITCH.growth; return P != null && P !== '' && !isNaN(parseFloat(P)) ? 'pitch' : D.bridge.sample ? 'pace' : 'bridge'; };
const ourG = () => { const s = ourSrc(); return s === 'pitch' ? parseFloat(window.PITCH.growth) : s === 'bridge' ? (A.ourGrowth != null ? A.ourGrowth : bridgeG()) : D.val.g1; };
// where the growth on slides 22-24 comes from, in words
const ourSrcTxt = () => ({pitch: 'our model', bridge: "the slide " + (A.idx('bridge') + 1) + " bridge's 2025-2029 rate", pace: 'the 2019-2025 pace until our bridge drivers are in'})[ourSrc()];
// 'we expect': only the team's own number (PITCH.growth or a sourced bridge), never the historical stand-in; read by the notes and slides 3 and 25
A.ourGrowthNow = () => ourSrc() === 'pace' ? null : ourG();
A.impliedNow = () => impG(priceNow(), D.val.w / 100, D.val.g / 100) * 100;
INIT.implied = sl => {
  const d = D.val, svg = $('#imSvg', sl);
  samp(sl, d.sample);
  const price = window.PITCH.price || d.price;
  const px = $('#imPx', sl); if (px && window.PITCH.price) px.textContent = usd(price) + ' (Bloomberg GP)';
  const src = $('#imSrc', sl); if (src) src.textContent = ourSrcTxt();
  let touched = false, syncing = false;
  const W = rng('imW', draw, v => v.toFixed(1) + '%'), G = rng('imG', draw, v => v.toFixed(1) + '%'), O = rng('imO', () => { if (!syncing) touched = true; draw(); }, v => v.toFixed(1) + '%');
  // the growth slider starts at our growth (PITCH.growth, else the cash flow bridge, else the 2019-2025 pace), clamped to its 0-18 range
  const toOurs = () => { syncing = true; O.set(clamp(r1(ourG()), 0, 18)); syncing = false; };
  $('#imRead', sl).addEventListener('click', e => { if (e.target.closest('[data-back]')){ touched = false; toOurs(); } });
  function solve(w, g){ let lo = -.2, hi = .4; for (let k = 0; k < 70; k++){ const mid = (lo + hi) / 2; if (dcf(d.fcf0, mid, d.years, w, g) < price) lo = mid; else hi = mid; } return (lo + hi) / 2; }
  function draw(){
    d.w = W.v; d.g = G.v;
    const w = W.v / 100, g = G.v / 100, imp = solve(w, g) * 100, ours = O.v;
    clear(svg);
    const x0 = 80, x1 = 870, yb = 450, gx = lin(0, 20, x0, x1), vals = []; for (let k = 0; k <= 20; k += .25) vals.push([k, dcf(d.fcf0, k / 100, d.years, w, g)]);
    const mx = Math.max(price * 1.6, Math.min(vals[vals.length - 1][1], price * 2.6)), y = lin(0, mx, yb, 14);
    const step = mx > 800 ? 200 : 100; const ticks = []; for (let v = 0; v <= mx; v += step) ticks.push(v);
    gridY(svg, x0, x1, y, ticks, v => '$' + v);
    for (let k = 0; k <= 20; k += 4) T('text', {x: gx(k), y: yb + 24, 'text-anchor': 'middle', class: 'ax'}, k + '%', svg);
    T('text', {x: (x0 + x1) / 2, y: yb + 48, 'text-anchor': 'middle', class: 'axt'}, 'Free cash flow growth a year, years 1-10', svg);
    const vis = vals.filter(p => p[1] <= mx * 1.02);
    S('path', {d: vis.map((p, i) => (i ? 'L' : 'M') + gx(p[0]) + ' ' + y(p[1])).join(' '), fill: 'none', stroke: C.navy, 'stroke-width': 4}, svg);
    S('line', {x1: x0, x2: x1, y1: y(price), y2: y(price), stroke: C.gold, 'stroke-width': 2.5, 'stroke-dasharray': '7 5'}, svg);
    const pT = T('text', {x: x0 + 8, y: y(price) - 8, class: 'dl', style: 'fill:#2B5780'}, 'Price ≈' + usd(price), svg);
    const vo = dcf(d.fcf0, ours / 100, d.years, w, g), showO = vo <= mx, ox = gx(ours), ix = gx(imp), inR = imp >= 0 && imp <= 20;
    // a white halo keeps the two labels readable in the rare spots where no side is free of the other line
    const halo = ';paint-order:stroke;stroke:#fff;stroke-width:6px;stroke-linejoin:round';
    let mkT = null, offT = null;
    if (inR){
      S('line', {x1: ix, x2: ix, y1: y(price), y2: yb, stroke: C.gold, 'stroke-width': 2}, svg); S('circle', {cx: ix, cy: y(price), r: 8, fill: C.gold, stroke: '#fff', 'stroke-width': 2.5}, svg);
      // the Market label sits beside the gold line, on the side away from the dotted line for our growth
      const mt = 'Market: ' + imp.toFixed(1) + '%', mw = mt.length * 8.8 + 14;
      let right = ix < x0 + 150;
      if (showO && !right && ox > ix - mw && ox < ix && ix + mw <= x1) right = true;
      else if (showO && right && ox > ix && ox < ix + mw && ix - mw >= x0) right = false;
      mkT = T('text', {x: ix + (right ? 8 : -8), y: yb - 10, 'text-anchor': right ? 'start' : 'end', class: 'dl', style: 'fill:#2B5780' + halo}, mt, svg);
    }
    else if (imp > 20) offT = T('text', {x: x1, y: y(price) - 8, 'text-anchor': 'end', class: 'dl', style: 'fill:#2B5780'}, 'Market: ' + imp.toFixed(1) + '% (off scale) →', svg);
    else offT = T('text', {x: x1, y: y(price) + 24, 'text-anchor': 'end', class: 'dl', style: 'fill:#2B5780'}, '← Market: ' + pct(imp, 1) + ' (off scale)', svg);
    if (showO){
      S('line', {x1: ox, x2: ox, y1: y(vo), y2: yb, stroke: C.navy, 'stroke-width': 2, 'stroke-dasharray': '3 4'}, svg); S('circle', {cx: ox, cy: y(vo), r: 9, fill: C.navy, stroke: '#fff', 'stroke-width': 2.5}, svg);
      const at = 'At ' + ours.toFixed(1) + '%: ' + usd(vo), aw = at.length * 11 + 14;
      // flip the label above-left when it would run off the chart or across the gold Market line
      const ly = y(vo) + 26, crossG = inR && ix > ox && ix < ox + aw && ly > y(price) && ly - 18 < yb;
      const flip = ox > x1 - 150 || (crossG && ox - aw >= x0);
      const aT = T('text', {class: 'dlb', style: halo.slice(1)}, at, svg);
      // try the preferred corner first, then the others, and keep the first one clear of the Price and Market labels and the gold line
      const C4 = [[14, ly, 'start'], [-14, y(vo) - 12, 'end'], [-14, ly, 'end'], [14, y(vo) - 12, 'start']], pref = flip ? 1 : 0;
      const put = (e, c) => { e.setAttribute('x', ox + c[0]); e.setAttribute('y', c[1]); e.setAttribute('text-anchor', c[2]); };
      const bb = e => { try { const r = e.getBBox(); return r.width ? r : null; } catch (_){ return null; } };
      const ov = (a, b) => a.x < b.x + b.width + 4 && b.x < a.x + a.width + 4 && a.y < b.y + b.height && b.y < a.y + a.height;
      const obs = () => { const o = [pT, mkT, offT].filter(Boolean).map(bb).filter(Boolean); if (inR) o.push({x: ix - 3, y: y(price), width: 6, height: yb - y(price)}); return o; };
      const clear1 = () => { const r = bb(aT); return !r || (r.x >= x0 - 12 && r.x + r.width <= x1 + 28 && r.y >= 0 && r.y + r.height <= yb && !obs().some(o => ov(r, o))); };
      const ok = [pref, 0, 1, 2, 3].filter((v, i, a) => a.indexOf(v) === i).some(k => { put(aT, C4[k]); return clear1(); });
      if (!ok){
        put(aT, C4[pref]);
        // no corner is free (a price far below today's): move the Price label to the right end of its line instead
        const pr = bb(pT), ar = bb(aT);
        if (pr && ar && ov(pr, ar)){ pT.setAttribute('x', x1); pT.setAttribute('text-anchor', 'end'); const p2 = bb(pT); if (p2 && (ov(p2, ar) || [mkT, offT].some(e => e && bb(e) && ov(p2, bb(e))))){ pT.setAttribute('x', x0 + 8); pT.removeAttribute('text-anchor'); } }
      }
    }
    if (mkT) svg.appendChild(mkT);
    S('line', {x1: x0, x2: x1, y1: yb, y2: yb, class: 'base'}, svg);
    // 'our growth' only while the slider sits on it; a dragged or clamped slider is a what-if
    const isOurs = Math.abs(ours - ourG()) < .05, pace = ourSrc() === 'pace', canBack = Math.abs(ours - clamp(r1(ourG()), 0, 18)) > .04;
    const vLab = !isOurs ? 'Value at ' + ours.toFixed(1) + '% growth (slider)' : pace ? 'Value at the 2019-25 pace' : 'Value at our growth';
    const rLab = !isOurs ? 'At <b>' + ours.toFixed(1) + '%</b> (what-if)' : pace ? 'At the 2019-2025 pace of <b>' + ours.toFixed(1) + '%</b>' : 'At our growth of <b>' + ours.toFixed(1) + '%</b>';
    $('#imKv', sl).innerHTML = '<div><span>Growth the price implies</span><b>' + imp.toFixed(1) + '%</b><i>a year for 10 years</i></div><div class="hi"><span>' + vLab + '</span><b>' + usd(vo) + '</b><i>' + sg((vo / price - 1) * 100, 0, '%') + ' vs ' + usd(price) + '</i></div><div><span>2019-2025, actual</span><b>' + d.hist + '%</b><i>FCF per share growth a year (Bloomberg)</i></div>';
    $('#imRead', sl).innerHTML = 'The price implies <b>' + imp.toFixed(1) + '%</b> a year. Linde grew free cash flow per share <b>' + d.hist + '%</b> a year in 2019-2025. ' + rLab + ': value ' + usd(vo) + ', ' + sg((vo / price - 1) * 100, 0, '%') + ' vs the price. ' + (canBack ? '<button type="button" class="btn sm" data-back>' + (pace ? 'Back to the 2019-25 pace' : 'Back to our growth') + '</button>' : '<span class="fill">[Our expected growth and why]</span>');
  }
  toOurs();
  // always redraw on entering: labels are placed by measuring them, which needs the slide on screen
  return { enter(){ if (Math.abs(W.v - d.w) > .04) W.set(d.w); if (Math.abs(G.v - d.g) > .04) G.set(d.g); if (!touched && Math.abs(O.v - clamp(r1(ourG()), 0, 18)) > .04) toOurs(); else draw(); } };
};

/* ---- 3D value landscape ---- */
INIT.surface = sl => {
  const d = D.val, host = $('#sfHost', sl), tab = $('#sfTable', sl), fall = $('#sfFall', sl);
  samp(sl, d.sample);
  const price = window.PITCH.price || d.price;
  const WS = [6, 10], GSr = [1.5, 4];
  // our growth (PITCH.growth, else the cash flow bridge, else the 2019-2025 pace); re-read on entering the slide, see enter()
  let gOur = ourG(), base = 0;
  const V = (w, g) => dcf(d.fcf0, gOur / 100, d.years, w / 100, g / 100);
  const ws = [], gsv = []; for (let w = 6; w <= 10.001; w += .5) ws.push(+w.toFixed(1)); for (let g = 1.5; g <= 4.001; g += .5) gsv.push(+g.toFixed(1));
  // the grid point nearest the side-card inputs, outlined in the table
  let nw, ng, read2, wNow = d.w, gNow = d.g;
  const read3 = '<b>Blue dot:</b> our inputs. <b>Blue plane:</b> the price, about ' + usd(price) + '.';
  const mkRead2 = () => '<b>Outlined cell:</b> the grid point nearest our inputs (WACC ' + nw.toFixed(1) + '%, growth ' + ng.toFixed(1) + '%). Brown cells sit above the price of about ' + usd(price) + ', red cells below.';
  // the table, the side card and the footer for the current growth
  function paint(){
    wNow = d.w; gNow = d.g;
    nw = ws.reduce((a, b) => Math.abs(b - d.w) < Math.abs(a - d.w) ? b : a); ng = gsv.reduce((a, b) => Math.abs(b - d.g) < Math.abs(a - d.g) ? b : a); read2 = mkRead2();
    base = V(d.w, d.g);
    let th = '<table class="dtab" style="font-size:17px"><thead><tr><th>WACC ↓ · growth →</th>' + gsv.map(g => '<th class="n">' + g.toFixed(1) + '%</th>').join('') + '</tr></thead><tbody>';
    ws.forEach(w => { th += '<tr><td><b>' + w.toFixed(1) + '%</b></td>' + gsv.map(g => { const v = V(w, g), up = v / price - 1; const bg = up >= 0 ? 'rgba(107,67,43,' + Math.min(.85, .12 + up * .9).toFixed(2) + ')' : 'rgba(178,58,46,' + Math.min(.6, .1 - up * .9).toFixed(2) + ')'; const fg = up > .5 ? '#fff' : '#1A1A1A'; return '<td class="n" style="background:' + bg + ';color:' + fg + (w === nw && g === ng ? ';outline:3px solid ' + C.gold + ';outline-offset:-3px' : '') + '">' + usd(v) + '</td>'; }).join('') + '</tr>'; });
    tab.innerHTML = th + '</tbody></table>';
    let share = 0, tot = 0; for (let w = 6; w <= 10; w += .25) for (let g = 1.5; g <= 4; g += .125){ tot++; if (V(w, g) >= price) share++; }
    const gl = ourSrc() === 'pace' ? 'FCF growth ' + gOur.toFixed(1) + '% (2019-25 pace)' : 'Our FCF growth ' + gOur.toFixed(1) + '%';
    $('#sfKv', sl).innerHTML = '<div class="hi"><span>Value at our inputs</span><b>' + usd(base) + '</b><i>' + gl + ', WACC ' + d.w + '%, long-run ' + d.g + '%</i></div><div><span>Share of inputs above price</span><b>' + Math.round(share / tot * 100) + '%</b><i>of the grid sits above ' + usd(price) + '</i></div>';
    const fs = $('#sfSrc', sl); if (fs) fs.textContent = ourSrc() === 'pace' ? 'the 2019-2025 pace of ' + d.hist + '% a year, until our bridge drivers are in' : ourSrc() === 'pitch' ? "our model's " + gOur.toFixed(1) + '% a year' : 'our bridge rate of ' + gOur.toFixed(1) + '% a year (slide ' + (A.idx('bridge') + 1) + ')';
  }
  paint();
  $('#sfRead', sl).innerHTML = read3;
  let three = null, mode = '3d';
  const b3 = $('#sf3', sl), b2 = $('#sf2', sl);
  const hint = b3.parentNode.querySelector('.xs.muted'), hint3 = hint ? hint.textContent : '';
  function setMode(m){ mode = m; if (hint) hint.textContent = m === '2d' ? "Each cell is the value per share for one WACC and growth pair. Brown is above today's price, red is below." : hint3; $('#sfRead', sl).innerHTML = m === '2d' ? read2 : read3; b3.classList.toggle('on', m === '3d'); b2.classList.toggle('on', m === '2d'); tab.classList.toggle('hidden', m !== '2d'); if (three){ if (m === '3d') three.start(); else three.stop(); } }
  b3.addEventListener('click', () => { if (three) setMode('3d'); });
  b2.addEventListener('click', () => setMode('2d'));
  function build(){
    const THREE = window.THREE; if (!THREE || !THREE.OrbitControls) return null;
    let renderer; try { renderer = new THREE.WebGLRenderer({antialias: true}); } catch (e){ return null; }
    if (!renderer || !renderer.getContext()) return null;
    renderer.setClearColor(0xFAF8F4, 1); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;
    host.appendChild(renderer.domElement); renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;z-index:1';
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0xFAF8F4);
    const cam = new THREE.PerspectiveCamera(36, 1, .1, 300); cam.position.set(19, 15, 21);
    const ctr = new THREE.OrbitControls(cam, renderer.domElement); ctr.target.set(0, 2.4, 0); ctr.enableDamping = true; ctr.dampingFactor = .08; ctr.minDistance = 14; ctr.maxDistance = 55; ctr.maxPolarAngle = 1.45; ctr.update();
    scene.add(new THREE.HemisphereLight(0xffffff, 0xB9A898, .6));
    const sun = new THREE.DirectionalLight(0xffffff, .95); sun.position.set(10, 22, 12); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, {left: -14, right: 14, top: 14, bottom: -14}); scene.add(sun);
    const XW = 12, ZW = 9, NX = 48, NZ = 40, vMax = V(6, 4), YS = 9 / vMax;
    const xOf = w => (w - 8) / 4 * XW, zOf = g => -(g - 2.75) / 2.5 * ZW;
    const pos = [], col = [], idx = [];
    const cLo = new THREE.Color(0xEFE3D9), cMid = new THREE.Color(0xB08566), cHi = new THREE.Color(0x6B432B), cBad = new THREE.Color(0xE7B9B2);
    for (let j = 0; j <= NZ; j++) for (let i = 0; i <= NX; i++){ const w = 6 + i / NX * 4, g = 1.5 + j / NZ * 2.5, v = V(w, g); pos.push(xOf(w), v * YS, zOf(g)); const c = new THREE.Color(); if (v < price) c.copy(cBad).lerp(cLo, v / price); else c.copy(cMid).lerp(cHi, Math.min(1, (v - price) / price)); col.push(c.r, c.g, c.b); }
    for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++){ const a = j * (NX + 1) + i, b = a + 1, c = a + NX + 1, e = c + 1; idx.push(a, c, b, b, c, e); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); geo.setIndex(idx); geo.computeVertexNormals();
    const surf = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({vertexColors: true, side: THREE.DoubleSide, roughness: .6, metalness: .04})); surf.castShadow = true; surf.receiveShadow = true; scene.add(surf);
    const rowMat = new THREE.LineBasicMaterial({color: 0x8E5939, transparent: true, opacity: .3});
    for (let j = 0; j <= NZ; j += 8){ const pts = []; for (let i = 0; i <= NX; i++){ const w = 6 + i / NX * 4, g = 1.5 + j / NZ * 2.5; pts.push(new THREE.Vector3(xOf(w), V(w, g) * YS + .02, zOf(g))); } scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), rowMat)); }
    for (let i = 0; i <= NX; i += 6){ const pts = []; for (let j = 0; j <= NZ; j++){ const w = 6 + i / NX * 4, g = 1.5 + j / NZ * 2.5; pts.push(new THREE.Vector3(xOf(w), V(w, g) * YS + .02, zOf(g))); } scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), rowMat)); }
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(XW + 1.2, ZW + 1.2), new THREE.MeshBasicMaterial({color: 0x2B5780, transparent: true, opacity: .28, side: THREE.DoubleSide, depthWrite: false}));
    plane.rotation.x = -Math.PI / 2; plane.position.y = price * YS; scene.add(plane);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(plane.geometry), new THREE.LineBasicMaterial({color: 0x2B5780})); edge.rotation.x = -Math.PI / 2; edge.position.y = price * YS; scene.add(edge);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({color: 0xF1ECE4, roughness: 1})); floor.rotation.x = -Math.PI / 2; floor.position.y = -.02; floor.receiveShadow = true; scene.add(floor);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(.38, 24, 16), new THREE.MeshStandardMaterial({color: 0x2B5780, emissive: 0x0F2238})); dot.position.set(xOf(d.w), base * YS + .3, zOf(d.g)); dot.castShadow = true; scene.add(dot);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, base * YS + .3, 8), new THREE.MeshBasicMaterial({color: 0x2B5780})); stem.position.set(xOf(d.w), (base * YS + .3) / 2, zOf(d.g)); scene.add(stem);
    function sprite(text, o){ o = o || {}; const cv = document.createElement('canvas'), g = cv.getContext('2d'), fs = 64; g.font = (o.w || 600) + ' ' + fs + 'px "Arial", Arial, sans-serif'; const tw = Math.ceil(g.measureText(text).width) + 44; cv.width = tw; cv.height = fs + 36; g.font = (o.w || 600) + ' ' + fs + 'px "Arial", Arial, sans-serif'; g.textBaseline = 'middle'; if (o.bg){ g.fillStyle = o.bg; g.fillRect(0, 0, tw, cv.height); } g.fillStyle = o.c || '#1A1A1A'; g.fillText(text, 22, cv.height / 2 + 2); const tx = new THREE.CanvasTexture(cv); tx.minFilter = THREE.LinearFilter; if ('encoding' in tx) tx.encoding = THREE.sRGBEncoding; const sp = new THREE.Sprite(new THREE.SpriteMaterial({map: tx, transparent: true, depthTest: false})); const s = (o.s || .5) / 64; sp.scale.set(tw * s, cv.height * s, 1); sp.center.set(o.cx == null ? .5 : o.cx, .5); sp.renderOrder = 5; scene.add(sp); return sp; }
    [6, 7, 8, 9, 10].forEach(w => sprite(w + '%', {s: .45, c: '#595959'}).position.set(xOf(w), .05, zOf(1.5) + 1.1));
    sprite('WACC (discount rate) →', {s: .5, c: '#6B432B', w: 700}).position.set(0, .05, zOf(1.5) + 3.1);
    [1.5, 2.5, 3.5].forEach(g => sprite(g.toFixed(1) + '%', {s: .45, c: '#595959', cx: 0}).position.set(xOf(10) + .9, .05, zOf(g)));
    sprite('Long-run growth →', {s: .5, c: '#6B432B', w: 700, cx: 0}).position.set(xOf(10) + 2.4, .05, zOf(2.75));
    sprite('Price ' + usd(price), {s: .5, c: '#FFFFFF', bg: '#2B5780', cx: 0}).position.set(xOf(10) + .8, price * YS, zOf(4) - .4);
    sprite('Our case ' + usd(base), {s: .5, c: '#FFFFFF', bg: '#6B432B'}).position.set(xOf(d.w), base * YS + 1.4, zOf(d.g));
    // hover readout
    const ray = new THREE.Raycaster(), mv = new THREE.Vector2();
    renderer.domElement.addEventListener('pointermove', e => { if (e.buttons) return; const r = renderer.domElement.getBoundingClientRect(); mv.x = (e.clientX - r.left) / r.width * 2 - 1; mv.y = -(e.clientY - r.top) / r.height * 2 + 1; ray.setFromCamera(mv, cam); const h = ray.intersectObject(surf)[0]; if (!h){ hideTip(sl); return; } const w = 8 + h.point.x / XW * 4, g = 2.75 - h.point.z / ZW * 2.5; const v = V(w, g); showTip(sl, e, 'WACC <b>' + w.toFixed(1) + '%</b> · growth <b>' + g.toFixed(1) + '%</b> → <b>' + usd(v) + '</b> (' + sg((v / price - 1) * 100, 0, '%') + ')'); });
    renderer.domElement.addEventListener('pointerleave', () => hideTip(sl));
    function size(){ const w = host.clientWidth || 900, h = host.clientHeight || 560; const sc = host.getBoundingClientRect().width / w || 1; renderer.setPixelRatio(clamp((window.devicePixelRatio || 1) * sc, .75, 2)); renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    let running = false, t0 = 0;
    function loop(now){ if (!t0) t0 = now; if (!A.RM && now - t0 < 2600 && !userMoved){ const k = (now - t0) / 2600, e = 1 - Math.pow(1 - k, 3); const a = .9 - e * .35; cam.position.set(Math.sin(a) * 30, 15, Math.cos(a) * 30); cam.lookAt(ctr.target); } ctr.update(); renderer.render(scene, cam); }
    let userMoved = false; renderer.domElement.addEventListener('pointerdown', () => { userMoved = true; });
    const ro = window.ResizeObserver ? new ResizeObserver(() => { size(); if (!running) renderer.render(scene, cam); }) : null; if (ro) ro.observe(host);
    size();
    return { start(){ size(); if (!running){ running = true; t0 = 0; renderer.setAnimationLoop(loop); } }, stop(){ running = false; renderer.setAnimationLoop(null); },
      dispose(){ running = false; renderer.setAnimationLoop(null); if (ro) ro.disconnect(); scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material){ if (o.material.map) o.material.map.dispose(); o.material.dispose(); } }); renderer.dispose(); renderer.domElement.remove(); } };
  }
  return {
    enter(){
      // the bridge (or forecast) changed since this slide was built: repaint the table and card, and rebuild the mesh at the new growth
      if (Math.abs(ourG() - gOur) > .04 || Math.abs(d.w - wNow) > .01 || Math.abs(d.g - gNow) > .01){ gOur = ourG(); paint(); if (mode === '2d') $('#sfRead', sl).innerHTML = read2; if (three){ three.dispose(); three = null; delete host.dataset.tried; } }
      if (!three && !host.dataset.tried){ host.dataset.tried = '1'; try { three = build(); } catch (e){ console.warn(e); three = null; } if (three) fall.hidden = true; else { fall.textContent = '3D needs WebGL, which is off in this browser. The table shows the same values.'; setMode('2d'); b3.disabled = true; } } if (three && mode === '3d') three.start(); },
    leave(){ if (three) three.stop(); hideTip(sl); }
  };
};

/* ---- scenarios + football field ---- */
INIT.scen = sl => {
  const d = D.scen, box = $('#scCards', sl), svg = $('#ffSvg', sl);
  samp(sl, d.sample);
  const price = window.PITCH.price || D.val.price;
  // the DCF bar uses the same dcf() and inputs as slides 22-23 (our growth, long-run growth), unless the team typed a range
  // recomputed on every draw and on entering the slide, so a later edit on the bridge (slide 20) reaches the bar
  const v = D.val, dr = d.ff.findIndex(f => /^DCF/.test(f[0])), autoD = dr >= 0 && (d.ff[dr][1] == null || d.ff[dr].auto);
  function dcfRow(){
    if (!autoD) return;
    const gOur = ourG(), vals = [];
    for (let w = 7; w <= 9.001; w += .25) vals.push(dcf(v.fcf0, gOur / 100, v.years, w / 100, v.g / 100));
    d.ff[dr] = ['DCF, WACC 7-9%', Math.round(Math.min(...vals)), Math.round(Math.max(...vals))];
    d.ff[dr].tip = 'long-run growth ' + v.g + '%, FCF growth ' + gOur.toFixed(1) + '% a year';
    d.ff[dr].auto = true;
  }
  const probs = d.s.map(s => s.p);
  const ctl = d.s.map((s, i) => {
    const c = H('div', {class: 'scn ' + s.k}, '<span class="k">' + esc(s.n) + ' case</span><b class="v">' + usd(s.v) + '</b><i class="vs">' + sg((s.v / price - 1) * 100, 0, '%') + ' vs ' + usd(price) + '</i><p>' + esc(s.a).replace(/\[([^\]]*)\]/g, '<span class="fill">[$1]</span>') + '</p><div class="ctl"><label for="scp' + i + '">Probability <output id="scp' + i + 'o"></output></label><input type="range" id="scp' + i + '" min="0" max="100" step="5" value="' + s.p + '"></div>', box);
    // moving one probability rebalances the other two in proportion, so the three always add to 100%
    return rng('scp' + i, nv => {
      probs[i] = nv;
      const o = [0, 1, 2].filter(k => k !== i), rest = 100 - nv, os = probs[o[0]] + probs[o[1]];
      probs[o[0]] = os ? Math.round(probs[o[0]] / os * rest / 5) * 5 : Math.round(rest / 2 / 5) * 5;
      probs[o[1]] = rest - probs[o[0]];
      o.forEach(k => { const e = ctl[k].el; e.value = probs[k]; e.style.setProperty('--p', probs[k] + '%'); const out = document.getElementById('scp' + k + 'o'); if (out) out.textContent = probs[k] + '%'; });
      draw();
    }, nv => nv + '%');
  });
  // risk / reward from the case values alone, not the sliders; the ratio uses the rounded % shown, so the printed numbers divide to it
  const bear = d.s.find(s => s.k === 'bear').v, bull = d.s.find(s => s.k === 'bull').v, up = (bull / price - 1) * 100, dn = (1 - bear / price) * 100;
  const upR = Math.round(up), dnR = Math.round(dn), ratio = up > 0 && dn > 0 && upR > 0 && dnR > 0 ? upR / dnR : null;
  const rr = () => up <= 0 ? 'Bull case is at or below the price. ' : dn <= 0 ? 'Bear case is at or above the price. ' :
    'Upside to bull ' + sg(upR, 0, '%') + ' vs downside to bear ' + sg(-dnR, 0, '%') + (ratio == null ? '. ' : ratio >= 1 ? ': ' + ratio.toFixed(1) + ' to 1. ' : ': more downside to the bear than upside to the bull. ');
  function draw(){
    dcfRow();
    const sum = probs.reduce((a, b) => a + b, 0), tot = sum || 1, pt = d.s.reduce((a, s, i) => a + s.v * probs[i] / tot, 0);
    // the headline number is the weighted value worked out here, so it follows the sliders
    $('#scPt', sl).textContent = usd(pt);
    // our own DCF (when computed) sits below the price: no upside-skew claim, and say the cases need reconciling
    const dc = dr >= 0 && d.ff[dr].auto ? d.ff[dr] : null, dcLow = dc && dc[2] < price;
    $('#scAsym', sl).textContent = ratio != null && ratio > 1 && !dcLow ? ', with more upside to the bull than downside to the bear' : ' across bear, base and bull';
    clear(svg);
    // tick step from the span, so a wide range (a fast bridge) stays readable; never below $0
    const lo0 = Math.min(...d.ff.map(f => f[1]), price, pt), hi0 = Math.max(...d.ff.map(f => f[2]), pt), step = [50, 100, 250, 500, 1000].find(s => (hi0 - lo0) / s <= 14) || 2000;
    const x0 = 260, x1 = 1360, lo = Math.max(0, Math.floor(lo0 / step) * step - step), hi = Math.ceil(hi0 / step) * step + step, x = lin(lo, hi, x0, x1), rh = 44, y0 = 16;
    for (let v = lo; v <= hi; v += step){ S('line', {x1: x(v), x2: x(v), y1: y0, y2: y0 + d.ff.length * rh, stroke: C.line}, svg); T('text', {x: x(v), y: y0 + d.ff.length * rh + 24, 'text-anchor': 'middle', class: 'ax'}, usd(v), svg); }
    const ends = [], halo = ';paint-order:stroke;stroke:#fff;stroke-width:5px;stroke-linejoin:round';
    d.ff.forEach((f, i) => { const y = y0 + i * rh; T('text', {x: x0 - 14, y: y + rh / 2 + 6, 'text-anchor': 'end', class: 'axl'}, f[0], svg); const r = S('rect', {x: x(f[1]), y: y + 8, width: x(f[2]) - x(f[1]), height: rh - 16, fill: i === d.ff.length - 1 ? C.navy : C.light}, svg); hov(r, sl, () => '<b>' + esc(f[0]) + '</b>: ' + usd(f[1]) + ' to ' + usd(f[2]) + (f.tip ? ' (' + esc(f.tip) + ')' : '')); ends.push(T('text', {x: x(f[1]) - 8, y: y + rh / 2 + 6, 'text-anchor': 'end', class: 'dl', style: 'font-size:14px' + halo}, usd(f[1]), svg)); ends.push(T('text', {x: x(f[2]) + 8, y: y + rh / 2 + 6, class: 'dl', style: 'font-size:14px' + halo}, usd(f[2]), svg)); });
    const yb = y0 + d.ff.length * rh;
    S('line', {x1: x(price), x2: x(price), y1: y0 - 6, y2: yb, stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '6 4'}, svg); T('text', {x: x(price), y: y0 - 2 - 6, 'text-anchor': 'middle', class: 'dl'}, 'Price ' + usd(price), svg);
    if (sum > 0){ S('line', {x1: x(pt), x2: x(pt), y1: y0 - 6, y2: yb, stroke: C.gold, 'stroke-width': 4}, svg); T('text', {x: x(pt), y: yb + 48, 'text-anchor': 'middle', class: 'dlb', style: 'fill:#2B5780'}, 'Weighted target ' + usd(pt) + ' (' + sg((pt / price - 1) * 100, 0, '%') + ')', svg); }
    // the bar-end values go on top of the price and target lines, with a white halo, so a line never cuts through a number
    ends.forEach(e => svg.appendChild(e));
    const P = window.PITCH, tg = P.target != null && P.target !== '' ? parseFloat(P.target) : null;
    $('#scTakeT', sl).textContent = rr() + 'Weighted target ' + usd(pt) + ' (' + sg((pt / price - 1) * 100, 0, '%') + ').' +
      (tg != null && !isNaN(tg) && Math.abs(tg - pt) > 1 ? ' Our stated target ' + usd(tg) + ' differs from the weighted value ' + usd(pt) + '.' : '') +
      (dcLow ? ' Our DCF at ' + (ourSrc() === 'pace' ? 'the 2019-2025 pace' : 'our growth') + ' (' + usd(dc[1]) + ' to ' + usd(dc[2]) + ') sits below ' + (dc[2] < bear ? 'the bear case' : 'the price') + '; the case values need to be reconciled with the model.' : '');
  }
  draw();
  return { enter(){ draw(); } };
};

/* ---- cash flow bridge: 2025 to 2029 by driver, against what the price needs ---- */
INIT.bridge = sl => {
  const d = D.bridge, v = D.val, svg = $('#brSvg', sl), box = $('#brCtl', sl);
  if (d.sample) samp(sl, true); else srcok(sl, 'inputs from 10-K, Q3 2026', null, 'fc');
  const price = priceNow(), f0 = v.fcf0, yrs = d.years, fi = A.idx('fcast');
  const val = d.d.map(x => r1(x.link ? emDrv() : x.v));
  let touched = false, syncing = false;
  const ctl = d.d.map((x, i) => {
    H('div', {class: 'ctl'}, '<label for="brs' + i + '">' + esc(x.n) + ' <output id="brs' + i + 'o"></output></label><input type="range" id="brs' + i + '" min="' + (x.link ? -10 : -8) + '" max="' + (x.link ? 20 : 10) + '" step="0.1" value="' + val[i] + '">' + (x.link ? '<span class="bs" id="brLinkCap"></span>' : '<span class="bs">' + esc(x.s) + '</span>'), box);
    return rng('brs' + i, nv => { val[i] = nv; if (x.link && !syncing){ touched = true; cap(); } draw(); }, nv => sg(nv, 1, '%'));
  });
  // where the End markets number comes from: slide 11's chip (or a custom view), or set here
  const capTxt = () => { const vw = A.fcastView || D.fcast.start; return touched ? 'set here, not slide ' + (fi + 1) : 'slide ' + (fi + 1) + ', ' + (vw === 'custom' ? 'custom view' : vw.replace(/^./, c => c.toUpperCase())); };
  const cap = () => { const e = $('#brLinkCap', sl); if (e) e.textContent = capTxt(); };
  cap();
  function draw(){
    const sum = val.reduce((a, b) => a + b, 0) / 100, end = f0 * Math.pow(1 + sum, yrs);
    A.ourGrowth = sum * 100;
    const imp = impG(price, v.w / 100, v.g / 100), need = f0 * Math.pow(1 + imp, yrs);
    const dl = Math.abs(sum) > 1e-9 ? val.map(g => (end - f0) * (g / 100) / sum) : val.map(g => f0 * g / 100 * yrs);
    clear(svg);
    let run = f0, peak = f0; dl.forEach(x => { run += x; peak = Math.max(peak, run); });
    const x0 = 10, x1 = 950, yb = 300, top = Math.max(end, need, peak) * 1.14, y = lin(0, top, yb, 14);
    const st = top > 40 ? 10 : 5, tk = []; for (let t = 0; t <= top; t += st) tk.push(t);
    gridY(svg, x0, x1, y, tk, t => '$' + t);
    const n = dl.length + 2, bw = (x1 - x0) / n, w = bw * .62;
    const cx = i => x0 + i * bw + bw / 2;
    function bar(i, a0, a1, fill, lab, txt, tip){
      const r = S('rect', {x: cx(i) - w / 2, y: y(Math.max(a0, a1)), width: w, height: Math.max(2, Math.abs(y(a0) - y(a1))), fill}, svg);
      T('text', {x: cx(i), y: yb + 24, 'text-anchor': 'middle', class: 'axl', style: 'font-size:15px'}, lab, svg);
      T('text', {x: cx(i), y: y(Math.max(a0, a1)) - 9, 'text-anchor': 'middle', class: i === 0 || i === n - 1 ? 'dlb' : 'dl', style: 'font-size:16px'}, txt, svg);
      hov(r, sl, () => tip);
    }
    bar(0, 0, f0, C.navy, '2025', '$' + f0.toFixed(2), '<b>2025 actual</b>: $' + f0.toFixed(2) + ' of free cash flow per share (Bloomberg)');
    let acc = f0;
    dl.forEach((x, i) => {
      const a0 = acc, a1 = acc + x;
      S('line', {x1: cx(i) + w / 2, x2: cx(i + 1) - w / 2, y1: y(a0), y2: y(a0), stroke: C.grey, 'stroke-width': 1, 'stroke-dasharray': '3 3'}, svg);
      bar(i + 1, a0, a1, x >= 0 ? C.steel : C.bad, d.d[i].n, (x >= 0 ? '+' : '−') + '$' + Math.abs(x).toFixed(2), '<b>' + esc(d.d[i].n) + '</b>: ' + sg(val[i], 1, '%') + ' a year adds ' + (x >= 0 ? '+' : '−') + '$' + Math.abs(x).toFixed(2) + ' a share by 2029');
      acc = a1;
    });
    S('line', {x1: cx(n - 2) + w / 2, x2: cx(n - 1) - w / 2, y1: y(acc), y2: y(acc), stroke: C.grey, 'stroke-width': 1, 'stroke-dasharray': '3 3'}, svg);
    bar(n - 1, 0, end, C.navy, '2029E', '$' + end.toFixed(2), '<b>2029 estimate</b>: $' + end.toFixed(2) + ', ' + sg(sum * 100, 1, '%') + ' a year');
    S('line', {x1: x0, x2: x1, y1: y(need), y2: y(need), stroke: C.gold, 'stroke-width': 3, 'stroke-dasharray': '9 6'}, svg);
    svg.querySelectorAll('text.dl, text.dlb').forEach(t => svg.appendChild(t));  // value labels sit on top of the needed-growth line
    // the needed-value label sits above or below the line, clear of every driver's value label and bar, else at the top
    const keep = []; let ac2 = f0; dl.forEach(x => { const t = y(Math.max(ac2, ac2 + x)), b = Math.max(t + 2, y(Math.min(ac2, ac2 + x))); keep.push([t - 9, t, b]); ac2 += x; });
    const ly = [y(need) - 10, y(need) + 24].find(c => keep.every(([l, t, b]) => Math.abs(l - c) >= 22 && (c + 5 < t || c - 14 > b))) || 14;
    T('text', {x: cx(1) - w / 2, y: ly, class: 'dlb', style: 'fill:#2B5780;font-size:16px;paint-order:stroke;stroke:#fff;stroke-width:6px;stroke-linejoin:round'}, 'What the price needs by 2029: $' + need.toFixed(2) + ' (' + (imp * 100).toFixed(1) + '% a year)', svg);
    S('line', {x1: x0, x2: x1, y1: yb, y2: yb, class: 'base'}, svg);
    const gap = sum * 100 - imp * 100, good = gap >= 0;
    $('#brKv', sl).innerHTML = '<div class="hi" style="grid-column:1/-1"><span>Free cash flow per share, 2029E</span><b>$' + end.toFixed(2) + '</b><i>from $' + f0.toFixed(2) + ' in 2025 · ' + sg((end / need - 1) * 100, 0, '%') + ' vs what the price needs</i></div>' +
      '<div><span>Our drivers add up to</span><b>' + sg(sum * 100, 1, '%') + '</b><i>a year</i></div><div><span>The price needs</span><b>' + (imp * 100).toFixed(1) + '%</b><i>a year (reverse DCF)</i></div>' +
      '<div style="grid-column:1/-1;border-color:' + (good ? C.good : C.bad) + '"><span>Gap</span><b style="color:' + (good ? C.good : C.bad) + '">' + sg(gap, 1, ' pts') + '</b><i>' + (good ? 'our drivers beat what the price assumes' : 'the price already assumes more than our drivers') + '</i></div>';
  }
  draw();
  return { enter(){ cap(); if (!touched && A.fcastBlend != null && Math.abs(r1(emDrv()) - val[0]) > .04){ syncing = true; ctl[0].set(r1(emDrv())); syncing = false; } } };
};

/* ---- pre-mortem: three stories, their odds, and 100 possible futures ---- */
INIT.premortem = sl => {
  const d = D.premortem, box = $('#pmOdds', sl), cards = $$('.flip.pm', sl);
  samp(sl, d.sample);
  cards.forEach(b => b.addEventListener('click', () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }));
  const p = d.p.slice();
  const odds = cards.map(c => { const o = H('span', {class: 'pmo'}, '<b>0%</b><span>odds by 2029</span>'); const f = $('.ff', c); f.insertBefore(o, $('.hint', f)); return $('b', o); });
  p.forEach((v, i) => { H('div', {class: 'ctl'}, '<label for="pmp' + i + '">Story ' + (i + 1) + ' <output id="pmp' + i + 'o"></output></label><input type="range" id="pmp' + i + '" min="0" max="60" step="5" value="' + v + '">', box); rng('pmp' + i, nv => { p[i] = nv; draw(); }, nv => nv + '%'); });
  const sc = A.idx('scen');
  const go = H('button', {type: 'button', class: 'btn sm', style: 'align-self:flex-start;margin-top:auto'}, 'Priced in the bear case: slide ' + (sc + 1) + ' →', box);
  go.addEventListener('click', () => A.jump(sc));
  function draw(){
    odds.forEach((o, i) => { o.textContent = p[i] + '%'; });
  }
  draw();
};

/* ---- close: the call and the scorecard ---- */
INIT.close = sl => {
  const P = window.PITCH, band = $('#clBand', sl), t = $('#clTab', sl);
  band.innerHTML = '<div class="cr">' + F(P.rating, 'BUY') + '</div><div class="cn"><span class="clogo cc">' + A.logo() + '</span><b>' + esc(P.company) + '</b><span>' + esc(P.exchange) + ': ' + esc(P.ticker) + '</span></div>' +
    [['Price', A.kval('price'), '$ price'], ['Target', A.kval('target'), '$ target'], ['Upside', A.kval('upside'), 'x%'], ['Horizon', P.horizon, 'Horizon'], ['Position', P.position, 'x% of sleeve']].map(x => '<div class="cs"><span>' + x[0] + '</span><b>' + F(x[1], x[2]) + '</b></div>').join('');
  // back to slide 3: the question, what the price needs and what we expect (text copied, never the fill node)
  // 'we expect' is the same number slides 22-24 use (PITCH.growth, else a sourced bridge); refreshed on entering the slide
  function qband(){
    const imp = A.impliedNow(), ours = A.ourGrowthNow(), ot = P.growth != null && P.growth !== '' ? P.growth : ours == null ? null : ours.toFixed(1) + '%';
    const qe = document.querySelector('[data-f="question.2"]'), qt = qe ? qe.textContent.trim() : '';
    const q = !qe || qe.classList.contains('fill') ? '<span class="fill">' + esc(qt || '[Our question in one sentence]') + '</span>' : esc(qt);
    $('#clQ', sl).innerHTML = '<span class="k">The question we answered</span><p><span class="q">' + q + '</span> <span class="a">The price needs <b>' + imp.toFixed(1) + '%</b> a year. We expect <b>' + F(ot, 'x% a year') + '</b>' + (ours == null || isNaN(ours) ? '.' : Math.abs(ours - imp) < .05 ? ': <b>in line with</b> what the price needs.' : ': <b>' + Math.abs(ours - imp).toFixed(1) + ' pts</b> ' + (ours >= imp ? 'above' : 'below') + ' what the price needs.') + '</span></p>';
    // the question is clamped to two lines here: flag it, since slide 3 shows it in full
    const qs = $('#clQ .q', sl); if (qs && qs.scrollHeight > qs.clientHeight + 2){ qs.classList.add('clamped'); console.warn('Slide ' + (A.idx('close') + 1) + ': the question is cut to two lines. Keep it under about 200 characters.'); }
  }
  qband();
  t.innerHTML = '<thead><tr><th style="width:30%">Reason</th><th>What we expect</th><th>Signal and date</th><th>We change our recommendation if</th></tr></thead><tbody>' + P.pillars.map((p, i) =>
    '<tr class="click" data-go="' + esc(p.go) + '"><td><div class="scr"><span class="scb">' + (i + 1) + '</span><span><b>' + F(p.h, 'Reason ' + (i + 1) + ': headline') + '</b><em>Evidence: slide ' + (A.idx(p.go) + 1) + ' →</em></span></div></td><td>' + F(p.expect, 'the number we expect, and by when') + '</td><td>' + F(p.signal, 'the report or data point, with its date') + '</td><td>' + F(p.sell, 'the tripwire') + '</td></tr>').join('') + '</tbody>';
  $$('tr.click', t).forEach(r => r.addEventListener('click', e => { if (!e.target.closest('.scr em')) return; const g = A.idx(r.dataset.go); if (g >= 0) A.jump(g); }));
  return { enter(){ qband(); } };
};

/* ---- covers: team lists ---- */
function teamList(el, cls){ ['G', 'A', 'D', 'R', 'X'].forEach(k => { const o = window.OWNERS[k]; H('div', null, '<b>' + esc(o.n) + (k === 'A' && !o.last ? ' <span class="fill">[last name]</span>' : '') + '</b><span>' + esc(o.r) + '</span>', el); }); }

/* ---- backup: comps and sources ---- */
INIT.comps = sl => {
  const d = D.comps, t = $('#compsTab', sl);
  srcok(sl, 'Linde and sector: Bloomberg');
  let key = 2, dir = 1;
  const val = (r, k) => r[k] == null ? null : r[k];
  function draw(){
    const rows = d.rows.slice().sort((a, b) => { if (key === 0) return String(a[0]).localeCompare(b[0]) * dir; const va = val(a, key), vb = val(b, key); if (va == null && vb == null) return 0; if (va == null) return 1; if (vb == null) return -1; return (vb - va) * dir; });
    t.innerHTML = '<thead><tr>' + d.cols.map((c, i) => '<th class="' + (i ? 'n' : '') + '"><button type="button" data-k="' + i + '">' + esc(c) + (i === key ? (dir > 0 ? ' ↓' : ' ↑') : '') + '</button></th>').join('') + '</tr></thead><tbody>' + rows.map(r => '<tr' + (r[0].indexOf('Linde') === 0 ? ' class="on"' : '') + '>' + r.map((v, i) => '<td class="' + (i ? 'n' : '') + '">' + (i === 0 ? '<b>' + esc(v) + '</b>' : v == null ? '<span class="fill">[pull]</span>' : v.toFixed(1) + d.fmt[i]) + '</td>').join('') + '</tr>').join('') + '</tbody>';
    $$('th button', t).forEach(b => b.addEventListener('click', () => { const k = +b.dataset.k; if (k === key) dir = -dir; else { key = k; dir = 1; } draw(); }));
  }
  draw();
};
INIT.sources = sl => {
  const t = $('#srcTab', sl);
  t.innerHTML = '<thead><tr><th>#</th><th>Source</th><th>Date</th><th>Freshness</th><th>Supports</th></tr></thead><tbody>' + D.sources.map(r => '<tr>' + r.map((v, i) => '<td' + (i === 0 ? ' style="font-weight:700;color:#6B432B"' : '') + '>' + esc(v).replace(/\[([^\]]*)\]/g, '<span class="fill">[$1]</span>') + '</td>').join('') + '</tr>').join('') + '</tbody>';
};

/* boot once the DOM is ready */
function start(){
  teamList(document.getElementById('coverTeam'));
  teamList(document.getElementById('qaTeam'));
  A.boot();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

