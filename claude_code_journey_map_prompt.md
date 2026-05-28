# Claude Code Prompt — TPM User Journey Map in Figma (Centrak 2.0)

## Context

You are building a **user journey map** for the TPM (Technical Project Manager) persona in the Figma file at:

```
https://www.figma.com/design/dCiNXdfGit1Zx3Ro3L8bt2/FMO---Exploration
```

This is a UX deliverable for a Bell Canada project (Centrak 2.0 redesign). The journey map documents the TPM's future state workflow across 5 phases, with rows for Actions, Tools, Key Gain, and Still Open questions.

---

## What to build

A **full-width horizontal journey map frame** in Figma using the Plugin API (`figma.*`), structured as a proper design file — not a flat illustration. This means:

- Auto-layout frames throughout (not manual x/y positioning for repeating elements)
- Reusable components for cards, badges, and bullet items
- Consistent spacing tokens
- Clean layer naming

---

## File structure to create

```
Page 1
└── Journey / TPM Future State          ← outer auto-layout frame (HORIZONTAL)
    ├── [Text] Title
    ├── [Text] Subtitle
    ├── Journey Table                   ← auto-layout frame (VERTICAL)
        ├── Row / Legend
        ├── Row / Phase Headers
        ├── Row / Actions
        ├── Row / Tools
        ├── Row / Key Gain
        └── Row / Still Open
```

Each row is a **horizontal auto-layout frame**. Each row contains:
- A **Label Cell** (fixed width: 130px)
- 5 × **Phase Cell** (fixed width: 270px each)

---

## Design tokens (use these exactly)

```js
const tokens = {
  // Spacing
  padding: 12,
  gap: 8,
  cardRadius: 6,
  pillRadius: 4,

  // Column widths
  labelColW: 130,
  phaseColW: 270,

  // Row heights (min — let auto-layout grow)
  rowHeaderMinH: 68,
  rowActionsMinH: 60,   // per card
  rowToolsMinH: 72,
  rowGainMinH: 72,
  rowOpenMinH: 120,

  // Typography
  fontFamily: "Inter",
  sizeLabel: 10,
  sizeBody: 11,
  sizeTitle: 22,
  sizeSub: 12,
  sizePhaseNum: 10,
  sizePhaseTitle: 13,
  sizeTag: 9,
  sizePill: 10,

  // Colors
  green:        { r: 0.114, g: 0.620, b: 0.459 },  // confirmed dot
  greenLight:   { r: 0.878, g: 0.961, b: 0.929 },  // key gain bg
  greenText:    { r: 0.102, g: 0.420, b: 0.290 },  // key gain text
  purple:       { r: 0.325, g: 0.290, b: 0.718 },  // phase accent
  purpleLight:  { r: 0.933, g: 0.929, b: 0.996 },  // feature tag bg
  purpleText:   { r: 0.235, g: 0.204, b: 0.537 },  // feature tag text
  amber:        { r: 0.729, g: 0.459, b: 0.090 },  // still open dot/label
  amberLight:   { r: 0.996, g: 0.933, b: 0.855 },  // SAP pill bg
  redLight:     { r: 0.996, g: 0.941, b: 0.933 },  // deprecated tool bg
  redText:      { r: 0.620, g: 0.169, b: 0.114 },  // deprecated tool text
  white:        { r: 1, g: 1, b: 1 },
  gray50:       { r: 0.973, g: 0.973, b: 0.973 },  // label col bg, card bg
  gray100:      { r: 0.933, g: 0.933, b: 0.933 },  // source tag bg
  gray300:      { r: 0.753, g: 0.753, b: 0.753 },  // unchanged dot
  gray500:      { r: 0.502, g: 0.502, b: 0.502 },  // secondary text
  gray900:      { r: 0.098, g: 0.098, b: 0.098 },  // primary text
  openBg:       { r: 0.998, g: 0.972, b: 0.933 },  // still open row bg
};
```

