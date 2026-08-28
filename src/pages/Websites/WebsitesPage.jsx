import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ChevronDown, X, Eye, Search } from 'lucide-react'
import {
  websites,
  websiteSummary,
  websiteColumns,
  statusFilters,
  sortOptions,
  PAGE_SIZE,
  CHECKBOX_COL_WIDTH,
} from './WebsitesData'
import StatusPill from '../../components/ui/StatusPill'

/* ---------------------------------------------------------------- tokens */

const PURPLE = '#5E1B89'
const ORANGE = '#F4512C'
const INK = '#1E293B'
const MUTED = '#64748B'
const FAINT = '#94A3B8'
const LINE = '#E6EAF0'
const RULE = '#94A3B8'


/* ---------------------------------------------------- auto-fitting labels */
/*
 * The stat labels must stay on one line at ANY window width. Rather than
 * hand-pick a font size and hope, this measures the real rendered text and
 * steps the size down until the longest one fits. Every label in a group
 * gets the same size, so the row stays visually even.
 */
const FIT = {
  label: { max: 11, min: 7 },
  note: { max: 12, min: 8.5 },
}

function useAutoFit(config) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const fit = () => {
      Object.entries(config).forEach(([group, { max, min }]) => {
        const els = root.querySelectorAll(`[data-fit="${group}"]`)
        if (!els.length) return
        const apply = (s) => els.forEach((el) => { el.style.fontSize = `${s}px` })
        const overflows = () =>
          Array.from(els).some((el) => el.scrollWidth > el.clientWidth + 0.5)

        let size = max
        apply(size)
        while (size > min && overflows()) {
          size -= 0.25
          apply(size)
        }
      })
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => ro.disconnect()
  }, [config])

  return ref
}

/* ------------------------------------------------------------ small bits */

function SummaryCell({ label, value, note, accent }) {
  return (
    <div
      className="flex-1 min-w-[140px] flex flex-col justify-center px-4 py-3 sm:py-0 min-[1400px]:px-7 border-t sm:border-t-0 sm:border-l first:border-l-0"
      style={{ borderColor: LINE }}
    >
      <span
        data-fit="label"
        className="block w-full font-sans uppercase leading-[1.2] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.label.max, letterSpacing: '1px', color: MUTED }}
      >
        {label}
      </span>
      <span
        className="font-heading font-bold leading-none mt-2 sm:mt-[15px]"
        style={{ fontSize: 28, color: accent === 'orange' ? ORANGE : INK }}
      >
        {value}
      </span>
      <span
        data-fit="note"
        className="block w-full font-sans leading-[1.4] mt-2 sm:mt-[18px] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.note.max, color: FAINT }}
      >
        {note}
      </span>
    </div>
  )
}

