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
      <span
        className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] w-[90px] text-center"
        style={{ background: '#F1F5F9', color: '#64748B' }}
      >
        Refunded
      </span>
    )
  }

  if (status === 'Pending') {
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] w-[90px] text-center"
        style={{ background: '#F1F5F9', color: '#64748B' }}
      >
        Pending
      </span>
    )
  }

  if (status === 'Failed') {
    return (
      <span
        className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] text-white w-[90px] text-center"
        style={{ background: tokens.purple }}
      >
        Failed
      </span>
    )
  }

  // Paid (default)
  return (
    <span
      className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] w-[90px] text-center"
      style={{ background: 'rgba(94,27,137,0.10)', color: tokens.purple }}
    >
      Paid
    </span>
  )
}