---

## Components to define as Figma components (`figma.createComponent()`)

### 1. `ActionCard` component
- Auto-layout: VERTICAL, padding 8px, gap 4px, min-width = phaseColW - 24
- Contains:
  - `Header` row (HORIZONTAL, gap 6): dot circle (7×7) + body text (fontSize 11)
  - `Footer` row (HORIZONTAL): optional source tag pill (right-aligned)
- Variants:
  - `status`: `confirmed` (green dot) | `unchanged` (gray dot) | `open` (amber outline dot)

### 2. `ToolPill` component
- Auto-layout: HORIZONTAL, paddingH 7, paddingV 3, cornerRadius 4
- Contains: label text (fontSize 10, Medium)
- Variants:
  - `type`: `centrak` | `auto` | `deprecated` | `finance` | `neutral`
  - Each variant sets its own background and text color

### 3. `PhaseHeader` component
- Auto-layout: VERTICAL, padding 12, gap 4
- Contains: phase number (10px gray), phase title (13px bold), feature tag pill
- Bottom border: 3px accent in phase color
- Variants: `color`: `green` | `purple`

### 4. `LegendItem` component
- Auto-layout: HORIZONTAL, gap 6, padding 4
- Contains: dot (7×7) + label text (11px)
- Variants: `type`: `confirmed` | `unchanged` | `open`

---

## Data — 5 phases, all rows

### Phase Headers
```
Phase 1 | LBC Documentation        | Feature 1 — Intake & Automation       | green
Phase 2 | Intake Submission         | Feature 1 — Intake & Automation       | green
Phase 3 | Review & Prioritization   | Feature 2 — Prioritization Dashboard  | purple
Phase 4 | NIC Business Case         | Feature 1 + Feature 3                 | purple
Phase 5 | Execution & Tracking      | Feature 3 + 4 + 6                     | purple
```

### Actions row — per phase

**Phase 1**
- [confirmed] Enter initiative once in Centrak `SOW F1`
- [confirmed] LBC auto-generated in Confluence from Centrak entry `SOW F1`
- [confirmed] Executive Summary & Benefits Summary auto-filled in Confluence `SOW F1`
- [unchanged] Collaboration with architects (modality unchanged)

**Phase 2**
- [confirmed] Jira tickets created automatically (ONWST, Portfolio, Security, Architecture) `SOW F1`
- [confirmed] Automatic notifications to relevant stakeholders `SOW F1`
- [confirmed] No duplicate data entry between Centrak and Confluence / Jira `SOW F1`

**Phase 3**
- [confirmed] Ranking calculated automatically in Centrak using IVA data `SOW F2`
- [confirmed] Centralized prioritization view (IVA, labour capacity, risks) `SOW F2`
- [unchanged] Review calls (weekly, bi-weekly, VP) — human process unchanged
- [open] RYG status synced between Centrak and Jira — direction confirmed, UX not yet defined `SOW F1`

**Phase 4**
- [confirmed] Business case pre-filled in Centrak — no re-entry at NIC stage `SOW F1`
- [confirmed] Initial financial planning (CAPEX/OPEX) reported from Centrak `SOW F3`
- [confirmed] Record of Decision tracked at director and VP level `SOW F1`
- [open] Who fills sections 4–5 (benefits, security/arch) — TPM or NIC primes? Not specified

**Phase 5**
- [confirmed] Actual vs. planned spend tracked from PEATS/SAP in Centrak `SOW F3`
- [confirmed] Monthly YEE updates pushed from Centrak into Jira automatically `SOW F3`
- [confirmed] Centralized reporting dashboard (health, ranking, highlights) `SOW F4`
- [confirmed] Capacity view per resource / manager / value stream `SOW F6`

