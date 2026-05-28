# Project Context — Centrak 2.0 Redesign
## Bell Canada × Blache Yong & Co.

> **Read this first.** This document gives you the full business context, the people involved, the process being redesigned, and the UX work already completed. Everything in the Figma file lives inside this context.

---

## 1. Who is involved

### The client — Bell Canada

Bell Canada is a major Canadian telecommunications company. The team involved in this project works within the **Network Planning** division, responsible for managing and prioritizing network infrastructure investments across Canada.

| Person | Role | Relevance to this project |
|---|---|---|
| **Mohamed Fekih Ahmed** (Mo) | Senior Manager, Network Core and Access | Project lead, primary contact, SOW signatory. Defined the 6 feature priorities. |
| **Henry Hartono** | Technical PM | Primary user proxy. Represents the TPM persona. Day-to-day user of the intake process. |
| **Mae Albano** | Finance Operations | Tracks actuals vs. planned at PEATS level. Currently uses Excel over Centrak due to adoption friction. |
| **Aveena Anzar** | Product Owner, Centrak dev team | Manages the Centrak development team. Morocco timezone — meetings before 3 PM EST. |
| **Egbert Amazan** | NIC Finance / SME | Handles NIC funding release. Key stakeholder for the business case approval flow. |
| **Aymen Graoui** | Front-end developer | Builds Centrak 2.0. Morocco timezone. |
| **Hamza Bouslama** | Back-end developer | API and backend. Morocco timezone. |

### The supplier — Blache Yong & Co. (BYCo)

A Montreal-based design and consulting agency. SOW signed April 13, 2026.

| Person | Role |
|---|---|
| **Josianne Lavigne** | UX Practice Lead — leads the engagement |
| **Aïdeé Lopez** | UX Designer — co-facilitates workshops and produces deliverables |
| **Rémi Yong** | Partner — SOW signatory |

---

## 2. What is Centrak

Centrak is an **internal Bell Canada web application** used by the Network Planning team to manage network project investments. It is a desktop web app, not a customer-facing product.

### Current state — Centrak 1.0

Centrak 1.0 was built on ASP.NET Webforms — an outdated, vendor-locked technology. It has three modules:

- **NPBC (Network Project Business Case)** — the core module. Allows TPMs to document a business case for VP-level funding approval. Contains 6 sections: Project Information, Executive Summary, Financial Profile, Benefits, Security & Architecture, Funding Requests.
- **Forecasting** — financial tracking at portfolio level (PEATS, subPEATS, WBS). Intended to replace Excel tracking, but adoption has been low.
- **LRP (Long Range Planning)** — expected benefits forecast for strategic projects. Less mature.

**Centrak today only covers the NIC (Network Investment Council) process.** It does not cover the full intake lifecycle.

### Why it's being replaced — Centrak 2.0

Centrak 2.0 is being built in parallel by Bell's in-house team using **Django REST + React**. The goals are:

- Modern, maintainable technology (in-house, no vendor dependency)
- Foundation for AI capabilities (future roadmap)
- Platform to introduce new features without the architecture constraints of 1.0
- UI redesign aligned with the **MBM (Bell) design system**

**Timeline:** Centrak 2.0 development targeting September 2026. The initial release is a like-for-like feature transfer with refreshed UI. UX improvements go on the post-September roadmap.

---

## 3. The business problem

The Network Planning team manages a large portfolio of network projects. Today their process is fragmented across four tools:

| Tool | What it's used for | The problem |
|---|---|---|
| **Confluence** | Lean Business Case (LBC) documentation | Written manually from scratch. No template automation. |
| **Jira Service Desk** (ONWST) | Intake ticket submission | Created manually after Confluence. Duplicate data entry. Notification to reviewers is manual (email/DM). |
| **Excel (NPP spreadsheet)** | Initiative ranking (1-N priority) | Manual calculation using two sheets + IVA data. Fragile, not auditable. |
| **Centrak (NPBC module)** | NIC business case and VP approval | Third place the same data gets entered. No connection to Confluence or Jira. |

The result: a TPM submits the same project information **three times** across three different tools before reaching funding approval. Post-approval, execution tracking lives in Jira Portfolio (ONWP), and finance tracking lives in SAP/Excel — again disconnected.

**The vision:** Centrak 2.0 as the **single entry point**. A TPM enters project information once. Everything else — LBC in Confluence, Jira tickets, NIC business case — is generated and synchronized automatically.

