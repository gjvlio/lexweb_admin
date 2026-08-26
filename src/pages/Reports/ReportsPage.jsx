import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className="relative shrink-0 w-[118px] h-[118px] min-[1400px]:w-[132px] min-[1400px]:h-[132px]">
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
        <span className="font-sans font-bold leading-none" style={{ fontSize: 22, color: INK }}>
          {total}
        </span>
        <span
          className="font-sans leading-none mt-[6px] text-[10px] uppercase"
          style={{ letterSpacing: '1.2px', marginLeft: '1.2px', color: FAINT }}
        >
          {caption}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ line chart */
/*
 * The plot box is deliberately wide and short: the page never scrolls, so the
 * chart has to live inside whatever height is left after the bands above it.
 * The SVG scales uniformly (no preserveAspectRatio="none" stretching), so the
 * axis labels keep their real size at every window width.
 */
const PLOT = { left: 50, right: 1128, top: 12, bottom: 300, xStart: 59, xEnd: 1126 }
const VIEW_H = 340

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
    <svg
      viewBox={`0 0 1128 ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full max-h-full"
      style={{ display: 'block', aspectRatio: `1128 / ${VIEW_H}`, margin: '0 auto' }}
    >
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
          y={VIEW_H - 13}
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
    <div
      className="flex-1 min-w-[140px] flex flex-col justify-center px-4 py-3 sm:py-0 min-[1400px]:px-7 border-t sm:border-t-0 sm:border-l first:border-l-0"
      style={{ borderColor: LINE }}
    >
      <span
        data-fit="label"
        className="block w-full font-sans uppercase leading-[1.2] whitespace-nowrap overflow-hidden"
        style={{ fontSize: FIT.label.max, letterSpacing: '1px', color: MUTED }}
      >
        {label}
      </span>
      <span className="font-sans font-bold leading-none mt-2 sm:mt-[15px]" style={{ fontSize: 28, color }}>
        {value}
      </span>
      <span
        data-fit="note"
        className="block w-full font-sans leading-[1.4] mt-2 sm:mt-[18px] whitespace-nowrap overflow-hidden"
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
    <div className="-m-6 bg-white h-[calc(100vh-68px)] overflow-hidden flex flex-col font-sans">
      {/* ================================================= reports title band */}
      <section className="shrink-0" style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="px-4 sm:px-8 pt-[18px]">
          <Link
            to="/reports"
            className="font-sans hover:underline cursor-pointer block"
            style={{ fontSize: 12, color: ORANGE }}
          >
            &gt; Reports
          </Link>
        </div>

        <div className="px-4 sm:px-8 pt-[10px] pb-[16px] flex flex-wrap items-center gap-x-5 gap-y-3">
          <h1 className="font-heading font-bold leading-none shrink-0" style={{ fontSize: 34, color: PURPLE }}>
            Reports
          </h1>

          <span className="hidden lg:block self-stretch w-px shrink-0" style={{ background: '#CBD5E1' }} />

          <p className="font-sans min-w-0 truncate text-xs leading-[20px]" style={{ color: MUTED }}>
            Revenue, transactions and subscription health across the platform ·{' '}
            <span style={{ letterSpacing: '0.6px', color: FAINT }}>UPDATED {updatedAt} GMT+8</span>
          </p>

          <div className="flex-1" />

          <div className="flex rounded-[6px] overflow-hidden shrink-0 border border-slate-300">
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
                  className="h-[34px] px-3 sm:px-[18px] transition-colors cursor-pointer text-xs font-semibold"
                  style={{
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
            className="font-sans rounded-[6px] px-3.5 sm:px-[18px] h-[36px] shrink-0 transition-colors hover:bg-slate-50 cursor-pointer"
            style={{ fontSize: 13.5, color: INK, border: `1px solid #CBD5E1` }}
          >
            Export
          </button>
        </div>
      </section>

      {/* ========================================================== kpi strip */}
      <section
        ref={fitRef}
        className="shrink-0 flex flex-col lg:flex-row items-stretch"
        style={{ borderBottom: `1px solid ${LINE}` }}
      >
        <div className="w-full lg:w-[320px] min-[1400px]:w-[350px] shrink-0 flex items-center gap-[18px] px-4 sm:px-8 lg:px-6 py-[18px]">
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
            <div className="mt-[14px] space-y-[11px]">
              {todaysRevenue.segments.map((s) => (
                <div key={s.label} className="flex items-center gap-[10px]">
                  <span
                    className="w-[11px] h-[11px] rounded-[2px] shrink-0"
                    style={{ background: s.color }}
                  />
                  <span
                    className="font-sans text-xs whitespace-nowrap shrink-0"
                    style={{ color: INK, width: 86 }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="font-sans text-xs font-bold whitespace-nowrap shrink-0"
                    style={{ color: INK }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-2 sm:flex border-t lg:border-t-0 border-slate-200">
          {reportSummary.map((cell) => (
            <SummaryCell key={cell.label} {...cell} />
          ))}
        </div>
      </section>

      {/* =============================================== monthly revenue chart */}
      <section className="px-4 sm:px-8 pt-[18px] pb-6 flex-1 min-h-0 flex flex-col">
        <div className="flex items-end justify-between gap-6 shrink-0">
          <div>
            <h2 className="font-heading font-bold leading-none" style={{ fontSize: 22, color: INK }}>
              Monthly revenue overview
            </h2>
            <p
              className="font-sans uppercase leading-none mt-[11px]"
              style={{ fontSize: 11, letterSpacing: '1.6px', color: MUTED }}
            >
              {data.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-[26px] shrink-0 pb-[4px]">
            {seriesLegend.map((l) => (
              <div key={l.key} className="flex items-center gap-[9px]">
                <span className="w-[18px] h-[2px] rounded-full" style={{ background: l.color }} />
                <span className="font-sans text-xs" style={{ color: INK }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[14px] shrink-0" style={{ borderTop: `1.5px solid ${INK}` }} />

        {/* the chart takes whatever height is left — the page itself never scrolls */}
        <div className="mt-[12px] flex-1 min-h-0">
          <LineChart data={data} hovered={hovered} onHover={setHovered} />
        </div>
      </section>
    </div>
  )
}
