import React from 'react'

/**
 * PlanColumn — displays one subscription plan's header info:
 *   - Plan Name (read-only, boxed display)
 *   - Price (read-only, boxed display) + /month suffix
 *
 * Props:
 *   plan      { id, name, price, billingPeriod }
 *   colWidth  string — min-width of the column, default '180px'
 *
 * Note: Edit button is rendered at the bottom of the full table in
 * Subscriptions.jsx (after all inclusion rows), not inside this component.
 */
export default function PlanColumn({ plan, colWidth = '180px' }) {

  return (
    <div
      className="flex flex-col"
      style={{ minWidth: colWidth }}
    >
      {/* ── Plan Name ─────────────────────────────── */}
      <div className="px-5 pt-0 pb-0">
        <p className="text-[10px] font-semibold font-sans uppercase tracking-widest text-slate-500 mb-1.5">
          Plan Name
        </p>
        {/* Boxed read-only display — styled to match the image's input look */}
        <div className="border border-slate-300 rounded-md px-3 py-2 bg-white text-sm font-sans text-slate-800 select-none truncate">
          {plan.name}
        </div>
      </div>

      {/* ── Price ──────────────────────────────────── */}
      <div className="px-5 pt-3 pb-0">
        <p className="text-[10px] font-semibold font-sans uppercase tracking-widest text-slate-500 mb-1.5">
          Price
        </p>
        <div className="flex items-center gap-2">
          {/* Boxed read-only price display */}
          <div className="border border-slate-300 rounded-md px-3 py-2 bg-white text-sm font-sans text-slate-800 select-none min-w-0 flex-1 truncate">
            {plan.price === 0 || plan.price === 'Free' ? 'Free' : Number(plan.price).toLocaleString()}
          </div>
          <span className="text-xs font-sans text-slate-500 whitespace-nowrap shrink-0">
            /month
          </span>
        </div>
      </div>

      <div className="pb-5" />
    </div>
  )
}
