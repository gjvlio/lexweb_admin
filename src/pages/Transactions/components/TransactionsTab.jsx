import React from 'react'

const tokens = {
  purple: '#5E1B89',
  ink: '#1E293B',
}

export default function TransactionsTab({ name, isActive, isFirst = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[34px] px-3 sm:px-[18px] transition-colors cursor-pointer text-xs font-semibold"
      style={{
        background: isActive ? tokens.purple : '#FFFFFF',
        color: isActive ? '#FFFFFF' : tokens.ink,
        borderLeft: isFirst ? 'none' : '1px solid #CBD5E1',
      }}
    >
      {name}
    </button>
  )
}