import React from 'react'
import { ChevronDown } from 'lucide-react'

const CONTROL = 'w-full rounded-lg border border-[#CAC8C9] bg-[#E6E4E6] px-3.5 py-2.5 text-sm text-slate-600 placeholder-slate-400 transition-colors focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-purple disabled:cursor-not-allowed'

export function Field({ label, htmlFor, children, className = '' }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-slate-800">
        {label}
      </label>
      {children}
    </div>
  )
}

export function TextInput({ label, id, className = '', suffix, ...props }) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="relative">
        <input id={id} className={`${CONTROL} ${suffix ? 'pr-14' : ''}`} {...props} />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </Field>
  )
}

export function SelectInput({ label, id, options = [], className = '', ...props }) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="relative">
        <select id={id} className={`${CONTROL} appearance-none pr-10`} {...props}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </Field>
  )
}

export function TextArea({ label, id, rows = 4, className = '', ...props }) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <textarea id={id} rows={rows} className={`${CONTROL} resize-none`} {...props} />
    </Field>
  )
}

export { CONTROL as controlStyles }
