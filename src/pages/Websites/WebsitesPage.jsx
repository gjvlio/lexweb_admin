import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ChevronDown, X } from 'lucide-react'
import {
  websites,
  websiteSummary,
  websiteColumns,
  statusFilters,
  sortOptions,
  PAGE_SIZE,
  CHECKBOX_COL_WIDTH,
} from './WebsitesData'

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
      className="flex-1 min-w-0 flex flex-col justify-center px-4 min-[1400px]:px-7"
      style={{ borderLeft: `1px solid ${LINE}` }}
    >
      <span
        data-fit="label"
        className="block w-full font-sans uppercase leading-[1.2] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.label.max, letterSpacing: '1px', color: MUTED }}
      >
        {label}
      </span>
      <span
        className="font-sans font-bold leading-none mt-[15px]"
        style={{ fontSize: 32, color: accent === 'orange' ? ORANGE : INK }}
      >
        {value}
      </span>
      <span
        data-fit="note"
        className="block w-full font-sans leading-[1.4] mt-[18px] whitespace-nowrap overflow-hidden"
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
      className={`font-sans ${isPremium ? 'font-bold' : 'font-normal'}`}
      style={{ fontSize: 13.5, color: isPremium ? PURPLE : INK }}
    >
      {plan}
    </span>
  )
}

function StatusCell({ status }) {
  if (status === 'Active') {
    return (
      <span
        className="font-sans uppercase"
        style={{ fontSize: 11, letterSpacing: '1.2px', color: MUTED }}
      >
        Active
      </span>
    )
  }
  if (status === 'Pending') {
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] px-[11px] py-[6px]"
        style={{ fontSize: 11, letterSpacing: '1.2px', background: '#E2E8F0', color: '#475569' }}
      >
        Pending
      </span>
    )
  }
  return (
    <span
      className="inline-block font-sans uppercase rounded-[3px] px-[11px] py-[6px]"
      style={{ fontSize: 11, letterSpacing: '1.2px', background: PURPLE, color: '#FFFFFF' }}
    >
      Suspended
    </span>
  )
}

