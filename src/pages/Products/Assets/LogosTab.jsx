import React, { useState, useMemo } from 'react'
import { Plus, Search, ChevronDown } from 'lucide-react'
import { LOGO_CATEGORIES, LOGO_STATUSES, PREMADE_LOGOS, CUSTOM_LOGOS } from './data/logos'
import StatusSelect from './components/StatusSelect'
import LogoCard from './components/LogoCard'
import AddPremadeLogoModal from './modals/AddPremadeLogoModal'
import LogoDetailsModal from './modals/LogoDetailsModal'
import CustomLogoRequestDetailsModal from './modals/CustomLogoRequestDetailsModal'
import Pagination from './components/Pagination'

export default function LogosTab({ tabsSlot }) {
  const [kind, setKind] = useState('premade') // 'premade' | 'custom'
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const [addModalOpen, setAddModalOpen] = useState(false)
  
  const [selectedPremade, setSelectedPremade] = useState(null)
  const [premadeModalOpen, setPremadeModalOpen] = useState(false)
  
  const [selectedCustom, setSelectedCustom] = useState(null)
  const [customModalOpen, setCustomModalOpen] = useState(false)

  // Handlers for Add modal
  const handleAddSubmit = (newLogo) => {
    console.log('Add logo:', newLogo)
    setAddModalOpen(false)
  }

  // Handlers for Pre-made Details modal
  const handleEditPremade = (logo) => {
    setSelectedPremade(logo)
    setPremadeModalOpen(true)
  }
  const handleUpdatePremade = (updated) => {
    console.log('Update premade:', updated)
    setPremadeModalOpen(false)
  }
  const handleDeletePremade = (deleted) => {
    console.log('Delete premade:', deleted)
    setPremadeModalOpen(false)
  }

  // Handlers for Custom Details modal
  const handleEditCustom = (request) => {
    setSelectedCustom(request)
    setCustomModalOpen(true)
  }
  const handleDeleteCustom = (deleted) => {
    console.log('Delete custom request:', deleted)
    setCustomModalOpen(false)
  }

  const items = kind === 'premade' ? PREMADE_LOGOS : CUSTOM_LOGOS

  // Filtering
  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (category !== 'All' && item.category !== category) return false
      if (status !== 'All' && item.status !== status) return false
      if (search) {
        const query = search.toLowerCase()
        const matchTitle = item.title?.toLowerCase().includes(query)
        const matchFirm = item.orderedBy?.toLowerCase().includes(query)
        return matchTitle || matchFirm
      }
      return true
    })
  }, [items, category, status, search])

  // Pagination (8 items per page to match 4x2 grid)
  const perPage = 8
  const totalPages = Math.ceil(filtered.length / perPage) || 1
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-5">
      {/* Toolbar row 1: asset type tabs + status, search and add */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {tabsSlot}

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
              aria-label="Filter by status"
              className="appearance-none rounded-lg border border-slate-900 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              {LOGO_STATUSES.map((option) => (
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search"
              aria-label="Search logos"
              className="w-full rounded-lg border border-brand-purple bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>

          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="rounded-lg bg-brand-orange px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Toolbar row 2: pre-made / custom switch + category filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 pb-4">
        <div className="inline-flex rounded-lg bg-slate-200/70 p-1">
          {['premade', 'custom'].map((value) => {
            const isActive = kind === value

            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setKind(value)
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
          {LOGO_CATEGORIES.map((cat) => {
            const isActive = category === cat

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat)
                  setPage(1)
                }}
                className={`border-b-2 pb-0.5 text-base transition-colors ${
                  isActive
                    ? 'border-brand-orange font-semibold text-brand-orange'
                    : 'border-transparent text-slate-800 hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginated.map((item) => (
          <LogoCard
            key={item.id}
            item={item}
            onEdit={kind === 'premade' ? handleEditPremade : handleEditCustom}
            onDelete={kind === 'premade' ? handleDeletePremade : handleDeleteCustom}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-500">
          No logos found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Modals */}
      <AddPremadeLogoModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />
      
      <LogoDetailsModal
        open={premadeModalOpen}
        logo={selectedPremade}
        onClose={() => setPremadeModalOpen(false)}
        onSubmit={handleUpdatePremade}
        onDelete={handleDeletePremade}
      />
      
      <CustomLogoRequestDetailsModal
        open={customModalOpen}
        request={selectedCustom}
        onClose={() => setCustomModalOpen(false)}
        onDelete={handleDeleteCustom}
      />
    </div>
  )
}
