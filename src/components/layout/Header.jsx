import React from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Menu } from 'lucide-react'
import { IconLexLogo, IconNotification, IconProfile } from '../ui/Icons'

export default function Header({
  title,
  searchPlaceholder = 'Search domains, lawfirms',
  onSearch,
  user = { name: 'M. Bautista', role: 'Superadmin' },
  notificationsCount = 3,
  onToggleSidebar,
  className = '',
}) {
  const location = useLocation()

  // Auto-generate section title from location if not explicitly provided
  const getSectionTitle = () => {
    if (title) return title.toUpperCase()

    const path = location.pathname.toLowerCase()
    if (path === '/' || path === '/dashboard') return 'DASHBOARD'
    if (path === '/lawfirms') return 'LAWFIRMS'
    if (path === '/websites') return 'WEBSITES'
    if (path === '/products/subscriptions') return 'PRODUCTS - SUBSCRIPTIONS'
    if (path === '/products/templates') return 'PRODUCTS - TEMPLATES'
    if (path === '/products/assets') return 'PRODUCTS - ASSETS'
    if (path.startsWith('/products')) return 'PRODUCTS'
    if (path === '/orders') return 'ORDERS'
    if (path === '/transactions') return 'TRANSACTIONS'
    if (path === '/reports') return 'REPORTS'

    return path.replace('/', '').toUpperCase()
  }

  const sectionTitle = getSectionTitle()

  return (
    <header className={`h-[68px] w-full bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 ${className}`}>
      {/* Left: Mobile Toggle + Logo + Section Title Breadcrumb */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* LEXWEB ADMIN Logo & Breadcrumb Indicator */}
        <div className="flex items-center gap-3">
          <IconLexLogo className="w-[25px] h-[25px]" />
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-[21px] tracking-tight text-slate-900 leading-none">
              LEXWEB ADMIN
            </span>
            {sectionTitle && (
              <span className="font-sans font-normal text-[12px] tracking-[2px] text-slate-500 uppercase leading-none border-l border-slate-300 pl-3">
                {sectionTitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Search + Notification Icon + Profile Icon */}
      <div className="flex items-center gap-5">
        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
          />
        </div>

        {/* Notification Icon (25x25) */}
        <button
          className="relative p-1 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center"
          title="Notifications"
        >
          <IconNotification className="w-[25px] h-[25px]" />
          {notificationsCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-orange ring-2 ring-white" />
          )}
        </button>

        {/* Admin User Profile with Profile Icon (25x25) */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <IconProfile className="w-[25px] h-[25px]" />
          <div className="hidden lg:block text-left">
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{user.name}</h4>
            <span className="text-[10px] font-semibold text-slate-400 block">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
