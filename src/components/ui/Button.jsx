import React from 'react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-lexmeet-gradient text-white shadow-md shadow-brand-orange/20 hover:opacity-95 focus:ring-brand-orange',
    orange: 'bg-brand-orange text-white hover:bg-brand-orange-light focus:ring-brand-orange shadow-xs',
    purple: 'bg-brand-purple text-white hover:bg-brand-purple-soft focus:ring-brand-purple shadow-xs',
    outline: 'bg-transparent border border-slate-300 text-black hover:bg-slate-100 focus:ring-slate-400',
    ghost: 'bg-transparent hover:bg-slate-100 text-black focus:ring-slate-400',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${
        sizeStyles[size] || sizeStyles.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
