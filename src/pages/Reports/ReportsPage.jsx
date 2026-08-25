import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  reportRanges,
  reportSummary,
  revenueSeries,
  seriesLegend,
  todaysRevenue,
} from './ReportsData'

/* ---------------------------------------------------------------- tokens */

const PURPLE = '#5E1B89'
const ORANGE = '#F4512C'
const INK = '#1E293B'
const MUTED = '#64748B'
const FAINT = '#94A3B8'
const LINE = '#E6EAF0'
const GRID = '#E2E8F0'


/* ---------------------------------------------------- auto-fitting labels */
/*
 * The stat labels must stay on one line at ANY window width. Rather than
 * hand-pick a font size and hope, this measures the real rendered text and
 * steps the size down until the longest one fits. Every label in a group
 * gets the same size, so the row stays visually even.
 */
const FIT = {
  label: { max: 11, min: 7 },
  note: { max: 12, min: 8.5 },
}

function useAutoFit(config) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const fit = () => {
      Object.entries(config).forEach(([group, { max, min }]) => {
        const els = root.querySelectorAll(`[data-fit="${group}"]`)
        if (!els.length) return
        const apply = (s) => els.forEach((el) => { el.style.fontSize = `${s}px` })
        const overflows = () =>
          Array.from(els).some((el) => el.scrollWidth > el.clientWidth + 0.5)

        let size = max
        apply(size)
        while (size > min && overflows()) {
          size -= 0.25
          apply(size)
        }
      })
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => ro.disconnect()
  }, [config])

  return ref
}


/* ----------------------------------------------------------- donut chart */

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const start = polar(cx, cy, r, endDeg)
  const end = polar(cx, cy, r, startDeg)
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

