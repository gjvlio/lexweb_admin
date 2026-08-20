import React from 'react'

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
