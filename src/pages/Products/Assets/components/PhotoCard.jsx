import React from 'react'
import { Users } from 'lucide-react'

export default function PhotoCard({ item, onEdit, onDelete }) {
  const imageUrl = item.kind === 'premade' ? item.imageUrl : item.orderOutputUrl

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md">
      {/* Photo preview */}
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={imageUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="mt-3 text-center text-sm font-bold text-black break-words">{item.title}</h3>

      <p className="mt-1.5 text-[11px] leading-relaxed text-black line-clamp-2 text-center px-2 break-all">
        {item.shortDescription}
      </p>

      <div className="mt-2 flex items-baseline justify-between gap-2 border-b border-slate-300 pb-1.5 min-w-0">
        <span className="text-sm font-bold text-black truncate">
          ₱{Number(String(item.price).replace(/,/g, '')).toLocaleString()}
        </span>
        <span className="text-[11px] text-black shrink-0 whitespace-nowrap">{item.date}</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-black">Availed by</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#DEBBF4] px-2.5 py-0.5 text-[11px] font-bold text-brand-purple">
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
