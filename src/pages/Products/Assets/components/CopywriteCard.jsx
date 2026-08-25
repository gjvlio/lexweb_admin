import React from 'react'
import { Users } from 'lucide-react'

/**
 * Grid card for a single copywrite asset. The salmon tile previews the copy itself,
 * since a copywrite has no image thumbnail like the Logos / Photos tabs.
 */
export default function CopywriteCard({ item, onEdit, onDelete }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md">
      {/* Copy preview tile */}
      <div className="flex aspect-square items-center justify-center rounded-xl bg-[#F8866C] px-4">
        <p className="text-center font-heading text-lg leading-snug text-white line-clamp-4">
          {item.previewText}
        </p>
      </div>

      <h3 className="mt-3 text-center text-sm font-bold text-slate-900">{item.title}</h3>

      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 line-clamp-2">
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
