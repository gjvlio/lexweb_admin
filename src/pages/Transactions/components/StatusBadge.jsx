import React from 'react'

const STATUS_STYLES = {
  Paid: 'bg-brand-orange text-white',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-slate-200 text-slate-700',
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate-200 text-slate-700'

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  )
}
