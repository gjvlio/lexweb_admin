import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'
import {
  IconDashboard,
  IconLawfirms,
  IconWebsites,
  IconProducts,
  IconOrders,
  IconTransactions,
  IconReports,
} from '../ui/Icons'

export default function Navbar({ isCollapsed, onToggleCollapse, className = '' }) {
  const location = useLocation()
  const isProductsParentActive = location.pathname.startsWith('/products')
  const [isProductsOpen, setIsProductsOpen] = useState(isProductsParentActive)

  useEffect(() => {
    if (isProductsParentActive) {
      setIsProductsOpen(true)
    }
  }, [location.pathname])

  const mainNav = [
    { label: 'Dashboard', path: '/', icon: IconDashboard },
    { label: 'Law Firms', path: '/lawfirms', icon: IconLawfirms },
    { label: 'Websites', path: '/websites', icon: IconWebsites },
  ]

  const productSubNav = [
    { label: 'Subscriptions', path: '/products/subscriptions' },
    { label: 'Templates', path: '/products/templates' },
    { label: 'Assets', path: '/products/assets' },
  ]

  const bottomNav = [
    { label: 'Orders', path: '/orders', icon: IconOrders },
    { label: 'Transactions', path: '/transactions', icon: IconTransactions },
    { label: 'Reports', path: '/reports', icon: IconReports },
  ]

  return (
    <aside
      className={`bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 transition-all duration-200 h-full min-h-screen sticky top-0 z-40 ${isCollapsed ? 'w-20' : 'w-[230px]'
        } ${className}`}
    >
      <div>
        {/* Menu Header with Toggle (68px height matching Header) */}
        <div className="h-[68px] px-5 flex items-center justify-between border-b border-slate-100">
          <button
            onClick={onToggleCollapse}
            className="flex items-center gap-3 text-black hover:text-brand-purple transition-colors w-full font-sans font-medium text-sm"
            title={isCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
          >
            <Menu className="w-[25px] h-[25px] shrink-0 text-brand-purple" />
            {!isCollapsed && <span className="font-semibold text-black text-[16px]">Menu</span>}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Top Main Nav Items */}
          {mainNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-150 ${isActive
                    ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20 font-bold'
                    : 'text-black hover:text-black hover:bg-slate-100/80 font-normal'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
              >
                <Icon className="w-[25px] h-[25px] shrink-0" />
                {!isCollapsed && (
                  <span className="font-sans text-[16px] leading-none">{item.label}</span>
                )}
              </NavLink>
            )
          })}

          {/* Products NavLink with Landing Page & Sub-menu Accordion */}
          <div className="space-y-1">
            <div className="flex items-center justify-between group">
              <NavLink
                to="/products"
                onClick={() => setIsProductsOpen(true)}
                className={({ isActive }) =>
                  `flex-1 flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-150 ${isActive || isProductsParentActive
                    ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20 font-bold'
                    : 'text-black hover:text-black hover:bg-slate-100/80 font-normal'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
              >
                <IconProducts className="w-[25px] h-[25px] shrink-0" />
                {!isCollapsed && (
                  <span className="font-sans text-[16px] leading-none">Products</span>
                )}
              </NavLink>

              {!isCollapsed && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsProductsOpen((prev) => !prev)
                  }}
                  className="p-2 rounded-lg text-black hover:text-black hover:bg-slate-100 transition-colors ml-1"
                  title="Toggle Sub-menu"
                >
                  {isProductsOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Products Sub-menu Links */}
            {!isCollapsed && isProductsOpen && (
              <div className="ml-7 pl-3 border-l-2 border-slate-200/80 space-y-1 pt-1">
                {productSubNav.map((sub) => (
                  <NavLink
                    key={sub.path}
                    to={sub.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg font-sans text-[14px] transition-all ${isActive
                        ? 'text-brand-orange bg-brand-orange/10 font-bold'
                        : 'text-black hover:text-black hover:bg-slate-100 font-normal'
                      }`
                    }
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Nav Items */}
          {bottomNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-150 ${isActive
                    ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20 font-bold'
                    : 'text-black hover:text-black hover:bg-slate-100/80 font-normal'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
              >
                <Icon className="w-[25px] h-[25px] shrink-0" />
                {!isCollapsed && (
                  <span className="font-sans text-[16px] leading-none">{item.label}</span>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
