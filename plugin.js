// ─────────────────────────────────────────────────────────────────────────────
// TPM Future State — Journey Map
// BYCo × Bell Canada · Centrak 2.0 Redesign
// Paste into Figma → Plugins → Development → Run script
// ─────────────────────────────────────────────────────────────────────────────

try {

  // ── 1. FONTS ──────────────────────────────────────────────────────────────
  await figma.loadFontAsync({ family: "Segment Alt", style: "Regular" });
  await figma.loadFontAsync({ family: "Segment Alt", style: "Medium" });
  await figma.loadFontAsync({ family: "Segment Alt", style: "SemiBold" });
  await figma.loadFontAsync({ family: "Segment Alt", style: "Bold" });

  // ── 2. BYCO DESIGN TOKENS ─────────────────────────────────────────────────
  const T = {
    // Font
    font: "Segment Alt",

    // Spacing
    pad:     12,
    gap:      8,
    cardPad:  8,
    cardGap:  4,
    cardR:    6,
    pillR:    4,

    // Column widths
    labelW: 130,
    phaseW: 270,

    // Typography scale (BYCO)
    sizeTitle:     24,   // h7 — Bold
    sizeSub:       12,   // caption — Regular
    sizeBody:      12,   // body-xs — Regular
    sizeLabel:     10,   // label — SemiBold uppercase
    sizePhaseNum:  10,   // phase tag — Medium uppercase
    sizePhaseTitle: 14,  // body-sm — SemiBold
    sizePill:      10,   // pill — Medium
    sizeTag:        9,   // source badge — Medium

    // BYCO primitive colors → Figma RGB {r,g,b}
    white:     { r: 1,     g: 1,     b: 1     },
    black:     { r: 0,     g: 0,     b: 0     },
    inkBg:     { r: 0.067, g: 0.067, b: 0.067 }, // #111111
    inkLight:  { r: 0.933, g: 0.953, b: 0.961 }, // #EEF3F5
    aluminium: { r: 0.890, g: 0.894, b: 0.918 }, // #E3E4EA
    uniGrey:   { r: 0.518, g: 0.541, b: 0.655 }, // #848AA7
    superBlue: { r: 0.176, g: 0.224, b: 0.969 }, // #2D39F7
    brand50:   { r: 0.929, g: 0.929, b: 0.996 }, // #EDEDFE
    brand700:  { r: 0.039, g: 0.098, b: 0.878 }, // #0A19E0
    mint:      { r: 0,     g: 0.765, b: 0.471 }, // #00C378 — confirmed
    sun:       { r: 1,     g: 0.698, b: 0     }, // #FFB200 — still open
    sunMuted:  { r: 0.753, g: 0.533, b: 0     }, // #C08800 — open label text
  };


  // ── 3. HELPERS ────────────────────────────────────────────────────────────

  // Solid fill array
  const fill  = (c, a = 1)  => [{ type: 'SOLID', color: c, opacity: a }];
  const noFill = ()          => [];

  // Text node
  function txt(str, size, style, color, opacity = 1, ls = 0, lh = null) {
    const t = figma.createText();
    t.fontName  = { family: T.font, style };
    t.fontSize  = size;
    t.characters = String(str);
    t.fills     = fill(color, opacity);
    if (ls !== 0) t.letterSpacing = { unit: 'PERCENT', value: ls };
    if (lh)       t.lineHeight    = { unit: 'PERCENT', value: lh * 100 };
    return t;
  }

  // Auto-layout frame
  function al(f, mode, pT, pR, pB, pL, gap, counterAlign = 'MIN') {
    f.layoutMode               = mode;
    f.paddingTop               = pT;
    f.paddingRight             = pR;
    f.paddingBottom            = pB;
    f.paddingLeft              = pL;
    f.itemSpacing              = gap;
    f.primaryAxisSizingMode    = 'AUTO';
    f.counterAxisSizingMode    = 'AUTO';
    f.counterAxisAlignItems    = counterAlign;
    f.clipsContent             = false;
  }

  // Status dot (filled circle or outlined circle)
  function dot(color, filled, size = 7) {
    const e = figma.createEllipse();
    e.resize(size, size);
    if (filled) {
      e.fills   = fill(color);
      e.strokes = [];
    } else {
      e.fills       = noFill();
      e.strokes     = fill(color);
      e.strokeWeight = 1.5;
      e.strokeAlign  = 'CENTER';
    }
    return e;
  }

  // 1px aluminium divider between rows
  function rowDivider() {
    const d = figma.createFrame();
    d.name   = "_Divider";
    d.fills  = fill(T.aluminium, 0.6);
    d.resize(T.labelW + T.phaseW * 5, 1);
    d.layoutSizingHorizontal = 'FILL';
    d.layoutSizingVertical   = 'FIXED';
    return d;
  }


  // ── 4. DATA ───────────────────────────────────────────────────────────────

  const phases = [
    { num: "Phase 1", title: "LBC Documentation",      feature: "F1 — Intake & Automation",      accent: T.mint      },
    { num: "Phase 2", title: "Intake Submission",       feature: "F1 — Intake & Automation",      accent: T.mint      },
    { num: "Phase 3", title: "Review & Prioritization", feature: "F2 — Prioritization Dashboard", accent: T.superBlue },
    { num: "Phase 4", title: "NIC Business Case",       feature: "F1 + F3",                       accent: T.superBlue },
    { num: "Phase 5", title: "Execution & Tracking",    feature: "F3 + F4 + F6",                  accent: T.superBlue },
  ];

  const actionsData = [
    // Phase 1
    [
      { s: "confirmed", t: "Enter initiative once in Centrak",                                                       tag: "SOW F1" },
      { s: "confirmed", t: "LBC auto-generated in Confluence from Centrak entry",                                    tag: "SOW F1" },
      { s: "confirmed", t: "Executive Summary & Benefits auto-filled in Confluence",                                 tag: "SOW F1" },
      { s: "unchanged", t: "Collaboration with architects (modality unchanged)",                                     tag: null     },
    ],
    // Phase 2
    [
      { s: "confirmed", t: "Jira tickets created automatically (ONWST, Portfolio, Security, Architecture)",          tag: "SOW F1" },
      { s: "confirmed", t: "Automatic notifications to relevant stakeholders",                                       tag: "SOW F1" },
      { s: "confirmed", t: "No duplicate data entry between Centrak and Confluence / Jira",                          tag: "SOW F1" },
    ],
    // Phase 3
    [
      { s: "confirmed", t: "Ranking calculated automatically in Centrak using IVA data",                             tag: "SOW F2" },
      { s: "confirmed", t: "Centralized prioritization view (IVA, labour capacity, risks)",                          tag: "SOW F2" },
      { s: "unchanged", t: "Review calls (weekly, bi-weekly, VP) — human process unchanged",                         tag: null     },
      { s: "open",      t: "RYG status synced between Centrak and Jira — direction confirmed, UX not yet defined",   tag: "SOW F1" },
    ],
    // Phase 4
    [
      { s: "confirmed", t: "Business case pre-filled in Centrak — no re-entry at NIC stage",                         tag: "SOW F1" },
      { s: "confirmed", t: "Initial financial planning (CAPEX/OPEX) reported from Centrak",                          tag: "SOW F3" },
      { s: "confirmed", t: "Record of Decision tracked at director and VP level",                                    tag: "SOW F1" },
      { s: "open",      t: "Who fills sections 4–5 (benefits, security/arch) — TPM or NIC primes? Not specified",    tag: null     },
    ],
    // Phase 5
    [
      { s: "confirmed", t: "Actual vs. planned spend tracked from PEATS/SAP in Centrak",                             tag: "SOW F3" },
      { s: "confirmed", t: "Monthly YEE updates pushed from Centrak into Jira automatically",                        tag: "SOW F3" },
      { s: "confirmed", t: "Centralized reporting dashboard (health, ranking, highlights)",                          tag: "SOW F4" },
      { s: "confirmed", t: "Capacity view per resource / manager / value stream",                                    tag: "SOW F6" },
    ],
  ];

  const toolsData = [
    [{ l: "Centrak 2.0", type: "centrak" }, { l: "Confluence (auto)", type: "auto" }, { l: "Excel NPP ✕", type: "deprecated" }],
    [{ l: "Centrak 2.0", type: "centrak" }, { l: "Jira (auto)",       type: "auto" }],
    [{ l: "Centrak 2.0", type: "centrak" }, { l: "IVA integrated",    type: "auto" }],
    [{ l: "Centrak 2.0", type: "centrak" }, { l: "PEATS / SAP",       type: "finance" }],
    [{ l: "Centrak 2.0", type: "centrak" }, { l: "SAP / PEATS",       type: "finance" }, { l: "Jira (auto)", type: "auto" }, { l: "Excel ✕", type: "deprecated" }],
  ];

  const gainsData = [
    "Single entry → LBC auto-generated. End of manual documentation in Confluence.",
    "No duplicate entry or manual notifications. Tickets auto-created on submission.",
    "End of manual Excel ranking. Prioritization calculated and auditable in-tool.",
    "End of 3rd re-entry. Business case already complete in Centrak at NIC stage.",
    "Integrated actual vs. planned view. End of Excel tracking & chasing for updates.",
  ];

  const openData = [
    "At what point does the TPM initiate in Centrak — before or after the architect conversation?",
    "Automatic confirmation to TPM after submission — exact behavior to define",
    "What does the TPM see if deprioritized or put on hold — notification? visible status?",
    "TPM visibility into NIC prime due diligence statuses in real time — UX not yet defined",
    "Feature 5 (OKRs) not mapped here — TPM impact to validate\nFeature 6 capacity: TPM manually enters forecasts — exact interaction to define",
  ];


  // ── 5. ELEMENT BUILDERS ───────────────────────────────────────────────────

  // Action card (confirmed / unchanged / open)
  function makeActionCard(status, text, tag) {
    const card = figma.createFrame();
    card.name        = `Card / ${status} / ${text.slice(0, 38)}`;
    card.cornerRadius = T.cardR;
    card.fills       = fill(T.inkLight);
    al(card, 'VERTICAL', T.cardPad, 10, T.cardPad, 10, T.cardGap);
    card.layoutSizingHorizontal = 'FILL';
    card.primaryAxisSizingMode  = 'AUTO';

    // Status dot
    const dotColor  = status === 'confirmed' ? T.mint : status === 'unchanged' ? T.uniGrey : T.sun;
    const dotFilled = status !== 'open';
    const dotNode   = dot(dotColor, dotFilled);
    dotNode.name    = `Dot / ${status}`;

    // Body text
    const textW = T.phaseW - T.pad * 2 - 10 * 2 - 7 - T.cardGap;
    const bodyT  = txt(text, T.sizeBody, 'Regular', T.black, 1, 0, 1.3);
    bodyT.name   = "Text";
    bodyT.textAutoResize = 'HEIGHT';
    bodyT.resize(textW, 10);

    // Header row
    const headerRow = figma.createFrame();
    headerRow.name  = "Header";
    al(headerRow, 'HORIZONTAL', 0, 0, 0, 0, T.cardGap + 2, 'MIN');
    headerRow.fills = noFill();
    headerRow.layoutSizingHorizontal = 'FILL';
    headerRow.appendChild(dotNode);
    headerRow.appendChild(bodyT);
    card.appendChild(headerRow);

    // Source tag (optional)
    if (tag) {
      const tagPill = figma.createFrame();
      tagPill.name        = "Tag";
      tagPill.cornerRadius = 3;
      tagPill.fills       = fill(T.aluminium);
      al(tagPill, 'HORIZONTAL', 2, 5, 2, 5, 0);
      tagPill.appendChild(txt(tag, T.sizeTag, 'Medium', T.uniGrey));

      const footer = figma.createFrame();
      footer.name   = "Footer";
      footer.fills  = noFill();
      al(footer, 'HORIZONTAL', 0, 0, 0, 0, 0);
      footer.primaryAxisAlignItems     = 'MAX'; // right-align tag
      footer.layoutSizingHorizontal    = 'FILL';
      footer.appendChild(tagPill);
      card.appendChild(footer);
    }

    return card;
  }

  // Tool pill
  function makeToolPill(label, type) {
    const styles = {
      centrak:    { bg: T.superBlue, bgA: 1,    c: T.white,    cA: 1    },
      auto:       { bg: T.brand50,   bgA: 1,    c: T.brand700, cA: 1    },
      deprecated: { bg: T.aluminium, bgA: 1,    c: T.uniGrey,  cA: 1    },
      finance:    { bg: T.sun,       bgA: 0.14, c: T.sunMuted, cA: 1    },
      neutral:    { bg: T.aluminium, bgA: 1,    c: T.black,    cA: 0.65 },
    };
    const s = styles[type] || styles.neutral;

    const pill = figma.createFrame();
    pill.name        = `Pill / ${type} / ${label}`;
    pill.cornerRadius = T.pillR;
    pill.fills       = fill(s.bg, s.bgA);
    al(pill, 'HORIZONTAL', 3, 7, 3, 7, 0);
    pill.appendChild(txt(label, T.sizePill, 'Medium', s.c, s.cA));
    return pill;
  }

  // Legend item (dot + label)
  function makeLegendItem(status, label) {
    const c = status === 'confirmed' ? T.mint : status === 'unchanged' ? T.uniGrey : T.sun;
    const item = figma.createFrame();
    item.name  = `Legend / ${status}`;
    item.fills = noFill();
    al(item, 'HORIZONTAL', 0, 0, 0, 0, 7, 'CENTER');
    item.appendChild(dot(c, status !== 'open'));
    item.appendChild(txt(label, T.sizeBody, 'Regular', T.black, 0.55));
    return item;
  }

  // Label column cell
  function makeLabelCell(text, bgColor) {
    const cell = figma.createFrame();
    cell.name  = `Label / ${text}`;
    cell.fills = fill(bgColor);
    al(cell, 'VERTICAL', 0, T.pad, 0, T.pad, 0, 'CENTER');
    cell.primaryAxisAlignItems   = 'CENTER';
    cell.layoutSizingHorizontal  = 'FIXED';
    cell.layoutSizingVertical    = 'FILL';
    cell.resize(T.labelW, 40);

    const t = txt(text, T.sizeLabel, 'SemiBold', T.uniGrey, 0.85, 6);
    t.textCase = 'UPPER';
    cell.appendChild(t);
    return cell;
  }


  // ── 6. ROW BUILDERS ───────────────────────────────────────────────────────

  // Phase Headers row
  function buildHeadersRow() {
    const row = figma.createFrame();
    row.name  = "Row / Phase Headers";
    row.fills = fill(T.white);
    al(row, 'HORIZONTAL', 0, 0, 0, 0, 0, 'STRETCH');

    // Empty label corner
    const corner = figma.createFrame();
    corner.name  = "Label / —";
    corner.fills = fill(T.inkLight);
    al(corner, 'HORIZONTAL', 0, 0, 0, 0, 0);
    corner.layoutSizingHorizontal = 'FIXED';
    corner.layoutSizingVertical   = 'FILL';
    corner.resize(T.labelW, 40);
    row.appendChild(corner);

    for (let i = 0; i < 5; i++) {
      const p    = phases[i];
      const cell = figma.createFrame();
      cell.name  = `Cell / Phase ${i + 1} / Header`;
      cell.fills = fill(T.white);
      al(cell, 'VERTICAL', T.pad, T.pad, 0, T.pad, 4);
      cell.layoutSizingHorizontal = 'FIXED';
      cell.primaryAxisSizingMode  = 'AUTO';
      cell.resize(T.phaseW, 10);

      // Phase number
      const numT  = txt(p.num.toUpperCase(), T.sizePhaseNum, 'Medium', T.uniGrey, 0.7, 4);
      numT.name   = "Phase Num";
      cell.appendChild(numT);

      // Phase title
      const titleT = txt(p.title, T.sizePhaseTitle, 'SemiBold', T.black, 1, -1, 1.1);
      titleT.name  = "Phase Title";
      titleT.textAutoResize = 'HEIGHT';
      titleT.resize(T.phaseW - T.pad * 2, 10);
      cell.appendChild(titleT);

      // Feature tag pill
      const featureTag = figma.createFrame();
      featureTag.name        = "Feature Tag";
      featureTag.cornerRadius = 3;
      featureTag.fills       = fill(T.brand50);
      al(featureTag, 'HORIZONTAL', 2, 6, 2, 6, 0);
      featureTag.appendChild(txt(p.feature, T.sizeTag, 'Medium', T.brand700));
      cell.appendChild(featureTag);

      // Spacer
      const spacer = figma.createFrame();
      spacer.name  = "_spacer";
      spacer.fills = noFill();
      spacer.layoutSizingHorizontal = 'FILL';
      spacer.layoutSizingVertical   = 'FIXED';
      spacer.resize(10, 8);
      cell.appendChild(spacer);

      // Phase accent bar (3px bottom)
      const bar = figma.createFrame();
      bar.name  = "Accent Bar";
      bar.fills = fill(p.accent);
      bar.layoutSizingHorizontal = 'FILL';
      bar.layoutSizingVertical   = 'FIXED';
      bar.resize(T.phaseW, 3);
      cell.appendChild(bar);

      row.appendChild(cell);
    }
    return row;
  }

  // Actions row
  function buildActionsRow() {
    const row = figma.createFrame();
    row.name  = "Row / Actions";
    row.fills = fill(T.white);
    al(row, 'HORIZONTAL', 0, 0, 0, 0, 0, 'STRETCH');
    row.appendChild(makeLabelCell("Actions", T.inkLight));

    for (let i = 0; i < 5; i++) {
      const cell = figma.createFrame();
      cell.name  = `Cell / Phase ${i + 1} / Actions`;
      cell.fills = fill(T.white);
      al(cell, 'VERTICAL', T.pad, T.pad, T.pad, T.pad, 6);
      cell.layoutSizingHorizontal = 'FIXED';
      cell.primaryAxisSizingMode  = 'AUTO';
      cell.resize(T.phaseW, 10);

      for (const a of actionsData[i]) {
        cell.appendChild(makeActionCard(a.s, a.t, a.tag));
      }
      row.appendChild(cell);
    }
    return row;
  }

  // Tools row
  function buildToolsRow() {
    const row = figma.createFrame();
    row.name  = "Row / Tools";
    row.fills = fill(T.inkLight);
    al(row, 'HORIZONTAL', 0, 0, 0, 0, 0, 'STRETCH');
    row.appendChild(makeLabelCell("Tools", T.aluminium));

    for (let i = 0; i < 5; i++) {
      const cell = figma.createFrame();
      cell.name  = `Cell / Phase ${i + 1} / Tools`;
      cell.fills = fill(T.inkLight);
      al(cell, 'HORIZONTAL', T.pad, T.pad, T.pad, T.pad, 6, 'CENTER');
      cell.layoutSizingHorizontal = 'FIXED';
      cell.primaryAxisSizingMode  = 'AUTO';
      cell.resize(T.phaseW, 10);

      // Wrap pills across lines if needed
      try { cell.layoutWrap = 'WRAP'; cell.counterAxisSpacing = 5; } catch (_) {}

      for (const tool of toolsData[i]) {
        cell.appendChild(makeToolPill(tool.l, tool.type));
      }
      row.appendChild(cell);
    }
    return row;
  }

  // Key Gain row
  function buildKeyGainRow() {
    const row = figma.createFrame();
    row.name  = "Row / Key Gain";
    row.fills = fill(T.white);
    al(row, 'HORIZONTAL', 0, 0, 0, 0, 0, 'STRETCH');
    row.appendChild(makeLabelCell("Key Gain", T.inkLight));

    for (let i = 0; i < 5; i++) {
      const cell = figma.createFrame();
      cell.name  = `Cell / Phase ${i + 1} / Key Gain`;
      cell.fills = fill(T.mint, 0.07);
      al(cell, 'VERTICAL', T.pad, T.pad, T.pad, T.pad, 0);
      cell.layoutSizingHorizontal = 'FIXED';
      cell.primaryAxisSizingMode  = 'AUTO';
      cell.resize(T.phaseW, 10);

      const gainT = txt(gainsData[i], T.sizeBody, 'Regular', T.black, 0.8, 0, 1.35);
      gainT.textAutoResize = 'HEIGHT';
      gainT.resize(T.phaseW - T.pad * 2, 10);
      cell.appendChild(gainT);

      row.appendChild(cell);
    }
    return row;
  }

  // Still Open row
  function buildStillOpenRow() {
    const row = figma.createFrame();
    row.name  = "Row / Still Open";
    row.fills = fill(T.sun, 0.06);
    al(row, 'HORIZONTAL', 0, 0, 0, 0, 0, 'STRETCH');
    row.appendChild(makeLabelCell("Still Open", T.sun));

    for (let i = 0; i < 5; i++) {
      const cell = figma.createFrame();
      cell.name  = `Cell / Phase ${i + 1} / Still Open`;
      cell.fills = fill(T.sun, 0.06);
      al(cell, 'VERTICAL', T.pad, T.pad, T.pad, T.pad, 5);
      cell.layoutSizingHorizontal = 'FIXED';
      cell.primaryAxisSizingMode  = 'AUTO';
      cell.resize(T.phaseW, 10);

      // "Open" badge: outline dot + sunMuted label
      const badge = figma.createFrame();
      badge.name  = "Open Badge";
      badge.fills = noFill();
      al(badge, 'HORIZONTAL', 0, 0, 0, 0, 5, 'CENTER');
      badge.appendChild(dot(T.sun, false, 6));
      badge.appendChild(txt("Open", T.sizeTag, 'SemiBold', T.sunMuted, 1, 2));
      cell.appendChild(badge);

      // Question text
      const openT = txt(openData[i], T.sizeBody, 'Regular', T.black, 0.7, 0, 1.35);
      openT.textAutoResize = 'HEIGHT';
      openT.resize(T.phaseW - T.pad * 2, 10);
      cell.appendChild(openT);

      row.appendChild(cell);
    }
    return row;
  }


  // ── 7. ASSEMBLE ───────────────────────────────────────────────────────────

  const main = figma.createFrame();
  main.name  = "Journey / TPM Future State";
  main.fills = fill(T.white);
  main.x     = 200;
  main.y     = 200;
  al(main, 'VERTICAL', 40, 48, 56, 48, 28);

  // Title block
  const titleBlock = figma.createFrame();
  titleBlock.name  = "Title Block";
  titleBlock.fills = noFill();
  al(titleBlock, 'VERTICAL', 0, 0, 0, 0, 6);

  const titleT = txt(
    "TPM Future State — Centrak 2.0",
    T.sizeTitle, 'Bold', T.black, 1, -2
  );
  titleT.name = "Title";

  const subT = txt(
    "Persona: Technical Project Manager  ·  Proxy: Henry Hartono  ·  BYCo \u00D7 Bell Canada  ·  May 2026",
    T.sizeSub, 'Regular', T.black, 0.4
  );
  subT.name = "Subtitle";

  titleBlock.appendChild(titleT);
  titleBlock.appendChild(subT);
  main.appendChild(titleBlock);

  // Legend
  const legend = figma.createFrame();
  legend.name  = "Row / Legend";
  legend.fills = noFill();
  al(legend, 'HORIZONTAL', 0, 0, 0, 0, 20, 'CENTER');
  legend.appendChild(makeLegendItem('confirmed', 'Confirmed change (SOW / brief)'));
  legend.appendChild(makeLegendItem('unchanged', 'Unchanged'));
  legend.appendChild(makeLegendItem('open',      'Still open — UX to define'));
  main.appendChild(legend);

  // Journey table
  const table = figma.createFrame();
  table.name  = "Journey Table";
  table.fills = noFill();
  al(table, 'VERTICAL', 0, 0, 0, 0, 0);
  table.clipsContent = false;

  // Outer table border
  table.strokes     = [{ type: 'SOLID', color: T.aluminium }];
  table.strokeWeight = 1;
  table.strokeAlign  = 'OUTSIDE';

  table.appendChild(buildHeadersRow());
  table.appendChild(rowDivider());
  table.appendChild(buildActionsRow());
  table.appendChild(rowDivider());
  table.appendChild(buildToolsRow());
  table.appendChild(rowDivider());
  table.appendChild(buildKeyGainRow());
  table.appendChild(rowDivider());
  table.appendChild(buildStillOpenRow());

  main.appendChild(table);

  // Place on current page and scroll into view
  figma.currentPage.appendChild(main);
  figma.viewport.scrollAndZoomIntoView([main]);

  return "Done: TPM Future State journey map created — Journey / TPM Future State on current page.";

} catch (e) {
  return "Error: " + e.message + "\n" + (e.stack || "");
}
