import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import PlanColumn from '../../components/products/PlanColumn'
import InclusionsTable from '../../components/products/InclusionsTable'

// ─────────────────────────────────────────────────────────────────────────────
// Static mock data (swap for API calls when backend is ready)
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  { id: 'f1',  label: 'Own Law Firm Logo Upload with Tagline' },
  { id: 'f2',  label: 'Custom Domain Mapping' },
  { id: 'f3',  label: 'Client Inquiry Form' },
  { id: 'f4',  label: 'Practice Area Pages' },
  { id: 'f5',  label: 'Attorney / Team Member Profiles' },
  { id: 'f6',  label: 'Blog / News Section' },
  { id: 'f7',  label: 'Document Template Library' },
  { id: 'f8',  label: 'Online Consultation Booking' },
  { id: 'f9',  label: 'Client Portal Access' },
  { id: 'f10', label: 'Priority Email Support' },
  { id: 'f11', label: 'Analytics Dashboard' },
  { id: 'f12', label: 'Dedicated Account Manager' },
]

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    billingPeriod: 'month',
    tierBarWidth: '20%',
    features: {
      f1: false, f2: false, f3: true,  f4: true,
      f5: true,  f6: true,  f7: false, f8: false,
      f9: false, f10: false, f11: false, f12: false,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1000,
    billingPeriod: 'month',
    tierBarWidth: '55%',
    features: {
      f1: true,  f2: true,  f3: true,  f4: true,
      f5: true,  f6: false, f7: false, f8: true,
      f9: false, f10: false, f11: true, f12: false,
    },
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 2000,
    billingPeriod: 'month',
    tierBarWidth: '100%',
    features: {
      f1: true,  f2: true,  f3: true,  f4: true,
      f5: true,  f6: true,  f7: true,  f8: true,
      f9: true,  f10: true, f11: true, f12: true,
    },
  }, 
  {
    id: 'professional',
    name: 'Professional',
    price: 3500,
    billingPeriod: 'month',
    tierBarWidth: '75%',
    features: {
      f1: true,  f2: true,  f3: true,  f4: true,
      f5: true,  f6: true,  f7: true,  f8: true,
      f9: true,  f10: true, f11: true, f12: false,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 5000,
    billingPeriod: 'month',
    tierBarWidth: '100%',
    features: {
      f1: true,  f2: true,  f3: true,  f4: true,
      f5: true,  f6: true,  f7: true,  f8: true,
      f9: true,  f10: true, f11: true, f12: true,
    },
  },
]

// Column layout constants — shared between PlanColumn and InclusionsTable
const COL_WIDTH   = '200px'
const LABEL_WIDTH = '340px'

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Subscriptions() {
  const [searchQuery, setSearchQuery] = useState('')

  // Client-side plan filter by name
  const filteredPlans = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return PLANS
    return PLANS.filter((p) => p.name.toLowerCase().includes(q))
  }, [searchQuery])

  // Placeholder handlers — modal wiring is out of scope on this page
  const handleEditPlan = (planId) => {
    console.log('[Subscriptions] Edit plan clicked — plan id:', planId)
  }

  const handleAddPlan = () => {
    console.log('[Subscriptions] Add plan clicked — Add flow is out of scope on this page')
  }

  const handleAllInclusions = () => {
    console.log('[Subscriptions] All Inclusions filter clicked')
  }

  return (
    <div className="space-y-5">
      {/* ── Page Header Row ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Left: Breadcrumb + H1 */}
        <div className="space-y-1.5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans">
            <Link
              to="/products"
              className="text-brand-orange hover:underline font-medium"
            >
              Products
            </Link>
            <span className="text-slate-400">&rsaquo;</span>
            <span className="text-brand-purple font-semibold">Subscriptions</span>
          </nav>

          {/* H1 */}
          <h1 className="text-3xl font-heading font-bold text-brand-purple leading-tight">
            Subscriptions
          </h1>
        </div>

        {/* Right: Search + Add button */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="subscriptions-search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search subscription plans"
              className="w-56 md:w-72 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm font-sans text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
            />
          </div>

          {/* Add button — placeholder, modal is out of scope */}
          <Button
            variant="orange"
            size="md"
            className="rounded-xl font-semibold whitespace-nowrap"
            onClick={handleAddPlan}
            id="add-plan-btn"
          >
            + Add
          </Button>
        </div>
      </div>

      {/* ── Secondary Toolbar ──────────────────────────────────────── */}
      <div>
        <Button
          variant="orange"
          size="md"
          className="rounded-xl font-semibold"
          onClick={handleAllInclusions}
          id="all-inclusions-btn"
        >
          All inclusions
        </Button>
      </div>

      {/* ── Plan Comparison Card ───────────────────────────────────── */}
      <Card className="p-0 overflow-hidden">
        {/*
          overflow-x-auto: scroll kicks in on narrow viewports.
          The single inner wrapper carries the minWidth for ALL three sections
          (header row, inclusions, edit footer) so they always share one width
          authority — adding any number of plan columns just scales minWidth and
          every section stretches together automatically.
        */}
        <div className="overflow-x-auto overflow-y-visible">
          <div
            style={{
              minWidth: `calc(${LABEL_WIDTH} + ${filteredPlans.length} * ${COL_WIDTH})`,
            }}
          >
            {/* ── Plan header row: spacer + one PlanColumn per plan ─── */}
            <div className="flex">
              {/* Label-column spacer — width matches InclusionsTable label col */}
              <div
                className="shrink-0"
                style={{ width: LABEL_WIDTH, minWidth: LABEL_WIDTH }}
              />

              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="shrink-0  flex flex-col"
                    style={{ width: COL_WIDTH, minWidth: COL_WIDTH }}
                  >
                    <PlanColumn plan={plan} colWidth={COL_WIDTH} />
                  </div>
                ))
              ) : (
                /* Empty state when search yields no results */
                <div className="flex-1 flex items-center justify-center py-16 text-sm font-sans text-slate-400">
                  No plans match &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* ── Inclusions rows ───────────────────────────────────── */}
            {filteredPlans.length > 0 && (
              <InclusionsTable
                features={FEATURES}
                plans={filteredPlans}
                colWidth={COL_WIDTH}
                labelWidth={LABEL_WIDTH}
              />
            )}

            {/* ── Edit button footer row (one button per plan col) ──── */}
            {filteredPlans.length > 0 && (
              <div className="flex border-t border-slate-200">
                {/* Label-column spacer */}
                <div
                  className="shrink-0"
                  style={{ width: LABEL_WIDTH, minWidth: LABEL_WIDTH }}
                />
                {filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="shrink-0  px-5 py-4 flex justify-center"
                    style={{ width: COL_WIDTH, minWidth: COL_WIDTH }}
                  >
                    <Button
                      variant="orange"
                      size="md"
                      className="w-full justify-center rounded-lg text-sm font-semibold"
                      onClick={() => handleEditPlan(plan.id)}
                      aria-label={`Edit plan ${plan.name}`}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
