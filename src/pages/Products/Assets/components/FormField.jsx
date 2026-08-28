import React from 'react'
import { ChevronDown } from 'lucide-react'

const CONTROL = 'w-full rounded-lg border border-[#CAC8C9] bg-[#E6E4E6] px-3.5 py-2.5 text-sm text-black placeholder-slate-400 transition-colors focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-purple disabled:cursor-not-allowed'

export function Field({ label, htmlFor, children, className = '' }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-black">
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
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-black">
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
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
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

export function FileInput({ label, id, className = '', ...props }) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="flex w-full items-center justify-between rounded-lg border border-[#CAC8C9] bg-[#E6E4E6] p-1 focus-within:border-brand-purple focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-purple">
        <input
          id={id}
          type="file"
          className="w-full cursor-pointer text-sm text-black file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-black hover:file:bg-slate-50 focus:outline-none"
          {...props}
        />
        <div className="pr-3 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
      </div>
    </Field>
  )
}

export function ColorInputList({ label, id, colors = [], onChange, className = '' }) {
  const addColor = () => onChange([...colors, '#FFFFFF'])
  const updateColor = (index, val) => {
    const newColors = [...colors]
    newColors[index] = val
    onChange(newColors)
  }

  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className={`${CONTROL} flex flex-wrap items-center gap-3`}>
        {colors.map((color, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs font-semibold text-black">{i + 1}.</span>
            <div className="flex h-8 w-24 items-center overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="h-10 w-10 cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="px-2 text-xs font-medium text-black uppercase">{color}</span>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addColor}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow-sm ring-1 ring-slate-300 hover:text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple"
          aria-label="Add color"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>
    </Field>
  )
}

export { CONTROL as controlStyles }
