import React from 'react'

/**
 * InclusionsTable — renders the feature-row grid across all plan columns.
 *
 * Layout:
 *   - "INCLUSIONS" purple header band (full width)
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
  labelWidth = '260px',
}) {
  return (
    <div className="w-full">
      {/* ── INCLUSIONS Header Band ─────────────────────────────── */}
      <div className="bg-brand-purple/10 border-y border-brand-purple/20 px-5 py-2.5">
        <span className="text-[11px] font-bold font-sans uppercase tracking-[2px] text-brand-purple">
          Inclusions
        </span>
      </div>

      {/* ── Feature Rows ────────────────────────────────────────── */}
      <div>
        {features.map((feature, rowIdx) => (
          <div
            key={feature.id}
            className={`flex items-stretch border-b border-slate-100 last:border-b-0 ${
              rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
            }`}
          >
            {/* Feature label — sticky left so it stays visible on h-scroll */}
            <div
              className="sticky left-0 z-10 flex items-center px-5 py-3.5 shrink-0 bg-inherit"
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
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-purple"
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
        ))}
      </div>
    </div>
  )
}
