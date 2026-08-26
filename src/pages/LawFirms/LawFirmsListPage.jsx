import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Filter, ChevronDown, Plus, X, Eye, Search } from 'lucide-react';
import {
  tokens,
  lawFirms,
  lawFirmsSummary,
  lawFirmsColumns,
  statusFilters,
  sortOptions,
  PAGE_SIZE,
  CHECKBOX_COL_WIDTH,
} from './LawFirmsListData';

const FIT = {
  label: { max: 11, min: 7 },
  note: { max: 12, min: 8.5 },
};

function useAutoFit(config) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const fit = () => {
      Object.entries(config).forEach(([group, { max, min }]) => {
        const els = root.querySelectorAll(`[data-fit="${group}"]`);
        if (!els.length) return;
        const apply = (s) => {
          els.forEach((el) => { el.style.fontSize = `${s}px`; });
        };
        const overflows = () => Array.from(els).some((el) => el.scrollWidth > el.clientWidth + 0.5);

        let size = max;
        apply(size);
        while (size > min && overflows()) {
          size -= 0.25;
          apply(size);
        }
      });
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    return () => ro.disconnect();
  }, [config]);

  return ref;
}

function SummaryCell({ label, value, note, accent }) {
  return (
    <div
      className="flex-1 min-w-[140px] flex flex-col justify-center px-4 py-3 sm:py-0 min-[1400px]:px-7 border-t sm:border-t-0 sm:border-l first:border-l-0"
      style={{ borderColor: tokens.line }}
    >
      <span
        data-fit="label"
        className="block w-full font-sans uppercase leading-[1.2] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.label.max, letterSpacing: '1px', color: tokens.muted }}
      >
        {label}
      </span>
      <span
        className="font-heading font-bold leading-none mt-2 sm:mt-[15px]"
        style={{ fontSize: 28, color: accent === 'orange' ? tokens.orange : tokens.ink }}
      >
        {value}
      </span>
      <span
        data-fit="note"
        className="block w-full font-sans leading-[1.4] mt-2 sm:mt-[18px] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.note.max, color: tokens.faint }}
      >
        {note}
      </span>
    </div>
  );
}

function StatusCell({ status }) {
  if (status === 'Active') {
    // Tinted purple, not filled — same chip as Suspended but reading as healthy.
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] w-[90px] text-center"
        style={{ background: 'rgba(94,27,137,0.10)', color: tokens.purple }}
      >
        Active
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] w-[90px] text-center"
        style={{ background: '#F1F5F9', color: '#64748B' }}
      >
        Pending
      </span>
    );
  }
  return (
    <span
      className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] text-white w-[90px] text-center"
      style={{ background: tokens.purple }}
    >
      Suspended
    </span>
  );
}

