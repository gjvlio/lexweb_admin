import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import usePagination from '../../hooks/usePagination'
import TransactionsTab from './components/TransactionsTab'
import TransactionRow from './components/TransactionRow'
import {
  oneTimeColumns,
  oneTimeTransactions,
  subscriptionColumns,
  subscriptionTransactions,
} from './data/transactionsData'

// NOTE: pulled from LawFirmsListData.js so both pages share one palette.
// If your project already centralizes this (e.g. src/styles/tokens.js),
// delete this block and import tokens from there instead.
const tokens = {
  purple: '#5E1B89',
  orange: '#F4512C',
  ink: '#1E293B',
  muted: '#64748B',
  faint: '#94A3B8',
  line: '#E6EAF0',
  rule: '#94A3B8',
  bg: '#F8FFFE',
}

const PAGE_SIZE = 8

// Stable identifier for a row regardless of which tab it's rendered under
const rowKey = (tab, row) => `${tab}-${row.id}-${row.orderId}`

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
  )
}

export default function Transactions() {
  const [activeTab, setActiveTab] = useState('subscriptions')
  const [query, setQuery] = useState('')
  const [selectedKeys, setSelectedKeys] = useState(() => new Set())

  const tableConfig = {
    subscriptions: { columns: subscriptionColumns, rows: subscriptionTransactions },
    'one-time-purchase': { columns: oneTimeColumns, rows: oneTimeTransactions },
  }

  const activeTable = tableConfig[activeTab]

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return activeTable.rows

    return activeTable.rows.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(needle)),
    )
  }, [activeTable.rows, query])

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    resetPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination({ totalItems: filteredRows.length, itemsPerPage: PAGE_SIZE })

  const visibleRows = filteredRows.slice(startIndex, endIndex)
  const visibleKeys = visibleRows.map((row) => rowKey(activeTab, row))
  const allVisibleSelected = visibleKeys.length > 0 && visibleKeys.every((key) => selectedKeys.has(key))
  const someVisibleSelected = visibleKeys.some((key) => selectedKeys.has(key))

  // Switching tabs starts selection fresh, since the two tables track different rows
  useEffect(() => {
    setSelectedKeys(new Set())
  }, [activeTab])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    resetPage()
  }

  const toggleRow = (row) => {
    const key = rowKey(activeTab, row)
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const toggleSelectAllVisible = () => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) {
        visibleKeys.forEach((key) => next.delete(key))
      } else {
        visibleKeys.forEach((key) => next.add(key))
      }
      return next
    })
  }

  const clearSelection = () => setSelectedKeys(new Set())

  return (
    <div className="-m-6 bg-white min-h-[calc(100vh-68px)] flex flex-col font-sans">
      {/* Header Band */}
      <section style={{ borderBottom: `1px solid ${tokens.line}` }}>
        <div className="px-4 sm:px-8 pt-[18px] pb-[20px] flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              to="/transactions"
              className="hover:underline block"
              style={{ fontSize: 12, color: tokens.orange }}
            >
              &gt; Transactions
            </Link>
            <h1
              className="font-heading font-bold leading-none mt-[12px]"
              style={{ fontSize: 34, color: tokens.purple }}
            >
              Transactions
            </h1>
          </div>

          <div className="relative w-full sm:w-64 lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: tokens.orange }} />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                resetPage()
              }}
              placeholder="Search"
              aria-label="Search transactions"
              className="w-full rounded-[6px] h-[36px] border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': tokens.purple }}
            />
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section
        className="px-4 sm:px-8 min-h-[64px] py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3"
        style={{ borderBottom: `1px solid ${tokens.line}` }}
      >
        <div className="flex rounded-[6px] overflow-hidden shrink-0 border border-slate-300">
          <TransactionsTab
            name="Subscriptions"
            isActive={activeTab === 'subscriptions'}
            isFirst
            onClick={() => handleTabClick('subscriptions')}
          />
          <TransactionsTab
            name="One-Time Purchase"
            isActive={activeTab === 'one-time-purchase'}
            onClick={() => handleTabClick('one-time-purchase')}
          />
        </div>

        {selectedKeys.size > 0 ? (
          <div className="flex items-center gap-4">
            <p className="text-xs font-semibold" style={{ color: tokens.purple }}>
              {selectedKeys.size} selected
            </p>
            <button
              type="button"
              onClick={clearSelection}
              className="text-xs font-semibold hover:underline"
              style={{ color: tokens.purple }}
            >
              Clear selection
            </button>
          </div>
        ) : (
          <span className="shrink-0 text-xs text-slate-500">
            Showing <strong style={{ color: tokens.ink }}>{visibleRows.length}</strong> of {filteredRows.length}
          </span>
        )}
      </section>

      {/* Transactions Table */}
      <section className="px-4 sm:px-8 flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.rule}` }}>
              <th className="text-left align-middle h-[52px] pt-[4px] w-[44px]">
                <CheckBox
                  checked={allVisibleSelected}
                  onChange={toggleSelectAllVisible}
                  label="Select all visible transactions"
                />
                {someVisibleSelected && !allVisibleSelected && (
                  <span className="sr-only">Some rows selected</span>
                )}
              </th>
              {activeTable.columns.map((col) => (
                <th
                  key={col.key}
                  className="align-middle h-[52px] font-sans uppercase text-[11px] tracking-[1.2px] whitespace-nowrap text-left"
                  style={{ color: tokens.faint, fontWeight: 400 }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row) => (
                <TransactionRow
                  key={rowKey(activeTab, row)}
                  row={row}
                  columns={activeTable.columns}
                  checked={selectedKeys.has(rowKey(activeTab, row))}
                  onToggle={() => toggleRow(row)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={activeTable.columns.length + 1} className="px-4 py-16 text-center text-xs text-slate-500">
                  No transactions match &ldquo;{query}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <section
          className="px-4 sm:px-8 h-[68px] flex items-center justify-between"
          style={{ borderTop: `1px solid ${tokens.rule}`, marginTop: -1 }}
        >
          <span className="text-xs text-slate-500">Page {currentPage} of {totalPages}</span>
          <div className="flex rounded-[6px] overflow-hidden border border-slate-300">
            <button
              type="button"
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="h-[32px] px-[16px] bg-white text-xs hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={nextPage}
              disabled={!hasNextPage}
              className="h-[32px] px-[16px] bg-white text-xs hover:bg-slate-50 disabled:opacity-40 border-l border-slate-300 cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  )
}