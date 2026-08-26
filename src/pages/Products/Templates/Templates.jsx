import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search } from 'lucide-react'
import Button from '../../../components/ui/Button'
import TemplateCard from './components/TemplateCard'
import ViewTemplateModal from './modals/ViewTemplateModal'
import AddTemplateModal from './modals/AddTemplateModal'
import { INITIAL_TEMPLATES, SORT_DIRECTIONS, SORT_FIELDS } from './data/templates'

export default function Templates() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES)
  const [query, setQuery] = useState('')
  const [sortField, setSortField] = useState('Name')
  const [sortDirection, setSortDirection] = useState('Ascending')

  // Only one modal is ever open: 'view' | 'add'
  const [activeModal, setActiveModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const visibleTemplates = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = templates.filter((template) =>
      template.name.toLowerCase().includes(needle),
    )

    const sorted = [...filtered].sort((a, b) => {
      if (sortField === 'Price') {
        const priceA = Number(String(a.price).replace(/,/g, ''))
        const priceB = Number(String(b.price).replace(/,/g, ''))
        return priceA - priceB
      }
      return a.name.localeCompare(b.name)
    })

    return sortDirection === 'Ascending' ? sorted : sorted.reverse()
  }, [templates, query, sortField, sortDirection])

  const closeModal = () => {
    setActiveModal(null)
    setSelected(null)
  }

  const handleView = (template) => {
    setSelected(template)
    setActiveModal('view')
  }

  const handleSave = (updated) => {
    setTemplates((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    closeModal()
  }

  const handleDelete = (target) => {
    setTemplates((prev) => prev.filter((t) => t.id !== target.id))
    closeModal()
  }

  const handleAdd = (values) => {
    const created = {
      id: `t-${Date.now()}`,
      name: values.name || 'Untitled Template',
      description: values.description,
      price: values.price || '0',
      numberOfPages: Number(values.numberOfPages) || 0,
      previewImage: values.file ? URL.createObjectURL(values.file) : '/mock/template-placeholder.png',
    }

    setTemplates((prev) => [created, ...prev])
    closeModal()
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans">
            <Link to="/products" className="text-brand-orange hover:underline font-medium">
              Products
            </Link>
            <span className="text-slate-400">&rsaquo;</span>
            <Link to="/products/templates" className="text-brand-purple font-semibold hover:underline">
            Templates
          </Link>
          </nav>

          <h1 className="text-3xl font-heading font-bold text-brand-purple leading-tight">
            Templates
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-64 lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-orange" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search templates"
              className="w-full rounded-lg border border-brand-purple bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>

          <Button
            variant="orange"
            size="md"
            className="rounded-xl font-semibold whitespace-nowrap"
            onClick={() => setActiveModal('add')}
          >
            + Add
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-800">Filter:</span>

        <div className="relative">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            aria-label="Sort by field"
            className="appearance-none rounded-lg bg-brand-orange py-2 pl-4 pr-9 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            {SORT_FIELDS.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
        </div>

        <div className="relative">
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
            aria-label="Sort direction"
            className="appearance-none rounded-lg bg-brand-orange py-2 pl-4 pr-9 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            {SORT_DIRECTIONS.map((direction) => (
              <option key={direction} value={direction}>
                {direction}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
        </div>
      </div>

      {visibleTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} onView={handleView} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white py-20 text-center text-sm text-slate-500 ring-1 ring-slate-200/70">
          No templates match &ldquo;{query}&rdquo;
        </div>
      )}

      <ViewTemplateModal
        open={activeModal === 'view'}
        template={selected}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <AddTemplateModal
        open={activeModal === 'add'}
        onClose={closeModal}
        onSubmit={handleAdd}
      />
    </div>
  )
}
