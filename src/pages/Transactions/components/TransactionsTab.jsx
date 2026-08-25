import React from 'react'

export default function TransactionsTab({ name, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 px-6 py-2.5 text-sm font-bold transition-colors ${
        isActive
          ? 'border-brand-orange bg-[#F1EDFB] text-brand-purple'
          : 'border-transparent bg-white text-brand-purple/70 hover:text-brand-purple'
      }`}
    >
      {name}
    </button>
  )
}