### Tools row — per phase
```
Phase 1: Centrak 2.0 [centrak] · → Confluence (auto) [auto] · Excel NPP ✕ [deprecated]
Phase 2: Centrak 2.0 [centrak] · → Jira (auto) [auto]
Phase 3: Centrak 2.0 [centrak] · IVA integrated [auto]
Phase 4: Centrak 2.0 [centrak] · PEATS / SAP [finance]
Phase 5: Centrak 2.0 [centrak] · SAP / PEATS [finance] · → Jira (auto) [auto] · Excel ✕ [deprecated]
```

### Key Gain row — per phase
```
Phase 1: Single entry → LBC auto-generated. End of manual documentation in Confluence.
Phase 2: No duplicate entry or manual notifications. Tickets auto-created on submission.
Phase 3: End of manual Excel ranking. Prioritization calculated and auditable in-tool.
Phase 4: End of 3rd re-entry. Business case already complete in Centrak at NIC stage.
Phase 5: Integrated actual vs. planned view. End of Excel tracking & chasing for updates.
```

### Still Open row — per phase
```
Phase 1: At what point does the TPM initiate in Centrak — before or after the architect conversation?
Phase 2: Automatic confirmation to TPM after submission — exact behavior to define
Phase 3: What does the TPM see if deprioritized or put on hold — notification? visible status?
Phase 4: TPM visibility into NIC prime due diligence statuses in real time — UX not yet defined
Phase 5: Feature 5 (OKRs) not mapped here — TPM impact to validate
         Feature 6 capacity: TPM manually enters forecasts — exact interaction to define
```

### Legend row (top)
```
● green filled   = Confirmed change (SOW / brief)
● gray filled    = Unchanged
○ amber outline  = Still open — UX to define
```

---

## Implementation rules

1. **Always `await figma.loadFontAsync`** for every font style before use. Load all at the top: Regular, Medium, Bold for Inter.

2. **No async wrapper function** — write top-level `await` directly. The plugin executor does not automatically await a called async function. Example:
   ```js
   // ✅ CORRECT
   await figma.loadFontAsync({ family: "Inter", style: "Regular" });
   const frame = figma.createFrame();

   // ❌ WRONG — never do this
   async function main() { ... }
   main(); // Promise never awaited
   ```

3. **Auto-layout for all containers** — set `layoutMode`, `primaryAxisSizingMode`, `counterAxisSizingMode`, `paddingLeft/Right/Top/Bottom`, `itemSpacing` on every frame that holds children.

4. **Fixed widths for columns** — label col = 130px, phase cols = 270px. Set `layoutSizingHorizontal = "FIXED"` and `resize(width, height)` explicitly.

5. **Components before instances** — define `ActionCard`, `ToolPill`, `PhaseHeader`, `LegendItem` as components first using `figma.createComponent()`, place them off-canvas (e.g. x: -2000), then use `component.createInstance()` everywhere else.

6. **Layer naming** — every node must have a descriptive `.name`:
   - `Journey / TPM Future State`
   - `Row / Actions`
   - `Cell / Phase 1 / Actions`
   - `Card / confirmed / Enter initiative once in Centrak`
   - `Pill / centrak / Centrak 2.0`
   - `Dot / confirmed`

7. **Viewport** — end with `figma.viewport.scrollAndZoomIntoView([mainFrame])` so the result is immediately visible.

8. **Return a value** — end the script with `return "Done: <description>"` so execution success is confirmed.

9. **Error handling** — wrap the main execution in try/catch and return the error message if something fails, so it's diagnosable.

---

## Output validation checklist

Before finishing, verify:
- [ ] Frame exists on Page 1 with correct name
- [ ] All 6 rows present (legend, headers, actions, tools, gain, open)
- [ ] All 5 phases populated with correct data
- [ ] Components defined and instances used (not raw frames for repeating elements)
- [ ] Auto-layout on all container frames
- [ ] No overlapping nodes (auto-layout should prevent this)
- [ ] Viewport scrolled to show the result
- [ ] Script returns a success string
