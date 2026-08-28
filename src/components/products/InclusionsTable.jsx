import React from 'react'

/**
 * InclusionsTable — renders the feature-row grid across all plan columns.
 *
 * Layout:
 *   - "INCLUSIONS" purple header band (full-width bar with sticky pinned label)
 *   - One row per feature, spanning label col + one cell per plan
 *   - Purple filled checkmark if plan includes feature, gray dash if not
 *   - Horizontally scrollable container; row label col is sticky-left
 *
 * Props:
 *   features   [{ id, label }]
 *   plans      [{ id, features: { [featureId]: boolean } }]
 *   colWidth   string — min-width of each plan column (must match PlanColumn)
 *   labelWidth string — min-width of the feature-label column
 */
export default function InclusionsTable({
  features,
  plans,
  colWidth = '180px',
  labelWidth = '320px',
}) {
  return (
    <div className="w-full">
      {/* ── INCLUSIONS Header Band (Full width purple band + sticky left text) ── */}
      <div className="bg-purple-100 border-y border-purple-200">
        <div
          className="sticky left-0 z-20 px-5 py-2.5 bg-purple-100 border-r border-purple-200/50 overflow-hidden"
          style={{ minWidth: labelWidth, width: labelWidth }}
        >
          <span className="text-[11px] font-bold font-sans uppercase tracking-[2px] text-brand-purple">
            Inclusions
          </span>
        </div>
      </div>

      {/* ── Feature Rows ────────────────────────────────────────── */}
      <div>
        {features.map((feature, rowIdx) => {
          const rowBgClass = rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'

          return (
            <div
              key={feature.id}
              className={`flex items-stretch border-b border-slate-100 last:border-b-0 ${rowBgClass}`}
            >
              {/* Feature label — sticky left */}
              <div
                className={`sticky left-0 z-20 flex items-center px-5 py-3.5 shrink-0 overflow-hidden border-r border-slate-100 ${rowBgClass}`}
                style={{ minWidth: labelWidth, width: labelWidth }}
              >
                <span className="text-sm font-sans text-slate-700 leading-snug line-clamp-2">
                  {feature.label}
                </span>
              </div>

              {/* Per-plan cell */}
              {plans.map((plan) => {
                const included = Boolean(plan.features?.[feature.id])
                return (
                  <div
                    key={plan.id}
                    className="flex items-center justify-center py-3.5 shrink-0"
                    style={{ minWidth: colWidth, width: colWidth }}
                  >
                    {included ? (
                      // Purple filled checkmark circle
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-purple shrink-0"
                        aria-label="Included"
                      >
                        {/* Checkmark SVG */}
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    ) : (
                      // Gray dash for not included
                      <span
                        className="block w-5 h-0.5 bg-slate-300 rounded-full"
                        aria-label="Not included"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}