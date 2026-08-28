import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Shared Assets modal shell — off-white panel with the LexMeet gradient eyebrow bar,
 * a close affordance, backdrop click + Escape dismissal and background scroll lock.
 *
 * Rendered through a portal on <body> so the backdrop always sits above the sticky
 * Header (z-30) and Navbar (z-40) instead of being trapped in <main>'s stacking context.
 */
export default function Modal({
  open,
  onClose,
  title,
  headerAccessory,
  footer,
  size = 'lg',
  children,
}) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    // Lock the page behind the modal, padding out the width the scrollbar leaves
    // behind so the Header does not jump sideways as the modal opens.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [open, onClose])

  if (!open) return null

  const sizeStyles = {
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-900/40 px-4 py-8 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Asset dialog'}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${sizeStyles[size] || sizeStyles.lg} overflow-hidden rounded-2xl bg-brand-bg shadow-2xl`}
      >
        {/* Gradient eyebrow bar */}
        <div className="h-[6px] w-full bg-lexmeet-gradient" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-lg p-1 text-black transition-colors hover:bg-slate-200/70 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-8 pb-7 pt-6">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <h2 className="font-heading text-2xl font-bold text-brand-purple">{title}</h2>
            {headerAccessory}
          </div>

          {children}

          {footer && <div className="mt-8 flex items-center justify-end gap-3">{footer}</div>}
        </div>
      </div>
    </div>,
    document.body,
  )
}