function PlanCell({ plan }) {
  const isPremium = plan === 'Premium'
  return (
    <span
      className={`font-sans text-xs ${isPremium ? 'font-bold' : 'font-normal'}`}
      style={{ color: isPremium ? PURPLE : INK }}
    >
      {plan}
    </span>
  )
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
        border: `1px solid ${checked ? PURPLE : '#B6BECB'}`,
        background: checked ? PURPLE : '#FFFFFF',
      }}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.2L3.8 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-white rounded-[10px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <h3 className="font-bold text-base" style={{ color: PURPLE }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" style={{ color: MUTED }} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div
            className="px-6 py-4 flex justify-end gap-2"
            style={{ borderTop: `1px solid ${LINE}`, background: '#FAFBFC' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ page */

export default function WebsitesPage() {
  const fitRef = useAutoFit(FIT)
  // Provisioning a new site lives on the Templates (Products) page, not here.
  const rows = websites
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    let list =
      activeFilter === 'All' ? [...rows] : rows.filter((r) => r.status === activeFilter)

    const needle = searchQuery.trim().toLowerCase()
    if (needle) {
      list = list.filter((r) =>
        r.domain.toLowerCase().includes(needle) ||
        r.lawfirm.toLowerCase().includes(needle) ||
        String(r.id).includes(needle) ||
        r.template.toLowerCase().includes(needle) ||
        r.plan.toLowerCase().includes(needle)
      )
    }

    switch (sortBy) {
      case 'Name — ascending':
        return list.sort((a, b) => a.domain.localeCompare(b.domain))
      case 'Name — descending':
        return list.sort((a, b) => b.domain.localeCompare(a.domain))
      case 'ID — ascending':
        return list.sort((a, b) => a.id - b.id)
      case 'ID — descending':
        return list.sort((a, b) => b.id - a.id)
      default:
        return list
    }
  }, [rows, activeFilter, sortBy, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const pageIds = pageRows.map((r) => r.id)
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.includes(id))

  const toggleRow = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const togglePage = () =>
    setSelected((prev) =>
      allOnPageSelected ? prev.filter((id) => !pageIds.includes(id)) : [...new Set([...prev, ...pageIds])],
    )

  const exportCsv = () => {
    const head = ['ID', 'Domain', 'Lawfirm', 'Plan', 'Template', 'Status', 'Payment']
    const body = filtered.map((r) => [r.id, r.domain, r.lawfirm, r.plan, r.template, r.status, r.payment])
    const csv = [head, ...body].map((line) => line.map((c) => `"${c}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `lexweb-websites-${activeFilter.toLowerCase()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="-m-6 bg-white min-h-[calc(100vh-68px)] flex flex-col font-sans">
      {/* ============================================ directory header band */}
      <section style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="px-6 pt-5 pb-2 flex items-start justify-between gap-4">
          <div className="flex items-center gap-1 text-xs" style={{ color: ORANGE }}>
            <Link to="/" className="hover:underline">
              &gt; Dashboard
            </Link>
            <span>&gt;</span>
            <span className="font-semibold">Websites</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={exportCsv}
              className="font-sans rounded-[6px] px-3.5 sm:px-[18px] h-[36px] transition-colors hover:bg-slate-50 cursor-pointer text-xs font-semibold"
              style={{ color: INK, border: `1px solid #CBD5E1` }}
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="px-6 pb-5 flex flex-col lg:flex-row items-stretch gap-6">
          {/* left — title block */}
          <div className="w-full lg:w-[320px] shrink-0 pr-2">
            <p className="uppercase leading-none" style={{ fontSize: 12, letterSpacing: '2px', color: MUTED }}>
              Directory
            </p>
            <h1 className="font-heading font-bold text-4xl tracking-tight mt-[12px]" style={{ color: PURPLE }}>
              Websites
            </h1>
            <p className="mt-[12px] text-xs leading-[20px]" style={{ color: MUTED }}>
              Every provisioned lawfirm site, its plan, template and billing state.
            </p>
          </div>

          {/* right — summary strip */}
          <div
            ref={fitRef}
            className="flex-1 min-w-0 grid grid-cols-2 sm:flex border border-slate-200 sm:border-0 rounded-lg sm:rounded-none overflow-hidden"
          >
            {websiteSummary.map((cell) => (
              <SummaryCell key={cell.label} {...cell} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= filter bar */}
      <section
        className="px-4 sm:px-8 min-h-[64px] py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3"
        style={{ borderBottom: `1px solid ${LINE}` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-[9px] shrink-0">
            <Filter className="w-[15px] h-[15px]" style={{ color: MUTED }} strokeWidth={1.8} />
            <span className="uppercase" style={{ fontSize: 11, letterSpacing: '1.3px', color: MUTED }}>
              Filter
            </span>
          </div>

          <div className="flex rounded-[6px] overflow-hidden shrink-0 border border-slate-300">
            {statusFilters.map((f, i) => {
              const active = activeFilter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setActiveFilter(f)
                    setPage(1)
                  }}
                  className="h-[34px] px-3 sm:px-[18px] transition-colors cursor-pointer text-xs font-semibold"
                  style={{
                    background: active ? PURPLE : '#FFFFFF',
                    color: active ? '#FFFFFF' : INK,
                    borderLeft: i === 0 ? 'none' : `1px solid #CBD5E1`,
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-500">Sort</span>
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setPage(1)
                }}
                className="appearance-none rounded-[6px] h-[34px] pl-[12px] pr-[32px] cursor-pointer bg-white text-xs border border-slate-300 focus:outline-none"
                style={{ width: 160, color: INK }}
              >
                {sortOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
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
                setSearchQuery(e.target.value)
                setPage(1)
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#5E1B89]"
            />
          </div>

          <span className="shrink-0 text-xs text-slate-500">
            Showing <strong style={{ color: INK }}>{pageRows.length}</strong> of {filtered.length}
          </span>
        </div>
      </section>

      {/* ============================================================ table */}
      <section className="px-4 sm:px-8 flex-1 overflow-x-auto">
        <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
          <colgroup>
            <col style={{ width: CHECKBOX_COL_WIDTH }} />
            {websiteColumns.map((c) => (
              <col key={c.key} style={{ width: c.width }} />
            ))}
          </colgroup>

          <thead>
            <tr style={{ borderBottom: `1px solid ${RULE}` }}>
              <th className="text-left align-middle h-[52px] pt-[4px]">
                <CheckBox checked={allOnPageSelected} onChange={togglePage} label="Select all rows on this page" />
              </th>
              {websiteColumns.map((c) => {
                const isCenter = ['plan', 'template', 'status', 'payment', 'action'].includes(c.key);
                return (
                  <th
                    key={c.key}
                    className={`align-middle h-[52px] font-sans uppercase text-[11px] tracking-[1.2px] whitespace-nowrap ${
                      isCenter ? 'text-center' : 'text-left'
                    }`}
                    style={{ color: FAINT, fontWeight: 400 }}
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
                className="transition-colors hover:bg-slate-50/70"
                style={{
                  borderBottom: `1px solid ${LINE}`,
                  background: selected.includes(row.id) ? 'rgba(94,27,137,0.04)' : 'transparent',
                }}
              >
                <td className="align-middle h-[60px]">
                  <CheckBox
                    checked={selected.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    label={`Select ${row.domain}`}
                  />
                </td>
                <td className="align-middle text-xs whitespace-nowrap" style={{ color: MUTED }}>
                  {row.id}
                </td>
                <td className="align-middle text-xs font-bold truncate pr-4" style={{ color: INK }}>
                  {row.domain}
                </td>
                <td className="align-middle text-xs truncate pr-4" style={{ color: INK }}>
                  {row.lawfirm}
                </td>
                <td className="align-middle text-center whitespace-nowrap">
                  <PlanCell plan={row.plan} />
                </td>
                <td className="align-middle text-xs text-center truncate" style={{ color: INK }}>
                  {row.template}
                </td>
                <td className="align-middle text-center whitespace-nowrap">
                  <StatusPill status={row.status} />
                </td>
                <td className="align-middle text-center whitespace-nowrap">
                  <StatusPill status={row.payment} />
                </td>
                <td className="align-middle text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setDetail(row)}
                    className="hover:opacity-70 transition-opacity cursor-pointer inline-flex items-center justify-center"
                    title="Live view"
                  >
                    <Eye style={{ color: ORANGE }} size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr>
                <td colSpan={9} className="h-[160px] text-center text-xs" style={{ color: FAINT }}>
                  No websites match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ======================================================= pagination */}
      <section
        className="px-4 sm:px-8 h-[68px] flex items-center justify-between"
        style={{ borderTop: `1px solid ${RULE}`, marginTop: -1 }}
      >
        <span className="text-xs text-slate-500">
          Page {safePage} of {totalPages}
        </span>

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

      {/* =========================================================== modals */}
      <Modal open={!!detail} title="Site details" onClose={() => setDetail(null)}>
        {detail && (
          <dl className="space-y-[14px] text-xs">
            {[
              ['Domain', detail.domain],
              ['Lawfirm', detail.lawfirm],
              ['Plan', detail.plan],
              ['Template', detail.template],
              ['Status', detail.status],
              ['Payment', detail.payment],
              ['Record ID', String(detail.id)],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <dt className="font-sans uppercase text-slate-500" style={{ letterSpacing: '1.2px' }}>
                  {k}
                </dt>
                <dd className="font-sans text-right" style={{ color: INK }}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>

    </div>
  )
}
