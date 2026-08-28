import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CopywritesTab from './CopywritesTab'
import PhotosTab from './PhotosTab'
import LogosTab from './LogosTab'

const ASSET_TABS = ['Logos', 'Copywrites', 'Photos']

export default function Assets() {
  const [activeTab, setActiveTab] = useState('Logos')

  // Rendered inside each tab's own toolbar so the tab owns its filter controls
  const tabsSlot = (
    <div className="flex items-center gap-3" role="tablist" aria-label="Asset types">
      {ASSET_TABS.map((tab) => {
        const isActive = activeTab === tab

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-6 py-2 text-base transition-colors ${isActive
                ? 'bg-brand-orange font-bold text-white shadow-sm'
                : 'font-semibold text-slate-900 hover:text-brand-orange'
              }`}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="-m-6 bg-white min-h-[calc(100vh-68px)] flex flex-col font-sans px-6 pt-6 pb-12 w-full space-y-6">
      {/* Breadcrumb + Title */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-xs mb-2" style={{ color: '#F4512C' }}>
            <Link to="/" className="hover:underline">
              &gt; Dashboard
            </Link>
            <span>&gt;</span>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <span>&gt;</span>
            <span className="font-semibold" style={{ color: '#5E1B89' }}>Assets</span>
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-purple">
            Assets
          </h1>
          <p className="text-xs text-slate-500 leading-normal mt-1.5">
            Manage brand logos, copywrites, and stock photography.
          </p>
        </div>
      </div>

      {activeTab === 'Logos' ? (
        <LogosTab tabsSlot={tabsSlot} />
      ) : activeTab === 'Copywrites' ? (
        <CopywritesTab tabsSlot={tabsSlot} />
      ) : activeTab === 'Photos' ? (
        <PhotosTab tabsSlot={tabsSlot} />
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 pb-4">
            {tabsSlot}
          </div>
          <div className="rounded-2xl bg-white py-24 text-center text-sm text-slate-500 ring-1 ring-slate-200/70">
            The <strong>{activeTab}</strong> tab is owned by another feature branch.
          </div>
        </div>
      )}
    </div>
  )
}
