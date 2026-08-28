import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter } from 'lucide-react'
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
 * Ported from the Law Firms page header — the stat labels stay on one line
 * at any window width by measuring the real rendered text and stepping the
 * size down until the longest one fits.
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

function Donut({ segments, total, caption, size = 'md' }) {
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

  // 'lg' mirrors the Dashboard Distribution Chart's donut (w-48 h-48 / 192px).
  const dims =
    size === 'lg'
      ? 'w-[176px] h-[176px] min-[1400px]:w-[192px] min-[1400px]:h-[192px]'
      : 'w-[140px] h-[140px] min-[1400px]:w-[158px] min-[1400px]:h-[158px]'
  const totalText = size === 'lg' ? 'text-[26px] min-[1400px]:text-[29px]' : 'text-[24px] min-[1400px]:text-[27px]'

  return (
    <div className={`relative shrink-0 ${dims}`}>
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
        <span className={`font-sans font-bold leading-none ${totalText}`} style={{ color: INK }}>
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

/* ------------------------------------------------------ revenue graph -----
 * Ported straight from the Dashboard page's "Overall Graph" card (same
 * gridline/tooltip/legend mechanics) but wired to the Reports page's own
 * content: revenueSeries[range] for the points and seriesLegend for the
 * series list, instead of Dashboard's hardcoded sales/sub/com datasets.
 */

function RevenueGraph({ data }) {
  const [hoveredSeries, setHoveredSeries] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, svgX: 0, label: '', items: [] })

  const { labels, axisMax } = data
  const series = seriesLegend.map((s) => ({ ...s, values: data[s.key] }))

  const startX = 85
  const endX = 985
  const getY = (val) => 200 - (val / axisMax) * 180
  const getX = (idx) => (labels.length <= 1 ? startX : startX + (idx / (labels.length - 1)) * (endX - startX))

  const ticks = [1, 0.75, 0.5, 0.25, 0].map((f) => Math.round(axisMax * f))

  // one invisible hit-column per timeframe, spanning the midpoints either
  // side of its point — hovering anywhere in that column (not just the
  // exact dot) surfaces the tooltip for every series at that index.
  const columns = labels.map((_, i) => {
    const cx = getX(i)
    const left = i === 0 ? startX : (getX(i - 1) + cx) / 2
    const right = i === labels.length - 1 ? endX : (cx + getX(i + 1)) / 2
    return { x: left, width: right - left }
  })

  const handleColumnHover = (e, idx) => {
    const container = e.currentTarget.closest('.graph-container')
    if (!container) return
    const rect = container.getBoundingClientRect()
    setHoveredIndex(idx)
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      svgX: getX(idx),
      label: labels[idx],
      items: series.map((s) => ({ key: s.key, label: s.label, color: s.color, value: s.values[idx] })),
    })
  }

  const handlePointLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }))
    setHoveredIndex(null)
  }

  return (
    <div>
      {/* edge-to-edge responsive svg graph area — same math as Dashboard's graph */}
      <div className="relative h-72 w-full graph-container">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 260" preserveAspectRatio="none">
          {/* y-axis gridlines */}
          {[20, 65, 110, 155, 200].map((y, idx) => (
            <line key={idx} x1="85" y1={y} x2="985" y2={y} stroke={GRID} strokeDasharray="4 4" strokeWidth="1.5" />
          ))}

          {/* crosshair tracking the hovered column */}
          {tooltip.visible && (
            <line
              x1={tooltip.svgX}
              y1="20"
              x2={tooltip.svgX}
              y2="200"
              stroke={PURPLE}
              strokeDasharray="4 4"
              strokeWidth="1.5"
              className="opacity-50"
            />
          )}

          {/* y-axis tick labels */}
          {ticks.map((t, idx) => (
            <text key={idx} x="10" y={24 + idx * 45} className="text-xs font-semibold fill-slate-500 font-sans">
              {t}k
            </text>
          ))}

          {/* series lines + points — purely visual now, hover is handled by the columns below */}
          {series.map((s) => (
            <React.Fragment key={s.key}>
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth="3"
                points={s.values.map((v, i) => `${getX(i)},${getY(v)}`).join(' ')}
                strokeOpacity={hoveredSeries === null || hoveredSeries === s.key ? 1 : 0.15}
                className="transition-all duration-300"
              />
              {s.values.map((v, i) => (
                <circle
                  key={`${s.key}-${i}`}
                  cx={getX(i)}
                  cy={getY(v)}
                  r={hoveredIndex === i ? 7.5 : 5.5}
                  fill={s.color}
                  fillOpacity={hoveredSeries === null || hoveredSeries === s.key ? 1 : 0.15}
                  className="transition-all duration-150 pointer-events-none"
                />
              ))}
            </React.Fragment>
          ))}

          {/* x-axis labels */}
          {labels.map((label, idx) => (
            <text key={label} x={getX(idx)} y="245" textAnchor="middle" className="text-xs font-bold fill-slate-600 font-sans">
              {label}
            </text>
          ))}

          {/* invisible full-height hit columns — one per timeframe */}
          {columns.map((c, idx) => (
            <rect
              key={`col-${idx}`}
              x={c.x}
              y="0"
              width={c.width}
              height="220"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={(e) => handleColumnHover(e, idx)}
              onMouseMove={(e) => handleColumnHover(e, idx)}
              onMouseLeave={handlePointLeave}
            />
          ))}
        </svg>

        {/* free-floating cursor tooltip — every series for the hovered timeframe, together */}
        {tooltip.visible && (
          <div
            className="absolute bg-white text-slate-900 px-4 py-3 rounded-xl shadow-lg border border-slate-200 pointer-events-none -translate-y-[calc(100%+14px)] transition-all duration-75 ease-out z-30 animate-fade-in min-w-[150px]"
            style={{ 
              left: `clamp(75px, ${tooltip.x}px, calc(100% - 75px))`, 
              top: `${tooltip.y}px`,
              transform: 'translateX(-50%)' 
            }}
          >
            <div className="font-sans font-bold text-[13px]" style={{ color: INK }}>
              {tooltip.label}
            </div>
            <div className="mt-2 space-y-1.5">
              {tooltip.items.map((it) => (
                <div key={it.key} className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-[7px]">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: it.color }} />
                    <span className="font-sans text-[11.5px] whitespace-nowrap" style={{ color: MUTED }}>
                      {it.label}
                    </span>
                  </div>
                  <span className="font-sans font-bold text-[12.5px] whitespace-nowrap" style={{ color: INK }}>
                    {it.value}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* softened hover-spotlight legend, below the chart */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-700 mt-2">
        {series.map((s) => (
          <div
            key={s.key}
            onMouseEnter={() => setHoveredSeries(s.key)}
            onMouseLeave={() => setHoveredSeries(null)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all border cursor-pointer ${
              hoveredSeries === s.key
                ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-2xs font-bold scale-105'
                : hoveredSeries !== null
                ? 'opacity-35 border-transparent'
                : 'bg-slate-50/60 border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full" style={{ background: s.color }} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ stat cells */
/* Mirrors the Law Firms page's SummaryCell exactly: a bordered strip that
 * wraps 2-up on mobile instead of a single unbreakable row, with the auto-fit
 * label/note. This is what "follows the Law Firms landing page design". */

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
        <div className="px-6 pt-6 pb-5 flex flex-col lg:flex-row items-stretch justify-between gap-6">
          <div className="w-full lg:w-[320px] shrink-0 space-y-1.5 pr-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-xs mb-2" style={{ color: ORANGE }}>
                <Link to="/" className="hover:underline">
                  &gt; Dashboard
                </Link>
                <span>&gt;</span>
                <span className="font-semibold">Reports</span>
              </div>
              <h1 className="text-4xl font-heading font-bold text-brand-purple tracking-tight">
                Reports
              </h1>
              <p className="text-xs text-slate-500 leading-normal mt-1.5">
                Revenue, transactions and subscription health across the platform.
              </p>
            </div>
          </div>

          {/* stats bar — wraps 2-up on mobile instead of forcing one unbreakable row */}
          <div
            ref={fitRef}
            className="flex-1 min-w-0 grid grid-cols-2 sm:flex border border-slate-200 sm:border-0 rounded-lg sm:rounded-none overflow-hidden"
          >
            {reportSummary.map((cell) => (
              <SummaryCell key={cell.label} {...cell} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= range/filter bar */}
      <section
        className="px-8 min-h-[70px] py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3"
        style={{ borderBottom: `1px solid ${LINE}` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-[9px] shrink-0">
            <Filter className="w-[15px] h-[15px]" style={{ color: MUTED }} strokeWidth={1.8} />
            <span
              className="font-sans uppercase"
              style={{ fontSize: 11, letterSpacing: '1.3px', color: MUTED }}
            >
              Filter
            </span>
          </div>

          <div className="flex rounded-[6px] overflow-hidden shrink-0" style={{ border: `1px solid #CBD5E1` }}>
            {reportRanges.map((r, i) => {
              const active = range === r
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
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
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="font-sans" style={{ fontSize: 11, letterSpacing: '0.6px', color: FAINT }}>
            UPDATED {updatedAt} GMT+8
          </span>

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

      {/* =============================================== monthly revenue + today's revenue */}
      {/*
       * Mirrors the Dashboard's Analytics section: the line graph and the
       * donut sit side by side in the same row (graph 2/3, donut 1/3),
       * each in its own gradient-eyebrow card — instead of the donut living
       * separately from the chart it's meant to sit beside.
       */}
      <section className="px-8 pt-[26px] pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Monthly revenue overview — 2 cols, same graph as before */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex flex-col">
            <div className="h-[5px] w-full bg-lexmeet-gradient rounded-t-[15px]" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-bold text-lg" style={{ color: PURPLE }}>
                  Monthly Revenue Overview
                </h2>
                <p
                  className="font-sans uppercase leading-none mt-[10px]"
                  style={{ fontSize: 11, letterSpacing: '1.6px', color: MUTED }}
                >
                  {data.subtitle}
                </p>
              </div>

              <div className="mt-[18px]">
                <RevenueGraph data={data} />
              </div>
            </div>
          </div>

          {/* Today's Revenue — donut card, styled like Dashboard's Distribution Chart card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col">
            <div className="h-[5px] w-full bg-lexmeet-gradient" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-bold text-lg" style={{ color: PURPLE }}>
                  Today&apos;s Revenue
                </h2>
                <p
                  className="font-sans text-[11px] font-semibold uppercase tracking-wider mt-0.5"
                  style={{ color: MUTED }}
                >
                  Revenue breakdown
                </p>

                <div className="mt-5 flex flex-col items-center">
                  <Donut
                    segments={todaysRevenue.segments}
                    total={todaysRevenue.total}
                    caption={todaysRevenue.caption}
                    size="lg"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 mt-4 border-t border-slate-100">
                {todaysRevenue.segments.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-2 p-1.5 rounded-xl">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="font-sans font-semibold text-xs truncate" style={{ color: INK }}>
                        {s.label}
                      </span>
                    </div>
                    <span className="font-sans font-extrabold text-xs shrink-0" style={{ color: INK }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}