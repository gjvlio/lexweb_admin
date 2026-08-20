import React, { useState } from 'react'
import { Users } from 'lucide-react'

export default function LogoCard({ item, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false)
  const imageUrl = item.kind === 'premade' ? item.imageUrl : item.orderOutputUrl

  // When hovering on a custom logo, the design shows a bounding box with dimensions
  const showDimensions = isHovered && item.width && item.height

  return (
    <div 
      className="flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo preview - perfectly square padding container */}
      <div className="relative mb-3 flex aspect-square w-full items-center justify-center p-6 pb-2">
        <div className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          
          {/* Bounding box dimension overlay (from the custom logo screenshot) */}
          {showDimensions && (
            <div className="absolute inset-0 border-2 border-dashed border-[#0095FF]">
              <div className="absolute -bottom-2 -left-2 h-4 w-4 border-2 border-[#0095FF] bg-white" />
              <div className="absolute -left-2 -top-2 h-4 w-4 border-2 border-[#0095FF] bg-white" />
              <div className="absolute -right-2 -top-2 h-4 w-4 border-2 border-[#0095FF] bg-white" />
              <div className="absolute -bottom-2 -right-2 h-4 w-4 border-2 border-[#0095FF] bg-white" />
              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-sm bg-[#0095FF] px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                {item.width} &times; {item.height}
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-center text-sm font-bold text-slate-900">{item.title}</h3>

      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 line-clamp-2 text-center px-2">
        {item.shortDescription}
      </p>

      <div className="mt-2 flex items-baseline justify-between border-b border-slate-300 pb-1.5">
        <span className="text-sm font-bold text-slate-900">
          ₱{item.price.toLocaleString()}
        </span>
        <span className="text-[11px] text-slate-400">{item.date}</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">Availed by</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#CAF4BB] px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
          <Users className="h-3 w-3" />
          {item.availedBy} Firms
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="rounded-lg bg-brand-purple-soft px-6 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-1"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(item)}
          className="rounded-lg bg-brand-orange px-6 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-1"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
