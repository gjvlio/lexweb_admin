import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Search,
  CheckCheck,
  User,
  Settings,
  Shield,
  FileText,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import {
  IconLexLogo,
  IconNotification,
  IconProfile,
} from '../ui/Icons'

export default function Header({
  title,
  user = { name: 'M. Bautista', role: 'Superadmin' },
  onToggleSidebar,
}) {
  const location = useLocation()

  // Modal toggle states
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Auto-generate section title from location matching main branch logic
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

  // Notification Mock Data State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Law Firm Registered',
      desc: 'Valderrama & Associates submitted tenant onboarding documents.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Subscription Upgraded',
      desc: 'Cruz & Partners Law Firm upgraded to Advanced Enterprise Plan.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Custom Domain Alert',
      desc: '2 custom domains awaiting DNS verification status.',
      time: '3h ago',
      unread: true,
    },
    {
      id: 4,
      title: 'Sales Milestone Reached',
      desc: 'Platform monthly gross sales volume crossed ₱250,700.',
      time: '1d ago',
      unread: false,
    },
  ])

  // Refs for click outside handling
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  // Click outside event listener to close modals gracefully
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-[68px] w-full bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Brand Branding — LEXWEB ADMIN in Lawful Purple (#5E1B89) + Original Dynamic Page Indicator */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group">
          <IconLexLogo className="w-[25px] h-[25px] shrink-0 group-hover:scale-105 transition-transform" />
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-[21px] tracking-tight text-[#5E1B89] leading-none">
              LEXWEB ADMIN
            </span>
            {sectionTitle && (
              <span className="font-sans font-normal text-[12px] tracking-[2px] text-black uppercase leading-none border-l border-slate-300 pl-3">
                {sectionTitle}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Right Action Icons & Controls */}
      <div className="flex items-center gap-5">
        
        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search domains, lawfirms..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-[#5E1B89] focus:ring-1 focus:ring-[#5E1B89] transition-all font-sans"
          />
        </div>

        {/* 1. Notification Bell Button with Interactive Modal Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev)
              setShowProfileModal(false)
            }}
            className="relative p-1 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center text-black cursor-pointer"
            title="Notifications"
          >
            <IconNotification className="w-[25px] h-[25px]" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#F4512C] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Interactive Notifications Modal */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-sm text-[#5E1B89]">
                    System Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="bg-[#F4512C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-[#5E1B89] hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 hover:bg-slate-50/80 transition-colors flex gap-3 ${
                      item.unread ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        item.unread ? 'bg-[#F4512C]' : 'bg-slate-300'
                      }`}
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-black leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-black font-sans">{item.time}</span>
                      </div>
                      <p className="text-xs text-black leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <Link
                  to="/reports"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-[#5E1B89] hover:text-[#F4512C] transition-colors inline-flex items-center gap-1"
                >
                  View All System Logs <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 2. Admin User Profile (M. Bautista) with Interactive Account Info Modal Popover */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileModal((prev) => !prev)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2.5 pl-2 border-l border-slate-200 hover:opacity-80 transition-opacity text-left cursor-pointer"
            title="Account Info"
          >
            <IconProfile className="w-[25px] h-[25px]" />
            <div className="hidden lg:block">
              <h4 className="text-xs font-bold text-black leading-tight">{user.name}</h4>
              <span className="text-[10px] font-semibold text-black block">{user.role}</span>
            </div>
          </button>

          {/* Interactive Account Info Modal Popover */}
          {showProfileModal && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
              {/* Header Info */}
              <div className="p-5 bg-gradient-to-r from-[#5E1B89] to-[#9D71BC] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center font-bold text-lg text-white shrink-0">
                    MB
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base leading-tight">
                      Atty. Marlon Bautista
                    </h3>
                    <p className="text-xs text-white/80 font-sans mt-0.5">
                      m.bautista@lexmeet.com
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-md">
                      Superadmin • Platform Director
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Quick Details & Made Up Settings */}
              <div className="p-4 space-y-3 text-xs text-black">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-black font-semibold uppercase tracking-wider text-[9px]">
                      TENANT NODE
                    </span>
                    <span className="font-bold text-emerald-600">Active • Region PH-01</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-black font-semibold uppercase tracking-wider text-[9px]">
                      LAST LOGIN
                    </span>
                    <span className="font-medium text-black">Today, 08:42 AM</span>
                  </div>
                </div>

                {/* Account Navigation Links */}
                <div className="space-y-1 pt-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-black hover:bg-slate-100 transition-colors font-medium text-xs text-left">
                    <User className="w-4 h-4 text-[#5E1B89]" />
                    <span>Primary Account Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-black hover:bg-slate-100 transition-colors font-medium text-xs text-left">
                    <Settings className="w-4 h-4 text-[#5E1B89]" />
                    <span>System Settings & Preferences</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-black hover:bg-slate-100 transition-colors font-medium text-xs text-left">
                    <Shield className="w-4 h-4 text-[#5E1B89]" />
                    <span>Security & 2FA Auth</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-black hover:bg-slate-100 transition-colors font-medium text-xs text-left">
                    <FileText className="w-4 h-4 text-[#5E1B89]" />
                    <span>Platform Audit Logs</span>
                  </button>
                </div>
              </div>

              {/* Log Out Action Button */}
              <div className="p-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => {
                    alert('Logging out of LexMeet Admin Platform...')
                    setShowProfileModal(false)
                  }}
                  className="w-full bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs"
                >
                  <LogOut className="w-4 h-4" /> Sign Out / Log Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