function Donut({ segments, total, caption }) {
  const sum = segments.reduce((a, s) => a + s.amount, 0)

  // No gaps — the ring is one continuous circle. Each arc except the last
  // overshoots by a hair so the next one paints over the seam; without this
  // you get a faint hairline where two arcs meet.
  const OVERLAP = 0.6
  let cursor = 0
  const arcs = segments.map((s, i) => {
    const sweep = (s.amount / sum) * 360
    const from = cursor
    const to = cursor + sweep + (i === segments.length - 1 ? 0 : OVERLAP)
    cursor += sweep
    return { ...s, from, to }
  })

  return (
    <div className="relative shrink-0 w-[140px] h-[140px] min-[1400px]:w-[158px] min-[1400px]:h-[158px]">
      <svg width="100%" height="100%" viewBox="0 0 160 160" style={{ display: 'block' }}>
        {arcs.map((a) => (
          <path
            key={a.label}
            d={arcPath(80, 80, 64, a.from, a.to)}
            fill="none"
            stroke={a.color}
            strokeWidth="26"
            strokeLinecap="butt"
          />
        ))}
      </svg>

      {/* centre label — laid out by flexbox, not by hand-guessed baselines */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-sans font-bold leading-none text-[24px] min-[1400px]:text-[27px]" style={{ color: INK }}>
          {total}
        </span>
        <span
          className="font-sans leading-none mt-[7px] min-[1400px]:mt-[8px] text-[8.5px] min-[1400px]:text-[9.5px]"
          style={{ letterSpacing: '1.6px', marginLeft: '1.6px', color: FAINT }}
        >
          {caption}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ line chart */

const PLOT = { left: 50, right: 1128, top: 16, bottom: 395, xStart: 59, xEnd: 1126 }

function LineChart({ data, hovered, onHover }) {
  const { axisMax, tickStep, labels, oneTime, subscriptions } = data
  const ticks = []
  for (let v = axisMax; v >= 0; v -= tickStep) ticks.push(v)

  const n = labels.length
  const xAt = (i) => (n === 1 ? PLOT.xStart : PLOT.xStart + (i * (PLOT.xEnd - PLOT.xStart)) / (n - 1))
  const yAt = (v) => PLOT.bottom - (v / axisMax) * (PLOT.bottom - PLOT.top)

  const toPath = (values) => values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(v)}`).join(' ')

  const series = [
    { key: 'oneTime', values: oneTime, color: ORANGE },
    { key: 'subscriptions', values: subscriptions, color: PURPLE },
  ]

  const handleMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    const svgX = ((e.clientX - box.left) / box.width) * 1128
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < n; i += 1) {
      const d = Math.abs(xAt(i) - svgX)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    }
    onHover(best)
  }

  const tipW = 168
  const tipX = hovered === null ? 0 : Math.min(Math.max(xAt(hovered) - tipW / 2, PLOT.left), PLOT.right - tipW)

  return (
    <svg viewBox="0 0 1128 432" className="w-full" style={{ display: 'block' }}>
      {/* horizontal gridlines + y labels */}
      {ticks.map((v) => (
        <g key={v}>
          <line x1={PLOT.left} x2={PLOT.right} y1={yAt(v)} y2={yAt(v)} stroke={GRID} strokeWidth="1" />
          <text
            x={38}
            y={yAt(v) + 4}
            textAnchor="end"
            fontFamily="Lato, sans-serif"
            fontSize="11"
            fill={FAINT}
          >
            {v === 0 ? '0' : `${v}k`}
          </text>
        </g>
      ))}

      {/* baseline */}
      <line x1={PLOT.left} x2={PLOT.right} y1={PLOT.bottom} y2={PLOT.bottom} stroke={INK} strokeWidth="2" />

      {/* hover guide */}
      {hovered !== null && (
        <line
          x1={xAt(hovered)}
          x2={xAt(hovered)}
          y1={PLOT.top}
          y2={PLOT.bottom}
          stroke={FAINT}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      )}

      {/* series */}
      {series.map((s) => (
        <path
          key={s.key}
          d={toPath(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}

      {series.map((s) =>
        s.values.map((v, i) => (
          <circle
            key={`${s.key}-${i}`}
            cx={xAt(i)}
            cy={yAt(v)}
            r={hovered === i ? 5.5 : 4}
            fill="#FFFFFF"
            stroke={s.color}
            strokeWidth="2"
          />
        )),
      )}

      {/* x labels */}
      {labels.map((label, i) => (
        <text
          key={label}
          x={xAt(i)}
          y={419}
          textAnchor="middle"
          fontFamily="Lato, sans-serif"
          fontSize="12"
          fill={MUTED}
        >
          {label}
        </text>
      ))}

      {/* tooltip */}
      {hovered !== null && (
        <g pointerEvents="none">
          <rect x={tipX} y={PLOT.top} width={tipW} height="64" rx="8" fill="#FFFFFF" stroke={GRID} />
          <text x={tipX + 12} y={PLOT.top + 20} fontFamily="Lato, sans-serif" fontSize="11" fontWeight="700" fill={INK}>
            {labels[hovered]}
          </text>
          <circle cx={tipX + 17} cy={PLOT.top + 34} r="4" fill={ORANGE} />
          <text x={tipX + 28} y={PLOT.top + 38} fontFamily="Lato, sans-serif" fontSize="11" fill={MUTED}>
            One-time
          </text>
          <text x={tipX + tipW - 12} y={PLOT.top + 38} textAnchor="end" fontFamily="Lato, sans-serif" fontSize="11" fontWeight="700" fill={INK}>
            {oneTime[hovered]}k
          </text>
          <circle cx={tipX + 17} cy={PLOT.top + 51} r="4" fill={PURPLE} />
          <text x={tipX + 28} y={PLOT.top + 55} fontFamily="Lato, sans-serif" fontSize="11" fill={MUTED}>
            Subscriptions
          </text>
          <text x={tipX + tipW - 12} y={PLOT.top + 55} textAnchor="end" fontFamily="Lato, sans-serif" fontSize="11" fontWeight="700" fill={INK}>
            {subscriptions[hovered]}k
          </text>
        </g>
      )}

      {/* pointer capture */}
      <rect
        x={PLOT.left}
        y={PLOT.top}
        width={PLOT.right - PLOT.left}
        height={PLOT.bottom - PLOT.top}
        fill="transparent"
        onMouseMove={handleMove}
        onMouseLeave={() => onHover(null)}
      />
    </svg>
  )
}

/* ------------------------------------------------------------ stat cells */

function SummaryCell({ label, value, note, accent }) {
  const color = accent === 'purple' ? PURPLE : accent === 'orange' ? ORANGE : INK
  return (
    <div className="flex-1 min-w-0 flex flex-col px-4 min-[1400px]:px-7 py-[30px]" style={{ borderLeft: `1px solid ${LINE}` }}>
      <span
        data-fit="label"
        className="block w-full font-sans uppercase leading-[1.2] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.label.max, letterSpacing: '1px', color: MUTED }}
      >
        {label}
      </span>
      <span className="font-sans font-bold leading-none mt-[22px]" style={{ fontSize: 38, color }}>
        {value}
      </span>
      <div className="flex-1" />
      <span
        data-fit="note"
        className="block w-full font-sans leading-[1.4] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.note.max, color: FAINT }}
      >
        {note}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ page */

export default function ReportsPage() {
  const fitRef = useAutoFit(FIT)
  const [range, setRange] = useState('Year')
  const [hovered, setHovered] = useState(null)

  const data = revenueSeries[range]

  const updatedAt = useMemo(
    () =>
      new Date().toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Manila',
      }),
    [],
  )

  const exportCsv = () => {
    const head = ['Period', 'One-time purchases (PHP k)', 'Subscriptions (PHP k)']
    const body = data.labels.map((l, i) => [l, data.oneTime[i], data.subscriptions[i]])
    const csv = [head, ...body].map((line) => line.map((c) => `"${c}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `lexweb-revenue-${range.toLowerCase()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="-m-6 bg-white min-h-[calc(100vh-68px)] overflow-x-hidden">
      {/* ================================================= reports title band */}
      <section style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="px-8 pt-[14px]">
          <span className="font-sans" style={{ fontSize: 12, color: ORANGE }}>
            &gt; Reports
          </span>
        </div>

        <div className="px-8 pt-[6px] pb-[16px] flex items-center gap-5">
          <h1 className="font-heading font-bold leading-none shrink-0" style={{ fontSize: 34, color: PURPLE }}>
            Reports
          </h1>

          <span className="self-stretch w-px shrink-0" style={{ background: '#CBD5E1' }} />

          <p className="font-sans min-w-0 truncate" style={{ fontSize: 13.5, color: MUTED }}>
            Revenue, transactions and subscription health across the platform ·{' '}
            <span style={{ letterSpacing: '0.6px', color: FAINT }}>UPDATED {updatedAt} GMT+8</span>
          </p>

          <div className="flex-1" />

          <div className="flex rounded-[6px] overflow-hidden shrink-0" style={{ border: `1px solid #CBD5E1` }}>
            {reportRanges.map((r, i) => {
              const active = range === r
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRange(r)
                    setHovered(null)
                  }}
                  className="font-sans h-[34px] px-[21px] transition-colors"
                  style={{
                    fontSize: 13.5,
                    background: active ? PURPLE : '#FFFFFF',
                    color: active ? '#FFFFFF' : INK,
                    borderLeft: i === 0 ? 'none' : `1px solid #CBD5E1`,
                  }}
                >
                  {r}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className="font-sans rounded-[6px] px-[20px] h-[36px] shrink-0 transition-colors hover:bg-slate-50"
            style={{ fontSize: 13.5, color: INK, border: `1px solid #CBD5E1` }}
          >
            Export
          </button>
        </div>
      </section>

      {/* ========================================================== kpi strip */}
      <section ref={fitRef} className="flex items-stretch" style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="w-[344px] min-[1400px]:w-[388px] shrink-0 flex items-center gap-[18px] min-[1400px]:gap-[24px] px-4 min-[1400px]:px-6 py-[30px]">
          <Donut
            segments={todaysRevenue.segments}
            total={todaysRevenue.total}
            caption={todaysRevenue.caption}
          />

          <div className="min-w-0">
            <p
              data-fit="label"
              className="block w-full font-sans uppercase leading-[1.2] whitespace-nowrap overflow-hidden"
              style={{ fontSize: FIT.label.max, letterSpacing: '1px', color: MUTED }}
            >
              Today&apos;s revenue
            </p>
            <div className="mt-[18px] space-y-[13px]">
              {todaysRevenue.segments.map((s) => (
                <div key={s.label} className="flex items-center gap-[10px]">
                  <span
                    className="w-[11px] h-[11px] rounded-[2px] shrink-0"
                    style={{ background: s.color }}
                  />
                  <span
                    className="font-sans whitespace-nowrap shrink-0"
                    style={{ fontSize: 13, color: INK, width: 86 }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="font-sans font-bold whitespace-nowrap shrink-0"
                    style={{ fontSize: 13, color: INK }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {reportSummary.map((cell) => (
          <SummaryCell key={cell.label} {...cell} />
        ))}
      </section>

      {/* =============================================== monthly revenue chart */}
      <section className="px-8 pt-[26px] pb-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold leading-none" style={{ fontSize: 22, color: INK }}>
              Monthly revenue overview
            </h2>
            <p
              className="font-sans uppercase leading-none mt-[13px]"
              style={{ fontSize: 11, letterSpacing: '1.6px', color: MUTED }}
            >
              {data.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-[26px] shrink-0 pb-[6px]">
            {seriesLegend.map((l) => (
              <div key={l.key} className="flex items-center gap-[9px]">
                <span className="w-[18px] h-[2px] rounded-full" style={{ background: l.color }} />
                <span className="font-sans" style={{ fontSize: 12.5, color: INK }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[16px]" style={{ borderTop: `1.5px solid ${INK}` }} />

        <div className="mt-[18px]">
          <LineChart data={data} hovered={hovered} onHover={setHovered} />
        </div>
      </section>
    </div>
  )
}