function CheckBox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="w-[15px] h-[15px] rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
      style={{
        border: `1px solid ${checked ? tokens.purple : '#B6BECB'}`,
        background: checked ? tokens.purple : '#FFFFFF',
      }}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.2L3.8 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function LawFirmsListPage() {
  const navigate = useNavigate();
  const fitRef = useAutoFit(FIT);
  const [rows, setRows] = useState(lawFirms);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [draft, setDraft] = useState({ name: '', owner: '', acronym: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = activeFilter === 'All' ? [...rows] : rows.filter((r) => r.status === activeFilter);

    const needle = searchQuery.trim().toLowerCase();
    if (needle) {
      list = list.filter((r) =>
        r.name.toLowerCase().includes(needle) ||
        r.owner.toLowerCase().includes(needle) ||
        String(r.id).includes(needle) ||
        String(r.acronym).toLowerCase().includes(needle)
      );
    }

    switch (sortBy) {
      case 'Name — ascending':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name — descending':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'Visits — highest':
        return list.sort((a, b) => b.visits - a.visits);
      case 'Revenue — highest':
        return list.sort((a, b) => b.transactions - a.transactions);
      default:
        return list;
    }
  }, [rows, activeFilter, sortBy, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageIds = pageRows.map((r) => r.id);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.includes(id));

  const toggleRow = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const togglePage = () =>
    setSelected((prev) =>
      allOnPageSelected ? prev.filter((id) => !pageIds.includes(id)) : [...new Set([...prev, ...pageIds])],
    );

  const createFirm = () => {
    if (!draft.name.trim() || !draft.owner.trim()) return;
    const nextId = Math.max(...rows.map((r) => r.id)) + 1;
    setRows((prev) => [
      {
        id: nextId,
        name: draft.name.trim(),
        acronym: draft.acronym.trim() || 'LFO',
        owner: draft.owner.trim(),
        visits: 0,
        signups: 0,
        revenue: '₱0.00',
        transactions: 0,
        status: 'Pending',
      },
      ...prev,
    ]);
    setDraft({ name: '', owner: '', acronym: '' });
    setShowNew(false);
  };

  const handleOpenFirmDetails = (firm) => {
    navigate(`/lawfirms/${firm.id}`);
  };

  return (
    <div className="-m-6 bg-white min-h-[calc(100vh-68px)] flex flex-col font-sans">
      {/* Header Band */}
      <section style={{ borderBottom: `1px solid ${tokens.line}` }}>
        <div className="px-4 sm:px-8 pt-[18px] flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-1 text-xs" style={{ color: tokens.orange }}>
            <Link to="/lawfirms" className="hover:underline block">
              &gt; Law Firms
            </Link>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowNew(true)}
              className="font-sans rounded-[6px] px-3.5 sm:px-[18px] h-[36px] inline-flex items-center gap-[7px] text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ fontSize: 13.5, background: tokens.orange }}
            >
              <Plus className="w-[15px] h-[15px]" strokeWidth={2.4} />
              New Law Firm
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-8 pt-[15px] pb-[20px] flex flex-col lg:flex-row items-stretch gap-6">
          <div className="w-full lg:w-[320px] shrink-0 pr-2">
            <p className="uppercase leading-none" style={{ fontSize: 12, letterSpacing: '2px', color: tokens.muted }}>
              Directory
            </p>
            <h1 className="font-heading font-bold leading-none mt-[12px]" style={{ fontSize: 34, color: tokens.purple }}>
              Law Firms
            </h1>
            <p className="mt-[12px] text-xs leading-[20px]" style={{ color: tokens.muted }}>
              Monitor partner firm websites, traffic, client sign-ups, and transaction volume.
            </p>
          </div>

          {/* Stats Bar (Wraps smoothly on mobile/tablet) */}
          <div ref={fitRef} className="flex-1 min-w-0 grid grid-cols-2 sm:flex border border-slate-200 sm:border-0 rounded-lg sm:rounded-none overflow-hidden">
            {lawFirmsSummary.map((cell) => (
              <SummaryCell key={cell.label} {...cell} />
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section
        className="px-4 sm:px-8 min-h-[64px] py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3"
        style={{ borderBottom: `1px solid ${tokens.line}` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-[9px] shrink-0">
            <Filter className="w-[15px] h-[15px]" style={{ color: tokens.muted }} strokeWidth={1.8} />
            <span className="uppercase" style={{ fontSize: 11, letterSpacing: '1.3px', color: tokens.muted }}>
              Filter
            </span>
          </div>

          <div className="flex rounded-[6px] overflow-hidden shrink-0 border border-slate-300">
            {statusFilters.map((f, i) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setActiveFilter(f);
                    setPage(1);
                  }}
                  className="h-[34px] px-3 sm:px-[18px] transition-colors cursor-pointer text-xs font-semibold"
                  style={{
                    background: active ? tokens.purple : '#FFFFFF',
                    color: active ? '#FFFFFF' : tokens.ink,
                    borderLeft: i === 0 ? 'none' : `1px solid #CBD5E1`,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-500">Sort</span>
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="appearance-none rounded-[6px] h-[34px] pl-[12px] pr-[32px] cursor-pointer bg-white text-xs border border-slate-300 focus:outline-none"
                style={{ width: 160, color: tokens.ink }}
              >
                {sortOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-purple"
            />
          </div>

          <span className="shrink-0 text-xs text-slate-500">
            Showing <strong style={{ color: tokens.ink }}>{pageRows.length}</strong> of {filtered.length}
          </span>
        </div>
      </section>

      {/* Law Firms Directory Table Container (Responsive Horizontal Scroll) */}
      <section className="px-4 sm:px-8 flex-1 overflow-x-auto">
        <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
          <colgroup>
            <col style={{ width: CHECKBOX_COL_WIDTH }} />
            {lawFirmsColumns.map((c) => (
              <col key={c.key} style={{ width: c.width }} />
            ))}
          </colgroup>

          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.rule}` }}>
              <th className="text-left align-middle h-[52px] pt-[4px]">
                <CheckBox checked={allOnPageSelected} onChange={togglePage} label="Select all" />
              </th>
              {lawFirmsColumns.map((c) => {
                const isCenter = ['visits', 'signups', 'revenue', 'transactions', 'status', 'action'].includes(c.key);
                return (
                  <th
                    key={c.key}
                    className={`align-middle h-[52px] font-sans uppercase text-[11px] tracking-[1.2px] whitespace-nowrap ${
                      isCenter ? 'text-center' : 'text-left'
                    }`}
                    style={{ color: tokens.faint, fontWeight: 400 }}
                  >
                    {c.label}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleOpenFirmDetails(row)}
                className="transition-colors hover:bg-slate-50/80 cursor-pointer"
                style={{
                  borderBottom: `1px solid ${tokens.line}`,
                  background: selected.includes(row.id) ? 'rgba(94,27,137,0.04)' : 'transparent',
                }}
              >
                <td className="align-middle h-[60px]" onClick={(e) => e.stopPropagation()}>
                  <CheckBox
                    checked={selected.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    label={`Select ${row.name}`}
                  />
                </td>
                <td className="align-middle text-xs text-slate-500">{row.id}</td>
                <td className="align-middle text-xs font-bold text-slate-900 truncate pr-4">{row.name}</td>
                <td className="align-middle text-xs text-slate-700 truncate pr-4">{row.owner}</td>
                <td className="align-middle text-xs text-slate-700 text-center">{row.visits.toLocaleString()}</td>
                <td className="align-middle text-xs text-center" style={{ color: tokens.orange }}>
                  {row.signups.toLocaleString()}
                </td>
                <td className="align-middle text-xs text-slate-700 text-center">{row.revenue}</td>
                <td className="align-middle text-xs text-slate-700 text-center">{row.transactions}</td>
                <td className="align-middle text-center whitespace-nowrap">
                  <StatusCell status={row.status} />
                </td>
                <td className="align-middle text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenFirmDetails(row);
                    }}
                    className="hover:opacity-75 transition-opacity cursor-pointer inline-flex items-center justify-center"
                    title="View Account"
                  >
                    <Eye style={{ color: tokens.orange }} size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pagination Bar */}
      <section
        className="px-4 sm:px-8 h-[68px] flex items-center justify-between"
        style={{ borderTop: `1px solid ${tokens.rule}`, marginTop: -1 }}
      >
        <span className="text-xs text-slate-500">Page {safePage} of {totalPages}</span>
        <div className="flex rounded-[6px] overflow-hidden border border-slate-300">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="h-[32px] px-[16px] bg-white text-xs hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="h-[32px] px-[16px] bg-white text-xs hover:bg-slate-50 disabled:opacity-40 border-l border-slate-300 cursor-pointer"
          >
            Next
          </button>
        </div>
      </section>

      {/* Create Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45">
          <div className="w-full max-w-[420px] bg-white rounded-[10px] overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base" style={{ color: tokens.purple }}>Register New Law Firm</h3>
              <button onClick={() => setShowNew(false)}><X className="w-4 h-4 text-slate-400 cursor-pointer" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <label className="block">
                <span className="text-slate-500 uppercase block mb-1">Law Firm Name</span>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="e.g. Bautista Law Firm Office"
                  className="w-full border rounded-[5px] h-9 px-3 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-slate-500 uppercase block mb-1">Acronym</span>
                <input
                  value={draft.acronym}
                  onChange={(e) => setDraft((d) => ({ ...d, acronym: e.target.value }))}
                  placeholder="e.g. BLO"
                  className="w-full border rounded-[5px] h-9 px-3 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-slate-500 uppercase block mb-1">Owner / Representative</span>
                <input
                  value={draft.owner}
                  onChange={(e) => setDraft((d) => ({ ...d, owner: e.target.value }))}
                  placeholder="e.g. Atty. Eddielyn Joy Bautista"
                  className="w-full border rounded-[5px] h-9 px-3 focus:outline-none"
                />
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button onClick={() => setShowNew(false)} className="px-4 py-1.5 rounded-[5px] border text-xs cursor-pointer">Cancel</button>
              <button onClick={createFirm} className="px-4 py-1.5 rounded-[5px] text-white text-xs cursor-pointer" style={{ background: tokens.orange }}>
                Save Firm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}