import React from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Search, Plus } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Welcome Scaffolding Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-lexmeet-gradient p-10 text-white shadow-xl">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
            LEXWEB ADMIN — Global Design System
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
            Design System & Layout Scaffolding
          </h1>
          <p className="text-white/90 text-sm leading-relaxed font-sans">
            Configured with 1440px canvas bounds, global header/sidebar navigation, custom brand palette, and typography rules.
          </p>
        </div>
      </div>

      {/* Button & Form Controls Showcase from docs/Design System.png */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Button Variants Showcase */}
        <Card className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">
            Button Component Variants
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">LexMeet Gradient</Button>
            <Button variant="orange">Striking Orange</Button>
            <Button variant="purple">Lawful Purple</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="primary" size="sm">Small Primary</Button>
            <Button variant="orange" size="sm">Small Orange</Button>
            <Button variant="purple" size="sm">Small Purple</Button>
            <Button variant="outline" size="sm">Small Outline</Button>
          </div>
        </Card>

        {/* Input & Search Controls Showcase */}
        <Card className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">
            Input & Action Control Variants
          </h2>

          <div className="space-y-4">
            {/* Input Field */}
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Standard Input</label>
              <input
                type="text"
                placeholder="examplename"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
              />
            </div>

            {/* Select Dropdown */}
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Select Dropdown</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-purple">
                <option>Example Option 1</option>
                <option>Example Option 2</option>
              </select>
            </div>

            {/* Search Input with Add Action */}
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Search & Action Bar</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <Button variant="orange" size="md">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Brand Color Tokens Reference */}
      <Card className="space-y-6">
        <h2 className="text-xl font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">
          Brand Palette & Design Tokens
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-12 rounded-lg bg-[#F4512C]" />
            <div className="font-heading font-bold text-sm text-slate-900">Striking Orange</div>
            <div className="text-xs font-mono text-slate-500">#F4512C</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-12 rounded-lg bg-[#FF7F4D]" />
            <div className="font-heading font-bold text-sm text-slate-900">Light Orange</div>
            <div className="text-xs font-mono text-slate-500">#FF7F4D</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-12 rounded-lg bg-[#5E1B89]" />
            <div className="font-heading font-bold text-sm text-slate-900">Lawful Purple</div>
            <div className="text-xs font-mono text-slate-500">#5E1B89</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-12 rounded-lg bg-[#9D71BC]" />
            <div className="font-heading font-bold text-sm text-slate-900">Soft Purple</div>
            <div className="text-xs font-mono text-slate-500">#9D71BC</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="h-12 rounded-lg bg-lexmeet-gradient" />
            <div className="font-heading font-bold text-sm text-slate-900">LexMeet Gradient</div>
            <div className="text-xs text-slate-500">Orange → Purple</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
