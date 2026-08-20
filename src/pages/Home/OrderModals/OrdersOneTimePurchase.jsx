import React, { useState } from 'react'
import Button from '../../../components/ui/Button'

export default function OrdersOneTimePurchase({ isOpen = true, onClose }) {
  const [isEditMode, setIsEditMode] = useState(false)

  // Form State initialized with the design layout values
  const [formData, setFormData] = useState({
    orderId: '123',
    productName: 'Scale-pink',
    type: 'Logo',
    category: 'Scale',
    client: 'Bautista Lawfirm Office',
    price: '1,000',
    orderDate: '05-05-2026',
    status: 'Paid',
    productImage: 'https://via.placeholder.com/300x300?text=Logo+Preview',
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
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 
            style={{ fontFamily: "'Roboto Slab', serif" }}
            className="font-bold text-[24px] text-brand-purple"
          >
            Order: S-{formData.orderId}
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

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Side: Form Inputs */}
          <div className="space-y-3.5">
            {/* Product Name */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Product Name:
              </label>
              <input
                type="text"
                name="productName"
                disabled={!isEditMode}
                value={formData.productName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>

            {/* Type */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Type:
              </label>
              <input
                type="text"
                name="type"
                disabled={!isEditMode}
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>

            {/* Category */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Category:
              </label>
              <input
                type="text"
                name="category"
                disabled={!isEditMode}
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>

            {/* Client */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Client:
              </label>
              <input
                type="text"
                name="client"
                disabled={!isEditMode}
                value={formData.client}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>

            {/* Price */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Price:
              </label>
              <input
                type="text"
                name="price"
                disabled={!isEditMode}
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>

            {/* Order Date */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Order Date:
              </label>
              <input
                type="text"
                name="orderDate"
                disabled={!isEditMode}
                value={formData.orderDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>

            {/* Status */}
            <div>
              <label 
                style={{ fontFamily: "'Lato', sans-serif" }}
                className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
              >
                Status:
              </label>
              <input
                type="text"
                name="status"
                disabled={!isEditMode}
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-700 outline-none transition-all focus:border-brand-purple disabled:bg-slate-50/50"
              />
            </div>
          </div>

          {/* Right Side: Product Preview Image */}
          <div className="flex flex-col">
            <label 
              style={{ fontFamily: "'Lato', sans-serif" }}
              className="mb-1 block font-normal text-[10px] uppercase tracking-[2px] text-slate-400"
            >
              Product:
            </label>
            <div className="flex h-full min-h-[320px] w-full items-center justify-center rounded-xl border border-slate-800 bg-white p-4">
              <img
                src={formData.productImage}
                alt={formData.productName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}