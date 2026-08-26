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

const PAGE_SIZE = 8

// Stable identifier for a row regardless of which tab it's rendered under
const rowKey = (tab, row) => `${tab}-${row.id}-${row.orderId}`

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
    goToPage,
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
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Link
          to="/transactions"
          className="font-sans hover:underline cursor-pointer block"
          style={{ fontSize: 12, color: '#F4512C' }}
        >
          &gt; Transactions
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-heading font-bold text-brand-purple leading-tight">
            Transactions
          </h1>

          <div className="relative w-64 lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-orange" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                resetPage()
              }}
              placeholder="Search"
              aria-label="Search transactions"
              className="w-full rounded-lg border border-brand-purple bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <TransactionsTab
          name="Subscriptions"
          isActive={activeTab === 'subscriptions'}
          onClick={() => handleTabClick('subscriptions')}
        />
        <TransactionsTab
          name="One-Time Purchase"
          isActive={activeTab === 'one-time-purchase'}
          onClick={() => handleTabClick('one-time-purchase')}
        />
      </div>

      {selectedKeys.size > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-[#F1EDFB] px-4 py-2.5">
          <p className="text-sm font-semibold text-brand-purple">
            {selectedKeys.size} selected
          </p>
          <button
            type="button"
            onClick={clearSelection}
            className="text-sm font-semibold text-brand-purple hover:underline"
          >
            Clear selection
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-brand-purple text-left text-sm font-bold text-white">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={allVisibleSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = !allVisibleSelected && someVisibleSelected
                  }}
                  onChange={toggleSelectAllVisible}
                  aria-label="Select all visible transactions"
                />
              </th>
              {activeTable.columns.map((col) => (
                <th key={col.key} className="px-4 py-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
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
                <td colSpan={activeTable.columns.length + 1} className="px-4 py-16 text-center text-sm text-slate-500">
                  No transactions match &ldquo;{query}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1 py-2">
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="rounded border px-3 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`rounded border px-3 py-2 text-sm ${
                    currentPage === page ? 'bg-brand-purple text-white' : ''
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              type="button"
              onClick={nextPage}
              disabled={!hasNextPage}
              className="rounded border px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