---

## 4. The process being redesigned

### Key concepts

**Intake** — the process by which a TPM submits a new network initiative to get resources or funding approved. Triggered when a project lacks budget, resources, or both.

**NIC (Network Investment Council)** — the governance committee that formally approves funding for network projects. Requires a documented business case (NPBC), due diligence from NIC primes (Finance, Architecture, Security), and VP-level sign-off.

**PEATS** — Bell's internal budget classification system. A PEATS number is a "wallet" that identifies a funded budget envelope. Created by Finance after VP approval. One PEATS can fund multiple initiatives.

**IVA (Investment Value Assessment)** — a scoring model used to rank initiatives by strategic value. Currently calculated manually in Excel.

**RYG** — Red/Yellow/Green status field used to track project health. Currently updated manually in multiple places.

### The current workflow (TPM perspective)

```
1. TPM identifies a project need
        ↓
2. Creates Lean Business Case in Confluence (manual)
   + Ranks initiative in Excel NPP spreadsheet (manual)
        ↓
3. Creates intake ticket in Jira Service Desk (ONWST prefix)
   + Manually notifies Mae and Henry by email/DM
        ↓
4. Weekly review call (senior managers)
   → Bi-weekly directors call (Fridays)
   → VP call if needed
   Three outcomes: Analysis / POC / Implementation
        ↓
5. If NIC path: documents business case in Centrak (NPBC)
   → NIC primes review (Finance, Architecture, Security)
   → VP approval (email or meeting minutes)
        ↓
6. Finance creates PEATS number → funds released
        ↓
7. Execution: Jira Portfolio ticket (ONWP prefix)
   Mae tracks actuals vs. planned at PEATS level via SAP/Excel
```

### The future workflow (Centrak 2.0 vision)

```
1. TPM enters initiative once in Centrak
        ↓
2. Centrak auto-generates:
   - LBC in Confluence
   - Jira intake ticket (ONWST)
   - Security and Architecture Jira tickets
   - Jira Portfolio ticket (ONWP)
   - Notifications to stakeholders
   - IVA ranking calculation
        ↓
3. Review calls — same human process, but Centrak shows
   real-time status and RYG synced with Jira
        ↓
4. NIC business case already pre-filled in Centrak
   → No re-entry. NIC primes review directly in tool.
   → VP approval tracked in Centrak (Record of Decision)
        ↓
5. Finance tracks actuals vs. planned from PEATS/SAP
   directly in Centrak. YEE updates pushed to Jira monthly.
        ↓
6. Central reporting dashboard replaces fragmented
   Confluence/Jira dashboards.
```

---

## 5. The 6 confirmed feature priorities

These were defined by Mohamed Fekih Ahmed and confirmed by the full team in the scope alignment workshop. They are the ordered backlog for Centrak 2.0 UX work.

| # | Feature | What it replaces |
|---|---|---|
| **1** | **Intake Integration & Automation** | Manual LBC in Confluence, manual Jira tickets, duplicate data entry |
| **2** | **Network & Portfolio Prioritization Dashboard** | Excel NPP spreadsheet and manual IVA ranking |
| **3** | **Finance Automation & Jira Integration** | Excel-based finance tracking, manual YEE updates |
| **4** | **Central Reporting Dashboard** | Fragmented Confluence and Jira dashboards |
| **5** | **Objectives (OKRs) Dashboard** | Existing Confluence and Jira OKR dashboards |
| **6** | **Capacity Management Automation** | Excel-based capacity tracking per resource/manager/value stream |

---

## 6. The personas

Three personas were validated in the workshop on May 12, 2026:

### TPM / Project Prime (primary persona — Henry Hartono as proxy)
The person who owns a network initiative from idea to execution. Submits intake, builds the business case, drives approval, coordinates execution.

**Tools today:** Confluence, Excel NPP, Jira Service Desk, Centrak (NPBC), Jira Portfolio  
**Pain:** Enters the same information 3 times across 3 tools. No visibility into where their project stands between review cycles.

### Finance Operations (Mae Albano)
Tracks planned vs. actual spend at the PEATS level. Monthly profiling with senior managers, quarterly forecast updates.

**Tools today:** Excel (preferred), SAP, FDW (Finance Data Warehouse — 3-day delay from SAP)  
**Pain:** Centrak's Forecasting module hasn't been adopted — Excel still wins because it's faster and more familiar. One PEATS often covers multiple initiatives, making initiative-level tracking hard.

