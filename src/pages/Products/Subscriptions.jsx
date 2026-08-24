import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, Check, ChevronDown, Calendar, Plus, Edit3, Trash2 } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import PlanColumn from '../../components/products/PlanColumn'
import InclusionsTable from '../../components/products/InclusionsTable'

// ─────────────────────────────────────────────────────────────────────────────
// Static mock data
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_FEATURES = [
  { id: '1', label: 'Website Template or Design with Unlimited Colors' },
  { id: '2', label: 'Own Law Firm Logo Upload with Tagline' },
  { id: '3', label: 'Own Law Firm Banner' },
  { id: '4', label: 'Law Practice Areas' },
  { id: '5', label: 'Services (Assist, Consult, Docs, Works, icons)' },
  { id: '6', label: 'Own Law Updates from LexMeet' },
  { id: '7', label: 'Everyday Own Law Blog from LexMeet' },
  { id: '8', label: 'Online Consultation Booking' },
  { id: '9', label: 'Client Portal Access' },
  { id: '10', label: 'Priority Email Support' },
  { id: '11', label: 'Analytics Dashboard' },
  { id: '12', label: 'Dedicated Account Manager' },
]

const INITIAL_PROMOS = [
  {
    id: '100',
    productName: 'Scale-pink',
    originalPrice: '1,000',
    promoName: 'Scale-pink',
    discount: '1',
    startDate: '',
    endDate: '1 Jan 2026',
    status: 'Ended',
  },
  {
    id: '234',
    productName: 'Scale-pink',
    originalPrice: '1,000',
    promoName: 'New Year Promo',
    discount: '10',
    startDate: '',
    endDate: '31 Dec 2026',
    status: 'Ongoing',
  },
  {
    id: '727',
    productName: 'Scale-pink',
    originalPrice: '1,000',
    promoName: 'New Year Promo',
    discount: '15',
    startDate: '',
    endDate: '1 Jan 2027',
    status: 'Ongoing',
  },
  {
    id: '1732',
    productName: 'Scale-pink',
    originalPrice: '1,000',
    promoName: 'New Year Promo',
    discount: '20',
    startDate: '',
    endDate: '27 Jul 2026',
    status: 'Ongoing',
  },
]

const INITIAL_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    billingPeriod: 'month',
    tierBarWidth: '20%',
    features: {
      '1': true, '2': true, '3': true, '4': true,
      '5': true, '6': true, '7': true, '8': false,
      '9': false, '10': false, '11': false, '12': false,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1000,
    billingPeriod: 'month',
    tierBarWidth: '55%',
    features: {
      '1': true, '2': true, '3': true, '4': true,
      '5': true, '6': true, '7': true, '8': true,
      '9': false, '10': false, '11': true, '12': false,
    },
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 2000,
    billingPeriod: 'month',
    tierBarWidth: '100%',
    features: {
      '1': true, '2': true, '3': true, '4': true,
      '5': true, '6': true, '7': true, '8': true,
      '9': true, '10': true, '11': true, '12': true,
    },
  },
]

const COL_WIDTH = '200px'
const LABEL_WIDTH = '340px'

// ─────────────────────────────────────────────────────────────────────────────
// Edit Promo Modal Component (Matches exact UI)
// ─────────────────────────────────────────────────────────────────────────────

