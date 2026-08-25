import React from 'react'
import StatusBadge from './StatusBadge'

function dateToString(date) {
  if (!(date instanceof Date)) return date
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}

export default function TransactionRow({ row, columns, checked, onToggle }) {
  return (
    <tr className={`border-b border-slate-200 text-sm text-slate-700 last:border-none hover:bg-slate-50 ${checked ? 'bg-[#F1EDFB]/60' : ''}`}>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          className="accent-brand-purple"
          checked={checked}
          onChange={onToggle}
          aria-label={`Select transaction ${row.id}`}
        />
      </td>

      {columns.map((col) => {
        const value = row[col.key]

        return (
          <td key={col.key} className="px-4 py-3">
            {col.key === 'status' ? (
              <StatusBadge status={value} />
            ) : value instanceof Date ? (
              dateToString(value)
            ) : (
              value
            )}
          </td>
        )
      })}
    </tr>
  )
}