### NIC Finance / Project Approver (Egbert Amazan)
Manages the funding release side of the NIC process. Reviews business cases, coordinates VP approvals, oversees PEATS creation.

**Tools today:** Centrak (NPBC), email, SAP  
**Pain:** Business case preparation for VP decks involves pulling data from Excel, SAP, PEATS, and multiple meetings. Highly manual.

---

## 7. The UX engagement

### Scope (SOW — April 13, 2026)

- **Deliverable:** Screen designs and flows in Figma, aligned with Bell's MBM design system
- **Format:** Desktop web application
- **Structure:** Two equal banks of hours over 2 months. Checkpoint at midpoint.
- **Revision policy:** One formal round of review per deliverable. Bell has 5 business days to respond.
- **Out of scope:** User testing, developer QA, translation, font/icon licensing

### Design system

The target design system is Bell's **MBM design system** (referenced in the SOW as "Bell Enterprise Application design system"). Access to the Figma library is to be confirmed with the Bell team.

### Figma file

Working file: `https://www.figma.com/design/dCiNXdfGit1Zx3Ro3L8bt2/FMO---Exploration`

### Discovery sequence completed

1. ✅ Centrak demo (May 5, 2026)
2. ✅ Persona & workflow validation workshop (May 12, 2026)
3. ✅ Scope alignment workshop (May 13, 2026)
4. → Wireframe phase begins

### Governance

Bi-weekly progress meetings with Bell. Demo + evolving roadmap each session. No meetings for the sake of meetings — Bell's stated preference.

---

## 8. Key constraints and decisions

- **No user testing** in scope. Designs validated through stakeholder reviews and developer feedback.
- **No developer QA** in scope. BYCo provides async support (clarifications, asset export, design intent) but does not participate in daily dev ceremonies.
- **Completion not guaranteed.** Banks of hours may run out before all interfaces are covered. Scope is prioritized in the order of the 6 features.
- **Centrak 2.0 September timeline is hard.** Quick-win UX changes (color, headers, minor layout) can be implemented now. Major UX recommendations go on the post-September roadmap.
- **MBM design system access** needs to be confirmed. Work proceeds with Bell's Enterprise Application design system as fallback.
- **Morocco timezone** for Aveena, Aymen, and Hamza — all meetings must end before 3 PM EST.

---

## 9. What has been produced so far

| Artifact | Status | Notes |
|---|---|---|
| Project plan document (BYCo .docx) | ✅ Complete | Covers mandate, discovery gaps, methodology, roadmap, action items |
| Persona validation (workshop notes) | ✅ Complete | 3 personas confirmed: TPM, Finance Ops, NIC Finance |
| Current state user journey (TPM) | ✅ Complete | Sourced from workshop + demo. Includes confirmed facts and open questions. |
| Future state user journey (TPM) | ✅ Complete | Based on confirmed 6-feature priority list. In Figma file. |
| Wireframes | 🔄 In progress | Feature 1 (Intake Integration) is the starting point |

---

## 10. Glossary

| Term | Definition |
|---|---|
| **PEATS** | Bell's internal budget wallet system. A number assigned to a funded envelope. |
| **IVA** | Investment Value Assessment. Scoring model for ranking project priority. |
| **LBC** | Lean Business Case. Document created in Confluence to justify a project. |
| **NPBC** | Network Project Business Case. The Centrak module for NIC approval. |
| **NIC** | Network Investment Council. The VP-level governance committee for funding decisions. |
| **TPM** | Technical Project Manager. The person who owns and drives a network initiative. |
| **ONWST** | Jira Service Desk ticket prefix for intake submissions. |
| **ONWP** | Jira Portfolio ticket prefix for approved projects in execution. |
| **RYG** | Red/Yellow/Green. Project health status field. |
| **YEE** | Yearly Estimated Expense. Monthly financial forecast updated in Jira. |
| **FDW** | Finance Data Warehouse. SAP data with a 3-day sync delay. |
| **LRP** | Long Range Planning. Centrak module for 3-year strategic benefit forecasting. |
| **POI / POR** | Plan of Intent / Plan of Record. Portfolio planning statuses. |
| **MBM** | Bell's internal design system used for enterprise applications. |
| **BYCo** | Blache Yong & Co. The UX agency delivering this engagement. |