function PaymentCell({ payment }) {
  if (payment === 'Paid') {
    return (
      <span className="font-sans" style={{ fontSize: 13.5, color: INK }}>
        Paid
      </span>
    )
  }
  if (payment === 'Overdue') {
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] px-[11px] py-[6px]"
        style={{ fontSize: 11, letterSpacing: '1.2px', background: ORANGE, color: '#FFFFFF' }}
      >
        Overdue
      </span>
    )
  }
  return (
    <span
      className="inline-block font-sans uppercase rounded-[3px] px-[11px] py-[6px]"
      style={{ fontSize: 11, letterSpacing: '1.2px', background: '#FDE4E4', color: ORANGE }}
    >
      Unpaid
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
      className="w-[15px] h-[15px] rounded-[3px] flex items-center justify-center transition-colors"
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
        className="w-full max-w-[440px] bg-white rounded-[14px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <h3 className="font-sans font-bold" style={{ fontSize: 17, color: PURPLE }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
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

  const filtered = useMemo(() => {
    const list =
      activeFilter === 'All' ? [...rows] : rows.filter((r) => r.status === activeFilter)

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
  }, [rows, activeFilter, sortBy])

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

  const headStyle = {
    fontSize: 11,
    letterSpacing: '1.3px',
    color: FAINT,
    fontWeight: 400,
  }

  return (
    <div className="-m-6 bg-white min-h-[calc(100vh-68px)] overflow-x-hidden">
      {/* ============================================ directory header band */}
      <section style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="px-8 pt-[18px] flex items-start justify-between gap-6">
          <Link
            to="/websites"
            className="font-sans hover:underline cursor-pointer block"
            style={{ fontSize: 12, color: '#F4512C' }}
          >
            &gt; Websites
          </Link>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={exportCsv}
              className="font-sans rounded-[6px] px-[18px] h-[36px] transition-colors hover:bg-slate-50"
              style={{ fontSize: 13.5, color: INK, border: `1px solid #CBD5E1` }}
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="px-8 pt-[15px] pb-[26px] flex items-stretch">
          {/* left — title block */}
          <div className="w-[300px] min-[1400px]:w-[330px] shrink pr-6">
            <p
              className="font-sans uppercase leading-none"
              style={{ fontSize: 12, letterSpacing: '2px', color: MUTED }}
            >
              Directory
            </p>
            <h1
              className="font-heading font-bold leading-none mt-[14px]"
              style={{ fontSize: 38, color: PURPLE }}
            >
              Websites
            </h1>
            <p className="font-sans mt-[16px]" style={{ fontSize: 13.5, color: MUTED, lineHeight: '25px' }}>
              Every provisioned lawfirm site, its plan, template and billing state.
            </p>
          </div>

          {/* right — summary strip */}
          <div ref={fitRef} className="flex-1 min-w-0 flex">
            {websiteSummary.map((cell) => (
              <SummaryCell key={cell.label} {...cell} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= filter bar */}
      <section
        className="px-8 min-h-[70px] py-3 flex flex-wrap items-center gap-x-4 gap-y-3"
        style={{ borderBottom: `1px solid ${LINE}` }}
      >
        <div className="flex items-center gap-[9px] shrink-0">
          <Filter className="w-[15px] h-[15px]" style={{ color: MUTED }} strokeWidth={1.8} />
          <span
            className="font-sans uppercase"
            style={{ fontSize: 11, letterSpacing: '1.3px', color: MUTED }}
          >
            Filter
          </span>
        </div>

        <div className="flex rounded-[6px] overflow-hidden shrink-0" style={{ border: `1px solid #CBD5E1` }}>
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
                className="font-sans h-[34px] px-[19px] transition-colors"
                style={{
                  fontSize: 13.5,
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

        <span className="font-sans shrink-0 ml-[8px]" style={{ fontSize: 13.5, color: MUTED }}>
          Sort
        </span>

        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value)
              setPage(1)
            }}
            className="font-sans appearance-none rounded-[6px] h-[34px] pl-[15px] pr-[38px] cursor-pointer bg-white focus:outline-none"
            style={{ fontSize: 13.5, color: INK, border: `1px solid #CBD5E1`, width: 157 }}
          >
            {sortOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            className="w-4 h-4 absolute right-[11px] top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: MUTED }}
          />
        </div>

        <div className="flex-1" />

        <span className="font-sans shrink-0" style={{ fontSize: 12.5, color: MUTED }}>
          Showing <strong style={{ color: INK, fontWeight: 700 }}>{pageRows.length}</strong> of{' '}
          {filtered.length}
        </span>
      </section>

      {/* ============================================================ table */}
      <section className="px-8">
        <table className="w-full table-fixed border-collapse">
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
              {websiteColumns.map((c) => (
                <th
                  key={c.key}
                  className={`align-middle h-[52px] font-sans uppercase whitespace-nowrap ${
                    c.key === 'action' ? 'text-right' : 'text-left'
                  }`}
                  style={headStyle}
                >
                  {c.label}
                </th>
              ))}
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
                <td className="align-middle font-sans whitespace-nowrap" style={{ fontSize: 13.5, color: MUTED }}>
                  {row.id}
                </td>
                <td className="align-middle font-sans font-bold truncate pr-5" style={{ fontSize: 13.5, color: INK }}>
                  {row.domain}
                </td>
                <td className="align-middle font-sans truncate pr-5" style={{ fontSize: 13.5, color: INK }}>
                  {row.lawfirm}
                </td>
                <td className="align-middle whitespace-nowrap">
                  <PlanCell plan={row.plan} />
                </td>
                <td className="align-middle font-sans truncate pr-5" style={{ fontSize: 13.5, color: INK }}>
                  {row.template}
                </td>
                <td className="align-middle whitespace-nowrap">
                  <StatusCell status={row.status} />
                </td>
                <td className="align-middle whitespace-nowrap">
                  <PaymentCell payment={row.payment} />
                </td>
                <td className="align-middle text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setDetail(row)}
                    className="font-sans underline underline-offset-[3px] hover:opacity-70 transition-opacity"
                    style={{ fontSize: 13.5, color: PURPLE }}
                  >
                    Live view
                  </button>
                </td>
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr>
                <td colSpan={9} className="h-[160px] text-center font-sans" style={{ fontSize: 13.5, color: FAINT }}>
                  No websites match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ======================================================= pagination */}
      <section
        className="px-8 h-[68px] flex items-center justify-between"
        style={{ borderTop: `1px solid ${RULE}`, marginTop: -1 }}
      >
        <span className="font-sans" style={{ fontSize: 12.5, color: MUTED }}>
          Page {safePage} of {totalPages}
        </span>

        <div className="flex rounded-[6px] overflow-hidden" style={{ border: `1px solid #CBD5E1` }}>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="font-sans h-[32px] px-[17px] bg-white transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
            style={{ fontSize: 13, color: INK }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="font-sans h-[32px] px-[17px] bg-white transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
            style={{ fontSize: 13, color: INK, borderLeft: `1px solid #CBD5E1` }}
          >
            Next
          </button>
        </div>
      </section>

      {/* =========================================================== modals */}
      <Modal open={!!detail} title="Site details" onClose={() => setDetail(null)}>
        {detail && (
          <dl className="space-y-[14px]">
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
                <dt
                  className="font-sans uppercase"
                  style={{ fontSize: 10.5, letterSpacing: '1.2px', color: FAINT }}
                >
                  {k}
                </dt>
                <dd className="font-sans text-right" style={{ fontSize: 13.5, color: INK }}>
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
