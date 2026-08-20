import React, { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import CopywriteCard from './components/CopywriteCard'
import Pagination from './components/Pagination'
import AddCustomRequestModal from './modals/AddCustomRequestModal'
import AddPremadeAssetModal from './modals/AddPremadeAssetModal'
import AssetDetailsModal from './modals/AssetDetailsModal'
import CustomRequestDetailsModal from './modals/CustomRequestDetailsModal'
import {
  COPYWRITE_CATEGORIES,
  COPYWRITE_STATUSES,
  CUSTOM_COPYWRITES,
  PREMADE_COPYWRITES,
} from './data/copywrites'

const PAGE_SIZE = 8
const SOURCES = ['premade', 'custom']

// Card dates read as "Aug 12, 2026"; an empty value falls back to today
const formatCardDate = (value) => {
  const date = value ? new Date(value) : new Date()
  const safe = Number.isNaN(date.getTime()) ? new Date() : date

  return safe.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CopywritesTab({ tabsSlot }) {
  const [source, setSource] = useState('premade')
  const [status, setStatus] = useState('All')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const [premade, setPremade] = useState(PREMADE_COPYWRITES)
  const [custom, setCustom] = useState(CUSTOM_COPYWRITES)

  // Only one modal is ever open: 'add' | 'add-custom' | 'details' | 'custom'
  const [activeModal, setActiveModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const items = source === 'premade' ? premade : custom

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return items.filter((item) => {
      if (status !== 'All' && item.status !== status) return false
      if (category !== 'All' && item.category !== category) return false
      if (!needle) return true

      return (
        item.title.toLowerCase().includes(needle) ||
        item.shortDescription.toLowerCase().includes(needle)
      )
    })
  }, [items, status, category, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Any filter change drops the reader back to the first page
  const applyFilter = (setter) => (value) => {
    setter(value)
    setPage(1)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelected(null)
  }

  const handleEdit = (item) => {
    setSelected(item)
    setActiveModal(item.kind === 'custom' ? 'custom' : 'details')
  }

  const handleDelete = (item) => {
    const remove = (list) => list.filter((entry) => entry.id !== item.id)

    if (item.kind === 'custom') {
      setCustom(remove)
    } else {
      setPremade(remove)
    }

    closeModal()
  }

  const handleAdd = (values) => {
    const created = {
      ...values,
      id: `cw-pre-${Date.now()}`,
      kind: 'premade',
      previewText: values.websiteText || values.title || 'Untitled copywrite',
      price: Number(values.price) || 0,
      numberOfWords: Number(values.numberOfWords) || 0,
      category: 'Others',
      date: formatCardDate(),
      availedBy: 0,
      status: 'Draft',
    }

    setPremade((prev) => [created, ...prev])
    setSource('premade')
    setPage(1)
    closeModal()
  }

  const handleAddCustom = (values) => {
    const output = values.orderOutput.trim()
    const textType = values.textType.trim() || 'Copywrite'

    const created = {
      ...values,
      id: `cw-cus-${Date.now()}`,
      kind: 'custom',
      textType,
      // The custom grid card previews the delivered copy, like the pre-made one does
      previewText: output || 'Awaiting output',
      title: output || `${textType} request`,
      shortDescription:
        values.description || `Custom ${textType.toLowerCase()} ordered by ${values.orderedBy}.`,
      category: 'Others',
      price: Number(values.priceAtPurchase) || 0,
      priceAtPurchase: Number(values.priceAtPurchase) || 0,
      date: formatCardDate(values.orderDate),
      availedBy: 1,
      status: 'Draft',
    }

    setCustom((prev) => [created, ...prev])
    setSource('custom')
    setPage(1)
    closeModal()
  }

  const handleUpdate = (updated) => {
    setPremade((prev) => prev.map((entry) => (entry.id === updated.id ? updated : entry)))
    closeModal()
  }

  return (
    <div className="space-y-5">
      {/* Toolbar row 1: asset type tabs + status, search and add */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {tabsSlot}

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => applyFilter(setStatus)(e.target.value)}
              aria-label="Filter by status"
              className="appearance-none rounded-lg border border-slate-900 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              {COPYWRITE_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {`Status: ${option}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-900" />
          </div>

          <div className="relative w-64 lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-orange" />
            <input
              type="search"
              value={query}
              onChange={(e) => applyFilter(setQuery)(e.target.value)}
              placeholder="Search"
              aria-label="Search copywrites"
              className="w-full rounded-lg border border-brand-purple bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>

          <button
            type="button"
            onClick={() => setActiveModal(source === 'custom' ? 'add-custom' : 'add')}
            className="rounded-lg bg-brand-orange px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Toolbar row 2: pre-made / custom switch + category filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 pb-4">
        <div className="inline-flex rounded-lg bg-slate-200/70 p-1">
          {SOURCES.map((value) => {
            const isActive = source === value

            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSource(value)
                  setPage(1)
                }}
                className={`rounded-md px-7 py-1.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border border-brand-orange bg-white text-brand-orange'
                    : 'border border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {value === 'premade' ? 'Pre-made' : 'Custom'}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {COPYWRITE_CATEGORIES.map((option) => {
            const isActive = category === option

            return (
              <button
                key={option}
                type="button"
                onClick={() => applyFilter(setCategory)(option)}
                className={`border-b-2 pb-0.5 text-base transition-colors ${
                  isActive
                    ? 'border-brand-orange font-semibold text-brand-orange'
                    : 'border-transparent text-slate-800 hover:text-brand-orange'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* Card grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((item) => (
            <CopywriteCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white py-20 text-center text-sm text-slate-500 ring-1 ring-slate-200/70">
          No copywrites match the current filters.
        </div>
      )}

      <div className="pt-2">
        <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
      </div>

      <AddPremadeAssetModal
        open={activeModal === 'add'}
        onClose={closeModal}
        onSubmit={handleAdd}
      />
      <AddCustomRequestModal
        open={activeModal === 'add-custom'}
        onClose={closeModal}
        onSubmit={handleAddCustom}
      />
      <AssetDetailsModal
        open={activeModal === 'details'}
        asset={selected}
        onClose={closeModal}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
      />
      <CustomRequestDetailsModal
        open={activeModal === 'custom'}
        request={selected}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  )
}
