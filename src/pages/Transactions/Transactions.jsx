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
        <div className="px-6 pt-6 pb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-xs mb-2" style={{ color: tokens.orange }}>
              <Link to="/" className="hover:underline">
                &gt; Dashboard
              </Link>
              <span>&gt;</span>
              <span className="font-semibold">Transactions</span>
            </div>
            <h1 className="text-4xl font-heading font-bold text-brand-purple tracking-tight">
              Transactions
            </h1>
            <p className="text-xs text-slate-500 leading-normal mt-1.5">
              Monitor client payments, subscriptions, and financial records.
            </p>
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
          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  resetPage()
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-purple"
              />
            </div>

            <span className="shrink-0 text-xs text-slate-500">
              Showing <strong style={{ color: tokens.ink }}>{visibleRows.length}</strong> of {filteredRows.length}
            </span>
          </div>
        )}
      </section>

      {/* Transactions Table */}
      <section className="px-4 sm:px-8 flex-1 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col style={{ width: '3.5%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '14.5%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>

          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.rule}` }}>
              <th className="text-left align-middle h-[52px] pt-[4px]">
                <CheckBox
                  checked={allVisibleSelected}
                  onChange={toggleSelectAllVisible}
                  label="Select all visible transactions"
                />
                {someVisibleSelected && !allVisibleSelected && (
                  <span className="sr-only">Some rows selected</span>
                )}
              </th>
              {activeTable.columns.map((col) => {
                const isCenter = ['id', 'orderId', 'transactionDate', 'amount', 'paymentMethod', 'status'].includes(col.key);
                return (
                  <th
                    key={col.key}
                    className={`align-middle h-[52px] font-sans uppercase text-[11px] tracking-[1.2px] whitespace-nowrap ${
                      isCenter ? 'text-center' : 'text-left'
                    }`}
                    style={{ color: tokens.faint, fontWeight: 400 }}
                  >
                    {col.label}
                  </th>
                )
              })}
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