import React from 'react'
import StatusBadge from './StatusBadge'

const tokens = {
  purple: '#5E1B89',
  line: '#E6EAF0',
}

function dateToString(date) {
  if (!(date instanceof Date)) return date
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}

function CheckBox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="w-[15px] h-[15px] rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
      style={{
        border: `1px solid ${checked ? tokens.purple : '#B6BECB'}`,
        background: checked ? tokens.purple : '#FFFFFF',
      }}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.2L3.8 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export default function TransactionRow({ row, columns, checked, onToggle }) {
  return (
    <tr
      className="transition-colors hover:bg-slate-50/80"
      style={{
        borderBottom: `1px solid ${tokens.line}`,
        background: checked ? 'rgba(94,27,137,0.04)' : 'transparent',
      }}
    >
      <td className="align-middle h-[60px] w-[44px]" onClick={(e) => e.stopPropagation()}>
        <CheckBox checked={checked} onChange={onToggle} label={`Select transaction ${row.id}`} />
      </td>

      {columns.map((col) => {
        const value = row[col.key]

        return (
          <td
            key={col.key}
            className={`align-middle text-xs pr-4 ${col.key === 'client' ? 'font-bold text-slate-900' : 'text-slate-700'}`}
          >
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