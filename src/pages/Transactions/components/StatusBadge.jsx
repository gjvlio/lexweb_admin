import React from 'react'

const tokens = {
  purple: '#5E1B89',
  orange: '#F4512C',
  muted: '#64748B',
}

// Mirrors LawFirms' StatusCell: understated text for the neutral/default state,
// a light slate pill for "in progress" states, and a solid purple pill reserved
// for the negative/blocking state. "Paid" keeps the brand-orange fill since it's
// the metric worth drawing the eye to (same role orange plays as the accent in
// the Law Firms summary cards).
export default function StatusBadge({ status }) {
  if (status === 'Refunded') {
    return (
      <span className="font-sans uppercase text-[11px] tracking-[1.2px]" style={{ color: tokens.muted }}>
        Refunded
      </span>
    )
  }

  if (status === 'Pending') {
    return (
      <span className="inline-block font-sans uppercase rounded-[3px] px-[10px] py-[4px] text-[10px] tracking-[1.2px] bg-slate-100 text-slate-700">
        Pending
      </span>
    )
  }

  if (status === 'Failed') {
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] px-[10px] py-[4px] text-[10px] tracking-[1.2px] text-white"
        style={{ background: tokens.purple }}
      >
        Failed
      </span>
    )
  }

  // Paid (default)
  return (
    <span
      className="inline-block font-sans uppercase rounded-[3px] px-[10px] py-[4px] text-[10px] tracking-[1.2px] text-white"
      style={{ background: tokens.orange }}
    >
      Paid
    </span>
  )
}