function EditPromoModal({ isOpen, onClose, onSave, promo }) {
  if (!isOpen || !promo) return null

  const [formData, setFormData] = useState({
    productName: promo.productName || 'Scale-pink',
    originalPrice: promo.originalPrice || '1,000',
    promoName: promo.promoName || promo.name || 'Scale-pink',
    discount: promo.discount || '1',
    startDate: promo.startDate || '',
    endDate: promo.endDate || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...promo,
      productName: formData.productName,
      originalPrice: formData.originalPrice,
      promoName: formData.promoName,
      name: formData.promoName,
      discount: formData.discount,
      startDate: formData.startDate,
      endDate: formData.endDate,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-slate-100">
          <h2 className="text-xl font-bold font-heading text-brand-purple">
            Edit Promo
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Product Name:
            </label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Original Price
            </label>
            <input
              type="text"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Promo Name:
            </label>
            <input
              type="text"
              value={formData.promoName}
              onChange={(e) => setFormData({ ...formData, promoName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Price Discount(%):
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple pr-8"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-600 font-medium">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Start Date:
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              End Date:
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
              />
            </div>
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-end pt-3 pb-1">
            <button
              type="submit"
              className="bg-[#FF5533] hover:bg-[#e04424] text-white font-medium rounded-lg px-4 py-2 text-xs transition-colors shadow-sm"
            >
              Save change
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Add / Edit Inclusion Modal Component
// ─────────────────────────────────────────────────────────────────────────────

function InclusionFormModal({ isOpen, onClose, onSave, feature = null }) {
  if (!isOpen) return null

  const isEdit = Boolean(feature)
  const [name, setName] = useState(feature?.label || 'Scale-pink')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave(name, feature?.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <h2 className="text-xl font-bold font-heading text-brand-purple">
            {isEdit ? 'Edit Inclusions' : 'Add New Inclusions'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Plan Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-brand-purple hover:opacity-90 text-white font-medium rounded-lg px-5 py-1.5 text-sm transition-opacity"
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium rounded-lg px-6 py-1.5 text-sm transition-colors"
            >
              Add
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Add Plan Promo Modal Component
// ─────────────────────────────────────────────────────────────────────────────

function AddPlanPromoModal({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    planName: 'Scale-pink',
    originalPrice: '1,000',
    promoName: 'Scale-pink',
    discount: '1',
    startDate: '2025-12-12',
    endDate: '2025-02-02',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      id: `${Math.floor(Math.random() * 9000) + 1000}`,
      productName: formData.planName,
      originalPrice: formData.originalPrice,
      promoName: formData.promoName || 'New Promo',
      name: formData.promoName || 'New Promo',
      discount: formData.discount,
      status: 'Ongoing',
      startDate: formData.startDate,
      endDate: formData.endDate,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-2">
          <h2 className="text-xl font-bold font-heading text-brand-purple">
            Plan Promos
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-7 py-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Plan Name:
            </label>
            <input
              type="text"
              value={formData.planName}
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Original Price
            </label>
            <input
              type="text"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Promo Name:
            </label>
            <input
              type="text"
              value={formData.promoName}
              onChange={(e) => setFormData({ ...formData, promoName: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Price Discount(%):
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple pr-8"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-600 font-medium">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Start Date:
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              End Date:
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-3 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="bg-brand-purple hover:opacity-90 text-white font-medium rounded-lg px-5 py-1.5 text-sm transition-opacity"
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium rounded-lg px-6 py-1.5 text-sm transition-colors"
            >
              Add
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// All Inclusions Modal Component
// ─────────────────────────────────────────────────────────────────────────────

function AllInclusionsModal({
  isOpen,
  onClose,
  features,
  onDeleteFeature,
  onOpenAddInclusion,
  onOpenEditInclusion,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <h2 className="text-2xl font-bold font-heading text-brand-purple">
            All Inclusions
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto px-8 py-2">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-700 font-semibold">
                <th className="py-3 px-2 w-16">ID</th>
                <th className="py-3 px-2">Feature</th>
                <th className="py-3 px-2 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {features.map((feature) => (
                <tr key={feature.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-2 text-slate-600 font-medium">{feature.id}</td>
                  <td className="py-3.5 px-2 text-slate-800 font-medium">{feature.label}</td>
                  <td className="py-3.5 px-2 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => onOpenEditInclusion(feature)}
                        className="text-orange-500 hover:text-orange-600 transition-colors"
                        title="Edit feature"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteFeature(feature.id)}
                        className="text-orange-500 hover:text-red-600 transition-colors"
                        title="Delete feature"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-8 py-5 border-t border-slate-100 bg-white">
          <button
            type="button"
            onClick={onOpenAddInclusion}
            className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium rounded-lg px-6 py-2 text-sm transition-colors"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Plan Promos Modal Component
// ─────────────────────────────────────────────────────────────────────────────

function PlanPromosModal({
  isOpen,
  onClose,
  promos,
  onDeletePromo,
  onOpenAddPromo,
  onOpenEditPromo,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <h2 className="text-2xl font-bold font-heading text-brand-purple">
            Plan Promos
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto px-8 py-2">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-700 font-semibold">
                <th className="py-3 px-2 w-16">ID</th>
                <th className="py-3 px-2">Promo Name</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">End Date</th>
                <th className="py-3 px-2 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-2 text-slate-600 font-medium">{promo.id}</td>
                  <td className="py-3.5 px-2 text-slate-800 font-medium">{promo.promoName || promo.name}</td>
                  <td className="py-3.5 px-2 text-slate-700 font-medium">{promo.status}</td>
                  <td className="py-3.5 px-2 text-slate-700 font-medium">{promo.endDate}</td>
                  <td className="py-3.5 px-2 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => onOpenEditPromo(promo)}
                        className="text-orange-500 hover:text-orange-600 transition-colors"
                        title="Edit promo"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeletePromo(promo.id)}
                        className="text-orange-500 hover:text-red-600 transition-colors"
                        title="Delete promo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-8 py-5 border-t border-slate-100 bg-white">
          <button
            type="button"
            onClick={onOpenAddPromo}
            className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium rounded-lg px-6 py-2 text-sm transition-colors"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Add New Plan Modal Component
// ─────────────────────────────────────────────────────────────────────────────

function AddPlanModal({ isOpen, onClose, onAdd, features, promos }) {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    name: 'Dark-blue',
    price: '1,000',
    discount: '1',
    startDate: '2025-12-12',
    endDate: '2025-12-12',
    interminable: false,
    selectedPromos: [],
    selectedFeatures: [],
  })

  const togglePromo = (promoName) => {
    setFormData((prev) => ({
      ...prev,
      selectedPromos: prev.selectedPromos.includes(promoName)
        ? prev.selectedPromos.filter((p) => p !== promoName)
        : [...prev.selectedPromos, promoName],
    }))
  }

  const toggleFeature = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((id) => id !== featureId)
        : [...prev.selectedFeatures, featureId],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const featureMap = features.reduce((acc, f) => {
      acc[f.id] = formData.selectedFeatures.includes(f.id)
      return acc
    }, {})

    onAdd({
      id: `plan-${Date.now()}`,
      name: formData.name || 'New Plan',
      price: formData.price ? Number(formData.price.replace(/,/g, '')) : 'Free',
      billingPeriod: 'month',
      tierBarWidth: '50%',
      features: featureMap,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <h2 className="text-2xl font-bold font-heading text-brand-purple">
            Add New Plan
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        <div className="border-b border-slate-200 mx-8" />

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Price:
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Price Discount(%):
                </label>
                <input
                  type="text"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                />
              </div>
            </div>

            {/* Right Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Start Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  End Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    disabled={formData.interminable}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="interminable"
                  checked={formData.interminable}
                  onChange={(e) => setFormData({ ...formData, interminable: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-brand-purple focus:ring-brand-purple cursor-pointer"
                />
                <label htmlFor="interminable" className="text-xs font-semibold text-slate-600 cursor-pointer">
                  Interminable
                </label>
              </div>
            </div>
          </div>

          {/* Promos & Inclusions Containers */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* Promos Box */}
            <div className="border border-brand-purple rounded-md p-3 flex flex-col h-48">
              <h3 className="text-sm font-bold text-brand-purple mb-2">Promos:</h3>
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {promos.map((promo) => {
                  const promoLabel = promo.promoName || promo.name
                  const isSelected = formData.selectedPromos.includes(promoLabel)
                  return (
                    <div
                      key={promo.id}
                      onClick={() => togglePromo(promoLabel)}
                      className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-brand-purple"
                    >
                      <span>{promoLabel}</span>
                      <Plus className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-45 text-red-500' : 'text-orange-500'}`} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Inclusions Box */}
            <div className="border border-orange-400 rounded-md p-3 flex flex-col h-48">
              <h3 className="text-sm font-bold text-brand-purple mb-2">Inclusions:</h3>
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar">
                {features.map((feature) => {
                  const isSelected = formData.selectedFeatures.includes(feature.id)
                  return (
                    <div
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-brand-purple"
                    >
                      <span className="truncate pr-2">{feature.label}</span>
                      <Plus className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'rotate-45 text-red-500' : 'text-orange-500'}`} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-brand-purple hover:opacity-90 text-white font-medium rounded-lg px-6 py-2 text-sm transition-opacity"
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium rounded-lg px-7 py-2 text-sm transition-colors"
            >
              Add
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Edit Plan Modal Component
// ─────────────────────────────────────────────────────────────────────────────

function EditPlanModal({ plan, isOpen, onClose, onSave, onDelete, features }) {
  if (!isOpen || !plan) return null

  const [formData, setFormData] = useState({
    name: plan.name || '',
    billingCycle: plan.billingPeriod === 'month' ? 'Monthly' : 'Yearly',
    price: plan.price === 'Free' ? '' : plan.price,
    features: { ...plan.features },
  })

  const handleFeatureToggle = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureId]: !prev.features[featureId],
      },
    }))
  }

  const handleSave = () => {
    onSave({
      ...plan,
      name: formData.name,
      price: formData.price === '' ? 'Free' : Number(formData.price),
      billingPeriod: formData.billingCycle === 'Monthly' ? 'month' : 'year',
      features: formData.features,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between px-8 pt-8 pb-4">
          <div>
            <span className="text-xs font-bold font-sans tracking-wider text-brand-purple uppercase">
              EDIT PLAN
            </span>
            <h2 className="text-3xl font-heading font-bold text-brand-purple leading-tight mt-1">
              {plan.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-2 space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold font-sans tracking-wider text-slate-400 uppercase">
              PLAN NAME
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl font-sans text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold font-sans tracking-wider text-slate-400 uppercase">
                BILLING CYCLE
              </label>
              <div className="relative">
                <select
                  value={formData.billingCycle}
                  onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                  className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 rounded-xl font-sans text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all pr-10 cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold font-sans tracking-wider text-slate-400 uppercase">
                PRICE
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Free"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-sans text-slate-700 font-medium focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all pr-20"
                />
                <span className="absolute right-4 text-sm font-sans text-slate-400 pointer-events-none">
                  /month
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 my-4" />

          <div className="space-y-4 pb-4">
            <h3 className="text-xs font-bold font-sans tracking-wider text-brand-purple uppercase">
              INCLUSIONS
            </h3>
            <div className="space-y-3">
              {features.map((feature) => {
                const isChecked = !!formData.features[feature.id]
                return (
                  <label
                    key={feature.id}
                    onClick={() => handleFeatureToggle(feature.id)}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-brand-purple text-white'
                          : 'border border-slate-300 bg-white group-hover:border-slate-400'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-sans text-slate-600 font-medium">
                      {feature.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 bg-white">
          <button
            type="button"
            className="bg-brand-purple hover:opacity-90 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition-opacity outline-none"
            onClick={() => {
              onDelete(plan.id)
              onClose()
            }}
          >
            Delete Plan
          </button>
          <Button
            type="button"
            variant="orange"
            className="font-semibold rounded-lg px-5 py-2.5 text-sm"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Subscriptions() {
  const [plans, setPlans] = useState(INITIAL_PLANS)
  const [features, setFeatures] = useState(INITIAL_FEATURES)
  const [promos, setPromos] = useState(INITIAL_PROMOS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [selectedPromo, setSelectedPromo] = useState(null)

  // Modal controls
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isInclusionsModalOpen, setIsInclusionsModalOpen] = useState(false)
  const [isInclusionFormOpen, setIsInclusionFormOpen] = useState(false)
  const [isPromosModalOpen, setIsPromosModalOpen] = useState(false)
  const [isAddPromoModalOpen, setIsAddPromoModalOpen] = useState(false)
  const [isEditPromoModalOpen, setIsEditPromoModalOpen] = useState(false)

  const filteredPlans = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return plans
    return plans.filter((p) => p.name.toLowerCase().includes(q))
  }, [searchQuery, plans])

  const handleEditPlan = (planId) => {
    const planToEdit = plans.find((p) => p.id === planId)
    if (planToEdit) {
      setSelectedPlan(planToEdit)
      setIsEditModalOpen(true)
    }
  }

  const handleSavePlan = (updatedPlan) => {
    setPlans((prevPlans) =>
      prevPlans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    )
  }

  const handleDeletePlan = (planId) => {
    setPlans((prevPlans) => prevPlans.filter((p) => p.id !== planId))
  }

  const handleAddNewPlan = (newPlan) => {
    setPlans((prev) => [...prev, newPlan])
  }

  const handleDeleteFeature = (featureId) => {
    setFeatures((prev) => prev.filter((f) => f.id !== featureId))
  }

  const handleSaveInclusion = (label, id) => {
    if (id) {
      setFeatures((prev) =>
        prev.map((f) => (f.id === id ? { ...f, label } : f))
      )
    } else {
      setFeatures((prev) => [
        ...prev,
        { id: `${prev.length + 1}`, label },
      ])
    }
  }

  const handleDeletePromo = (promoId) => {
    setPromos((prev) => prev.filter((p) => p.id !== promoId))
  }

  const handleAddPromo = (newPromo) => {
    setPromos((prev) => [...prev, newPromo])
  }

  const handleSavePromo = (updatedPromo) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === updatedPromo.id ? updatedPromo : p))
    )
  }

  // Back navigation handlers
  const handleCloseInclusionForm = () => {
    setIsInclusionFormOpen(false)
    setIsInclusionsModalOpen(true)
  }

  const handleCloseAddPromoModal = () => {
    setIsAddPromoModalOpen(false)
    setIsPromosModalOpen(true)
  }

  const handleCloseEditPromoModal = () => {
    setIsEditPromoModalOpen(false)
    setIsPromosModalOpen(true)
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans">
            <Link to="/products" className="text-brand-orange hover:underline font-medium">
              Products
            </Link>
            <span className="text-slate-400">&rsaquo;</span>
            <span className="text-brand-purple font-semibold">Subscriptions</span>
          </nav>

          <h1 className="text-3xl font-heading font-bold text-brand-purple leading-tight">
            Subscriptions
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="subscriptions-search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search subscription plans"
              className="w-56 md:w-72 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm font-sans text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
            />
          </div>

          <Button
            variant="orange"
            size="md"
            className="rounded-xl font-semibold whitespace-nowrap"
            onClick={() => setIsAddModalOpen(true)}
            id="add-plan-btn"
          >
            + Add
          </Button>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex items-center gap-3">
        <Button
          variant="orange"
          size="md"
          className="rounded-xl font-semibold"
          onClick={() => setIsInclusionsModalOpen(true)}
          id="all-inclusions-btn"
        >
          All inclusions
        </Button>
        <Button
          variant="orange"
          size="md"
          className="rounded-xl font-semibold"
          onClick={() => setIsPromosModalOpen(true)}
          id="all-plan-btn"
        >
          All plan
        </Button>
      </div>

      {/* Plan Comparison Card */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto overflow-y-visible">
          <div
            style={{
              minWidth: `calc(${LABEL_WIDTH} + ${filteredPlans.length} * ${COL_WIDTH})`,
            }}
          >
            <div className="flex">
              <div
                className="shrink-0"
                style={{ width: LABEL_WIDTH, minWidth: LABEL_WIDTH }}
              />

              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="shrink-0 flex flex-col"
                    style={{ width: COL_WIDTH, minWidth: COL_WIDTH }}
                  >
                    <PlanColumn plan={plan} colWidth={COL_WIDTH} />
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center py-16 text-sm font-sans text-slate-400">
                  No plans match &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {filteredPlans.length > 0 && (
              <InclusionsTable
                features={features}
                plans={filteredPlans}
                colWidth={COL_WIDTH}
                labelWidth={LABEL_WIDTH}
              />
            )}

            {filteredPlans.length > 0 && (
              <div className="flex border-t border-slate-200">
                <div
                  className="shrink-0"
                  style={{ width: LABEL_WIDTH, minWidth: LABEL_WIDTH }}
                />
                {filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="shrink-0 px-5 py-4 flex justify-center"
                    style={{ width: COL_WIDTH, minWidth: COL_WIDTH }}
                  >
                    <Button
                      variant="orange"
                      size="md"
                      className="w-full justify-center rounded-lg text-sm font-semibold"
                      onClick={() => handleEditPlan(plan.id)}
                      aria-label={`Edit plan ${plan.name}`}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Modals */}
      <EditPlanModal
        plan={selectedPlan}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePlan}
        onDelete={handleDeletePlan}
        features={features}
      />

      <AddPlanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNewPlan}
        features={features}
        promos={promos}
      />

      <AllInclusionsModal
        isOpen={isInclusionsModalOpen}
        onClose={() => setIsInclusionsModalOpen(false)}
        features={features}
        onDeleteFeature={handleDeleteFeature}
        onOpenAddInclusion={() => {
          setSelectedFeature(null)
          setIsInclusionsModalOpen(false)
          setIsInclusionFormOpen(true)
        }}
        onOpenEditInclusion={(feature) => {
          setSelectedFeature(feature)
          setIsInclusionsModalOpen(false)
          setIsInclusionFormOpen(true)
        }}
      />

      <InclusionFormModal
        isOpen={isInclusionFormOpen}
        onClose={handleCloseInclusionForm}
        onSave={handleSaveInclusion}
        feature={selectedFeature}
      />

      <PlanPromosModal
        isOpen={isPromosModalOpen}
        onClose={() => setIsPromosModalOpen(false)}
        promos={promos}
        onDeletePromo={handleDeletePromo}
        onOpenAddPromo={() => {
          setIsPromosModalOpen(false)
          setIsAddPromoModalOpen(true)
        }}
        onOpenEditPromo={(promo) => {
          setSelectedPromo(promo)
          setIsPromosModalOpen(false)
          setIsEditPromoModalOpen(true)
        }}
      />

      <AddPlanPromoModal
        isOpen={isAddPromoModalOpen}
        onClose={handleCloseAddPromoModal}
        onAdd={handleAddPromo}
      />

      <EditPromoModal
        isOpen={isEditPromoModalOpen}
        onClose={handleCloseEditPromoModal}
        onSave={handleSavePromo}
        promo={selectedPromo}
      />
    </div>
  )
}