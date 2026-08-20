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
    <div className="w-full space-y-5 pb-12 font-sans">
      {/* Breadcrumb */}
      <p className="text-xs font-semibold text-brand-orange">
        <Link to="/products" className="hover:underline">
          &gt; Products
        </Link>{' '}
        &gt; <span>Assets</span>
      </p>

      <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-purple">
        Assets
      </h1>

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
