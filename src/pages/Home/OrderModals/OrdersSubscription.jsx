import React, { useState } from 'react'
import Button from '../../../components/ui/Button'

export default function OrdersSubscription({ isOpen = true, onClose }) {
  const [isEditMode, setIsEditMode] = useState(true)

  // Form State
  const [formData, setFormData] = useState({
    id: '123',
    lawfirm: 'Bautista Lawfirm',
    billingCycle: 'Monthly',
    plan: 'Premium',
    price: '1,000 php',
    startDate: '2026-05-04',
    status: 'Active',
    renewalDate: '2026-05-05',
    method: 'Visa',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading font-bold text-[24px] text-brand-purple">
            Order: S-{formData.id}
          </h2>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="md">
              Terminate
            </Button>

            <Button
              variant="orange"
              size="md"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? 'Save Mode' : 'Edit Mode'}
            </Button>

            <button
              onClick={onClose}
              className="ml-2 text-xl font-normal text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          {/* Lawfirm */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Lawfirm:
            </label>
            <input
              type="text"
              name="lawfirm"
              disabled={!isEditMode}
              value={formData.lawfirm}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
            />
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Billing Cycle:
            </label>
            <select
              name="billingCycle"
              disabled={!isEditMode}
              value={formData.billingCycle}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>

          {/* Plan */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Plan:
            </label>
            <div className="relative">
              <select
                name="plan"
                disabled={!isEditMode}
                value={formData.plan}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Price:
            </label>
            <input
              type="text"
              name="price"
              disabled={!isEditMode}
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              disabled={!isEditMode}
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Status:
            </label>
            <select
              name="status"
              disabled={!isEditMode}
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Renewal Date */}
          <div>
            <label className="mb-1 block font-sans font-normal text-[10px] uppercase tracking-[2px] text-slate-400">
              Renewal Date:
            </label>
            <input
              type="date"
              name="renewalDate"
              disabled={!isEditMode}
              value={formData.renewalDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
            />
          </div>
        </div>

        {/* Dynamic Transactions Table Section */}
        <div className="mt-8 overflow-x-auto border-t border-slate-100 pt-4">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-800 font-sans font-bold text-[12px] tracking-[2px] text-slate-800">
                <th className="py-2 pr-2">#</th>
                <th className="py-2 px-2">ID</th>
                <th className="py-2 px-2">ORDER ID</th>
                <th className="py-2 px-2">CLIENT</th>
                <th className="py-2 px-2">TRANSACTION DATE</th>
                <th className="py-2 px-2">AMOUNT</th>
                <th className="py-2 px-2">METHOD</th>
                <th className="py-2 pl-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs">
                <td className="py-3 pr-2 font-medium">1</td>
                <td className="py-3 px-2">{formData.id}</td>
                <td className="py-3 px-2">{formData.id}</td>
                <td className="py-3 px-2">{formData.lawfirm}</td>
                <td className="py-3 px-2">{formData.startDate}</td>
                <td className="py-3 px-2">{formData.price}</td>
                <td className="py-3 px-2">{formData.method}</td>
                <td className="py-3 pl-2 font-medium text-emerald-600">
                  {formData.status === 'Active' ? 'Paid' : formData.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}