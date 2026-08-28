import React from 'react'
import { ChevronDown } from 'lucide-react'

const STATUS_OPTIONS = ['Published', 'Draft', 'Archived']

/** Gradient status pill with an inline dropdown, shown beside a details modal title. */
export default function StatusSelect({ value, onChange, options = STATUS_OPTIONS }) {
  return (
    <div className="relative inline-flex items-center rounded-lg bg-lexmeet-gradient shadow-sm">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Asset status"
        className="cursor-pointer appearance-none bg-transparent py-1.5 pl-4 pr-9 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/60 rounded-lg"
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-white" />
    </div>
  )
}

export { STATUS_OPTIONS }
