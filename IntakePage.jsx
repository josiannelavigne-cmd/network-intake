import { useState } from 'react';
import './IntakePage.css';

// ── Nav sections (left panel) ──────────────────────────────────
const NAV_SECTIONS = [
  {
    id: 'section-1',
    label: 'Section 1 - Intake analysis',
    items: [
      'Intake',
      'Project Prime',
      'Summary and hypothesis statement',
      'Benefits',
      'Scope',
      'Ranking and Competing Priorities',
      'Potential impact on solutions, programs and services',
      'Corporate approvals',
      'Lean Portfolio Management (LPM)',
      'Record of Decision',
    ],
  },
  {
    id: 'section-2',
    label: 'Section 2 - Analysis Phase',
    items: [],
  },
  {
    id: 'section-3',
    label: 'Section 3 - Development Strategy',
    items: [],
  },
];

const STATUS_OPTIONS = ['On Track', 'At Risk', 'Blocked', 'Complete'];

// ── Sub-components ─────────────────────────────────────────────

function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav__logo">FMO</div>
      <nav className="top-nav__links">
        <a href="#">Tools</a>
        <a href="#">Projects</a>
        <a href="#">Reports</a>
      </nav>
      <div className="top-nav__user">JL</div>
    </header>
  );
}

function TitleRow({ title = 'Section 1 - Intake analysis' }) {
  return (
    <div className="title-row">
      <h1 className="title-row__title">{title}</h1>
      <div className="title-row__actions">
        <button className="btn btn--ghost">Draft Approval Email</button>
        <button className="btn btn--ghost">Request intake review</button>
        <button className="btn btn--primary">Save</button>
      </div>
    </div>
  );
}

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="status-dropdown">
      <button
        className="status-dropdown__trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`status-badge status-badge--${value.toLowerCase().replace(' ', '-')}`}>
          {value}
        </span>
        <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="status-dropdown__menu">
          {STATUS_OPTIONS.map((opt) => (
            <li key={opt}>
              <button
                className={`status-dropdown__option ${opt === value ? 'is-active' : ''}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavSection({ section, activeItem, onItemClick }) {
  const [expanded, setExpanded] = useState(section.id === 'section-1');
  return (
    <div className="nav-section">
      <button
        className="nav-section__header"
        onClick={() => setExpanded((e) => !e)}
      >
        <span>{section.label}</span>
        <svg
          className={`chevron ${expanded ? 'chevron--up' : ''}`}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded && section.items.length > 0 && (
        <ul className="nav-section__items">
          {section.items.map((item) => (
            <li key={item}>
              <button
                className={`nav-section__item ${activeItem === item ? 'is-active' : ''}`}
                onClick={() => onItemClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LeftPanel({ status, onStatusChange, activeItem, onItemClick }) {
  return (
    <aside className="left-panel">
      <div className="left-panel__status">
        <StatusDropdown value={status} onChange={onStatusChange} />
      </div>
      <nav className="left-panel__nav">
        {NAV_SECTIONS.map((section) => (
          <NavSection
            key={section.id}
            section={section}
            activeItem={activeItem}
            onItemClick={onItemClick}
          />
        ))}
      </nav>
    </aside>
  );
}

function ContentArea({ children }) {
  return (
    <main className="content-area">
      {children ?? (
        <div className="content-area__placeholder">
          {/* Accordion sections will render here */}
        </div>
      )}
    </main>
  );
}

// ── Page shell ─────────────────────────────────────────────────

export default function IntakePage({ children }) {
  const [status, setStatus] = useState('On Track');
  const [activeItem, setActiveItem] = useState('Intake');

  return (
    <div className="intake-page">
      <TopNav />
      <TitleRow title={activeItem} />
      <div className="intake-page__body">
        <LeftPanel
          status={status}
          onStatusChange={setStatus}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
        <ContentArea>{children}</ContentArea>
      </div>
    </div>
  );
}
