import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconTotalLawyers,
  IconTotalSubscription,
  IconTotalSales,
  IconActiveWebsites,
  IconGrowingChart,
} from '../../components/ui/Icons'

// Dynamic Multi-Timeframe Mock Data with Clean Max Limits
const datasets = {
  Year: {
    max: 3000000,
    ticks: ['₱3,000K', '₱2,250K', '₱1,500K', '₱750K', '₱0K'],
    data: [
      { label: 'Jan', sales: 1850000, sub: 850000, com: 270000 },
      { label: 'Feb', sales: 2200000, sub: 890000, com: 309000 },
      { label: 'Mar', sales: 2520000, sub: 922700, com: 344270 },
      { label: 'Apr', sales: 2150000, sub: 950000, com: 310000 },
      { label: 'May', sales: 2300000, sub: 980000, com: 328000 },
      { label: 'Jun', sales: 2050000, sub: 1020000, com: 307000 },
      { label: 'Jul', sales: 2280000, sub: 1060000, com: 334000 },
      { label: 'Aug', sales: 1980000, sub: 1090000, com: 307000 },
      { label: 'Sep', sales: 2350000, sub: 1140000, com: 349000 },
      { label: 'Oct', sales: 2420000, sub: 1180000, com: 360000 },
      { label: 'Nov', sales: 2600000, sub: 1220000, com: 382000 },
      { label: 'Dec', sales: 2480000, sub: 1250000, com: 373000 },
    ],
  },
  Month: {
    max: 1000000,
    ticks: ['₱1,000K', '₱750K', '₱500K', '₱250K', '₱0K'],
    data: [
      { label: 'Week 1', sales: 580000, sub: 280000, com: 86000 },
      { label: 'Week 2', sales: 640000, sub: 295000, com: 93500 },
      { label: 'Week 3', sales: 710000, sub: 310000, com: 102000 },
      { label: 'Week 4', sales: 670000, sub: 305000, com: 97500 },
    ],
  },
  Week: {
    max: 200000,
    ticks: ['₱200K', '₱150K', '₱100K', '₱50K', '₱0K'],
    data: [
      { label: 'Mon', sales: 95000, sub: 42000, com: 13700 },
      { label: 'Tue', sales: 120000, sub: 45000, com: 16500 },
      { label: 'Wed', sales: 145000, sub: 48000, com: 19300 },
      { label: 'Thu', sales: 130000, sub: 46000, com: 17600 },
      { label: 'Fri', sales: 165000, sub: 52000, com: 21700 },
      { label: 'Sat', sales: 110000, sub: 40000, com: 15000 },
      { label: 'Sun', sales: 85000, sub: 38000, com: 12300 },
    ],
  },
  Today: {
    max: 80000,
    ticks: ['₱80K', '₱60K', '₱40K', '₱20K', '₱0K'],
    data: [
      { label: '9 AM', sales: 12000, sub: 5000, com: 1700 },
      { label: '11 AM', sales: 28000, sub: 11000, com: 3900 },
      { label: '1 PM', sales: 45000, sub: 18000, com: 6300 },
      { label: '3 PM', sales: 52000, sub: 21000, com: 7300 },
      { label: '5 PM', sales: 61000, sub: 24000, com: 8500 },
      { label: '7 PM', sales: 48000, sub: 19000, com: 6700 },
      { label: '9 PM', sales: 34000, sub: 14000, com: 4800 },
      { label: '11 PM', sales: 18000, sub: 8000, com: 2600 },
    ],
  },
}

export default function Dashboard() {
  // Default filter toggled to 'Year'
  const [graphFilter, setGraphFilter] = useState('Year')
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState(null)

  // Softened Hover Spotlight state for graph series (sales, sub, com)
  const [hoveredLegendSeries, setHoveredLegendSeries] = useState(null)

  // Free cursor-following tooltip & crosshair state for graph
  const [graphTooltip, setGraphTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    svgX: 0,
    title: '',
    subtitle: '',
  })

  // Active donut defaults to Premium Plan (Pro)
  const activeDonut = hoveredDonutSegment || 'premium'

  // Get active timeframe dataset & config
  const activeConfig = datasets[graphFilter] || datasets.Year
  const activeData = activeConfig.data
  const maxVal = activeConfig.max

  // SVG dimensions: viewBox="0 0 1000 260"
  const startX = 85
  const endX = 985

  const getY = (val) => 200 - (val / maxVal) * 180
  const getX = (idx) => {
    const count = activeData.length
    if (count <= 1) return startX
    return startX + (idx / (count - 1)) * (endX - startX)
  }

  // Points strings matching EXACT same getX(i) and getY(v)
  const salesPoints = activeData.map((d, i) => `${getX(i)},${getY(d.sales)}`).join(' ')
  const subPoints = activeData.map((d, i) => `${getX(i)},${getY(d.sub)}`).join(' ')
  const comPoints = activeData.map((d, i) => `${getX(i)},${getY(d.com)}`).join(' ')

  // Donut callout pill positioning right beside the hovered arc
  const getDonutPillClass = () => {
    if (hoveredDonutSegment === 'free') return 'bottom-2 -left-10'
    if (hoveredDonutSegment === 'advanced') return 'top-2 -left-10'
    return 'top-2 -right-10' // Premium Plan (Pro)
  }

  const handlePointHover = (e, label, timeframeLabel, val, ptSvgX) => {
    const container = e.currentTarget.closest('.graph-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      setGraphTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        svgX: ptSvgX,
        title: `${timeframeLabel}: ₱${val.toLocaleString()}`,
        subtitle: label,
      })
    }
  }

  const handlePointMove = (e) => {
    const container = e.currentTarget.closest('.graph-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      setGraphTooltip((prev) => ({
        ...prev,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }))
    }
  }

  const handlePointLeave = () => {
    setGraphTooltip((prev) => ({ ...prev, visible: false }))
  }

  return (
    <div className="space-y-7 font-sans pb-12 w-full">
      {/* 1. Page Title & Subtitle */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-[#5E1B89] tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-700 text-sm font-sans font-medium mt-1.5">
          The bird's eye view of your account
        </p>
      </div>

      {/* 2. Top 4 KPI Stat Cards Banner — Generous Card Padding & Zero Overflow */}
      <div className="-mx-6 bg-lexmeet-gradient px-6 py-5 rounded-none shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: TOTAL LAWYERS (Clickable -> /lawfirms) */}
          <Link
            to="/lawfirms"
            className="bg-white rounded-2xl px-5 py-4.5 min-h-[110px] shadow-xs border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all flex items-center gap-3.5 w-full overflow-hidden group"
          >
            <IconTotalLawyers className="w-7 h-7 shrink-0 text-[#5E1B89]" />
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#5E1B89] truncate block">
                TOTAL LAWYERS
              </span>
              <div className="flex items-center gap-2 my-0.5 flex-wrap">
                <span className="font-sans font-extrabold text-2xl xl:text-3xl text-slate-900 tracking-tight">
                  1,426
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                  <IconGrowingChart className="w-3 h-3" /> +12.4%
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans truncate block">
                Across 184 law firms
              </p>
            </div>
          </Link>

          {/* Card 2: TOTAL SUBSCRIPTION INCOME (Clickable -> /products/subscriptions) */}
          <Link
            to="/products/subscriptions"
            className="bg-white rounded-2xl px-5 py-4.5 min-h-[110px] shadow-xs border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all flex items-center gap-3.5 w-full overflow-hidden group"
          >
            <IconTotalSubscription className="w-7 h-7 shrink-0 text-[#5E1B89]" />
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#5E1B89] truncate block">
                TOTAL SUBSCRIPTION INCOME
              </span>
              <div className="flex items-center gap-2 my-0.5 flex-wrap">
                <span className="font-sans font-extrabold text-2xl xl:text-3xl text-slate-900 tracking-tight">
                  ₱922,700
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                  <IconGrowingChart className="w-3 h-3" /> +8.2%
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans truncate block">
                Total Income: <span className="font-semibold text-slate-600">₱7.8M</span>
              </p>
            </div>
          </Link>

          {/* Card 3: TOTAL SALES (Clickable -> /transactions) */}
          <Link
            to="/transactions"
            className="bg-white rounded-2xl px-5 py-4.5 min-h-[110px] shadow-xs border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all flex items-center gap-3.5 w-full overflow-hidden group"
          >
            <IconTotalSales className="w-7 h-7 shrink-0 text-[#5E1B89]" />
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#5E1B89] truncate block">
                TOTAL SALES
              </span>
              <div className="flex items-center gap-2 my-0.5 flex-wrap">
                <span className="font-sans font-extrabold text-2xl xl:text-3xl text-slate-900 tracking-tight">
                  ₱250,700
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                  <IconGrowingChart className="w-3 h-3" /> +10% com.
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans truncate block">
                ₱25,700 net commission
              </p>
            </div>
          </Link>

          {/* Card 4: ACTIVE WEBSITES (Clickable -> /websites) */}
          <Link
            to="/websites"
            className="bg-white rounded-2xl px-5 py-4.5 min-h-[110px] shadow-xs border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all flex items-center gap-3.5 w-full overflow-hidden group"
          >
            <IconActiveWebsites className="w-7 h-7 shrink-0 text-[#5E1B89]" />
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#5E1B89] truncate block">
                ACTIVE WEBSITES
              </span>
              <div className="flex items-center gap-2 my-0.5 flex-wrap">
                <span className="font-sans font-extrabold text-2xl xl:text-3xl text-slate-900 tracking-tight">
                  184
                </span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  96.7% ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans truncate block">
                7 Pending Approvals
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* 3. Analytics Section: Overall Graph & Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* Overall Graph (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between">
          {/* Gradient Eyebrow Bar */}
          <div className="h-[5px] w-full bg-lexmeet-gradient" />
          
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-[#5E1B89]">
                    Overall Graph
                  </h2>
                  <p className="font-sans text-[11px] font-semibold uppercase text-slate-400 tracking-wider mt-0.5">
                    FINANCIAL PROGRESS ACROSS ALL TRANSACTIONS
                  </p>
                </div>

                {/* Time Filter Pills — Default Toggled to 'Year' */}
                <div className="bg-slate-100/90 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold text-slate-500">
                  {['Today', 'Week', 'Month', 'Year'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setGraphFilter(item)}
                      className={`px-3.5 py-1 rounded-lg transition-all ${
                        graphFilter === item
                          ? 'bg-[#5E1B89] text-white font-bold shadow-xs'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edge-to-Edge Full Width Responsive SVG Graph Area */}
              <div className="mt-6 relative h-72 w-full graph-container">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 260" preserveAspectRatio="none">
                  {/* Y-Axis Grid Lines spanning X=85 to X=985 */}
                  {[20, 65, 110, 155, 200].map((y, idx) => (
                    <line
                      key={idx}
                      x1="85"
                      y1={y}
                      x2="985"
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Vertical Guideline Crosshair tracking hover point */}
                  {graphTooltip.visible && (
                    <line
                      x1={graphTooltip.svgX}
                      y1="20"
                      x2={graphTooltip.svgX}
                      y2="200"
                      stroke="#5E1B89"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                      className="opacity-50"
                    />
                  )}

                  {/* Y-Axis Text Labels with Large Legible Font (text-xs font-semibold) */}
                  {activeConfig.ticks.map((tickLabel, idx) => (
                    <text
                      key={idx}
                      x="10"
                      y={24 + idx * 45}
                      className="text-xs font-semibold fill-slate-500 font-sans"
                    >
                      {tickLabel}
                    </text>
                  ))}

                  {/* Line 1: Marketplace Sales Volume (Orange #F4512C) */}
                  <polyline
                    fill="none"
                    stroke="#F4512C"
                    strokeWidth="3"
                    points={salesPoints}
                    strokeOpacity={hoveredLegendSeries === null || hoveredLegendSeries === 'sales' ? 1 : 0.15}
                    className="transition-all duration-300"
                  />
                  {activeData.map((d, i) => (
                    <circle
                      key={`sales-${i}`}
                      cx={getX(i)}
                      cy={getY(d.sales)}
                      r="5.5"
                      fill="#F4512C"
                      fillOpacity={hoveredLegendSeries === null || hoveredLegendSeries === 'sales' ? 1 : 0.15}
                      className="hover:r-8 transition-all cursor-pointer"
                      onMouseEnter={(e) => handlePointHover(e, 'Marketplace Sales Volume', d.label, d.sales, getX(i))}
                      onMouseMove={handlePointMove}
                      onMouseLeave={handlePointLeave}
                    />
                  ))}

                  {/* Line 2: Subscription Income (Purple #5E1B89) */}
                  <polyline
                    fill="none"
                    stroke="#5E1B89"
                    strokeWidth="3"
                    points={subPoints}
                    strokeOpacity={hoveredLegendSeries === null || hoveredLegendSeries === 'sub' ? 1 : 0.15}
                    className="transition-all duration-300"
                  />
                  {activeData.map((d, i) => (
                    <circle
                      key={`sub-${i}`}
                      cx={getX(i)}
                      cy={getY(d.sub)}
                      r="5.5"
                      fill="#5E1B89"
                      fillOpacity={hoveredLegendSeries === null || hoveredLegendSeries === 'sub' ? 1 : 0.15}
                      className="hover:r-8 transition-all cursor-pointer"
                      onMouseEnter={(e) => handlePointHover(e, 'Subscription Income', d.label, d.sub, getX(i))}
                      onMouseMove={handlePointMove}
                      onMouseLeave={handlePointLeave}
                    />
                  ))}

                  {/* Line 3: Net Platform Commission (Light Orange #FF7F4D) */}
                  <polyline
                    fill="none"
                    stroke="#FF7F4D"
                    strokeWidth="3"
                    strokeDasharray="5 5"
                    points={comPoints}
                    strokeOpacity={hoveredLegendSeries === null || hoveredLegendSeries === 'com' ? 1 : 0.15}
                    className="transition-all duration-300"
                  />
                  {activeData.map((d, i) => (
                    <circle
                      key={`com-${i}`}
                      cx={getX(i)}
                      cy={getY(d.com)}
                      r="5.5"
                      fill="#FF7F4D"
                      fillOpacity={hoveredLegendSeries === null || hoveredLegendSeries === 'com' ? 1 : 0.15}
                      className="hover:r-8 transition-all cursor-pointer"
                      onMouseEnter={(e) => handlePointHover(e, 'Net Platform Commission (10%)', d.label, d.com, getX(i))}
                      onMouseMove={handlePointMove}
                      onMouseLeave={handlePointLeave}
                    />
                  ))}

                  {/* X-Axis Timeframe Labels Perfectly Aligned Below Points (text-xs font-bold) */}
                  {activeData.map((d, idx) => (
                    <text
                      key={d.label}
                      x={getX(idx)}
                      y="245"
                      textAnchor="middle"
                      className="text-xs font-bold fill-slate-600 font-sans"
                    >
                      {d.label}
                    </text>
                  ))}
                </svg>

                {/* Free Floating Cursor-Following Tooltip with Fade Animation */}
                {graphTooltip.visible && (
                  <div
                    className="absolute bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-75 ease-out z-30 animate-fade-in"
                    style={{ left: `${graphTooltip.x}px`, top: `${graphTooltip.y - 10}px` }}
                  >
                    <div className="text-white font-bold">{graphTooltip.title}</div>
                    <div className="text-[10px] text-slate-300 font-normal mt-0.5">{graphTooltip.subtitle}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Softened Hover Spotlight Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-700 mt-2">
              <div
                onMouseEnter={() => setHoveredLegendSeries('sales')}
                onMouseLeave={() => setHoveredLegendSeries(null)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all border cursor-pointer ${
                  hoveredLegendSeries === 'sales'
                    ? 'bg-orange-50 border-orange-200 text-slate-900 shadow-2xs font-bold scale-105'
                    : hoveredLegendSeries !== null
                    ? 'opacity-35 border-transparent'
                    : 'bg-slate-50/60 border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#F4512C]" />
                <span>Marketplace Sales Volume</span>
              </div>

              <div
                onMouseEnter={() => setHoveredLegendSeries('sub')}
                onMouseLeave={() => setHoveredLegendSeries(null)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all border cursor-pointer ${
                  hoveredLegendSeries === 'sub'
                    ? 'bg-purple-50 border-purple-200 text-slate-900 shadow-2xs font-bold scale-105'
                    : hoveredLegendSeries !== null
                    ? 'opacity-35 border-transparent'
                    : 'bg-slate-50/60 border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#5E1B89]" />
                <span>Subscription Income (Plans)</span>
              </div>

              <div
                onMouseEnter={() => setHoveredLegendSeries('com')}
                onMouseLeave={() => setHoveredLegendSeries(null)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all border cursor-pointer ${
                  hoveredLegendSeries === 'com'
                    ? 'bg-orange-50 border-orange-200 text-slate-900 shadow-2xs font-bold scale-105'
                    : hoveredLegendSeries !== null
                    ? 'opacity-35 border-transparent'
                    : 'bg-slate-50/60 border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF7F4D]" />
                <span>Net Platform Commission (10%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Chart (1 Col) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between">
          {/* Gradient Eyebrow Bar */}
          <div className="h-[5px] w-full bg-lexmeet-gradient" />

          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-heading font-bold text-2xl text-[#5E1B89]">
                Distribution Chart
              </h2>
              <p className="font-sans text-[11px] font-semibold uppercase text-slate-400 tracking-wider mt-0.5">
                SUBSCRIPTOPN PLANS
              </p>

              {/* Donut Chart with Pill Hidden at Default & Smooth Fade on Hover */}
              <div
                className="mt-6 flex flex-col items-center justify-center py-4"
                onMouseLeave={() => setHoveredDonutSegment(null)}
              >
                <div className="relative flex items-center justify-center">
                  <svg className="w-52 h-52 overflow-visible cursor-pointer" viewBox="0 0 160 160">
                    {/* Free Plan Arc (Orange #F4512C) */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#F4512C"
                      strokeWidth="28"
                      strokeDasharray="210 377"
                      strokeDashoffset="0"
                      className="hover:opacity-85 transition-opacity"
                      onMouseEnter={() => setHoveredDonutSegment('free')}
                    />
                    {/* Premium Plan Pro Arc (Dark Purple #5E1B89) */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#5E1B89"
                      strokeWidth="28"
                      strokeDasharray="100 377"
                      strokeDashoffset="-210"
                      className="hover:opacity-85 transition-opacity"
                      onMouseEnter={() => setHoveredDonutSegment('premium')}
                    />
                    {/* Advanced Plan Enterprise Arc (Soft Purple #9D71BC) */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      fill="none"
                      stroke="#9D71BC"
                      strokeWidth="28"
                      strokeDasharray="67 377"
                      strokeDashoffset="-310"
                      className="hover:opacity-85 transition-opacity"
                      onMouseEnter={() => setHoveredDonutSegment('advanced')}
                    />
                  </svg>

                  {/* Tooltip Callout Box Hidden at Default & Smooth Fade Animation on Hover */}
                  {hoveredDonutSegment && (
                    <div
                      className={`absolute bg-white border-2 border-[#5E1B89] px-3.5 py-1.5 rounded-xl shadow-md text-center pointer-events-none transition-all duration-200 ease-out z-10 animate-fade-in ${getDonutPillClass()}`}
                    >
                      <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                        {hoveredDonutSegment === 'free'
                          ? 'FREE PLAN'
                          : hoveredDonutSegment === 'advanced'
                          ? 'ADVANCED PLAN (ENTERPRISE)'
                          : 'PREMIUM PLAN (PRO)'}
                      </span>
                      <span className="block text-xs font-extrabold text-slate-900">
                        {hoveredDonutSegment === 'free'
                          ? '820 (53%)'
                          : hoveredDonutSegment === 'advanced'
                          ? '310 (20%)'
                          : '420 (27%)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600">
              <div
                className={`flex items-center gap-2.5 cursor-pointer transition-all ${
                  hoveredDonutSegment === 'free' ? 'font-bold text-slate-900' : 'hover:text-slate-900'
                }`}
                onMouseEnter={() => setHoveredDonutSegment('free')}
                onMouseLeave={() => setHoveredDonutSegment(null)}
              >
                <span className="w-3 h-3 rounded-full bg-[#F4512C]" />
                <span>Free Plan</span>
              </div>
              <div
                className={`flex items-center gap-2.5 cursor-pointer transition-all ${
                  hoveredDonutSegment === 'premium' ? 'font-bold text-slate-900' : 'hover:text-slate-900'
                }`}
                onMouseEnter={() => setHoveredDonutSegment('premium')}
                onMouseLeave={() => setHoveredDonutSegment(null)}
              >
                <span className="w-3 h-3 rounded-full bg-[#FF7F4D]" />
                <span>Premium Plan (Pro)</span>
              </div>
              <div
                className={`flex items-center gap-2.5 cursor-pointer transition-all ${
                  hoveredDonutSegment === 'advanced' ? 'font-bold text-slate-900' : 'hover:text-slate-900'
                }`}
                onMouseEnter={() => setHoveredDonutSegment('advanced')}
                onMouseLeave={() => setHoveredDonutSegment(null)}
              >
                <span className="w-3 h-3 rounded-full bg-[#5E1B89]" />
                <span>Advanced Plan (Enterprise)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Bottom 3 Management Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Card 1: Most Active Website (Manage -> /websites) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between">
          {/* Gradient Eyebrow Bar */}
          <div className="h-[5px] w-full bg-lexmeet-gradient" />

          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#5E1B89]">
                Most Active Website
              </h3>
              <Link
                to="/websites"
                className="bg-[#F4512C] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#FF7F4D] transition-colors shadow-xs"
              >
                Manage
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5E1B89] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                VA
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  Valderrama & Associates
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Atty. Marlon Valderrama • valderramalaw.ph
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  MONTHLY VISITS
                </span>
                <span className="text-sm font-extrabold text-[#F4512C] mt-0.5 block">
                  42,500 visits
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  ACTIVE CLIENTS
                </span>
                <span className="text-sm font-extrabold text-[#5E1B89] mt-0.5 block">
                  380 clients
                </span>
              </div>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TOP BOOKING CLIENTS
              </span>
              <div className="font-bold text-slate-900">Client: Juan De La Cruz</div>
              <div className="text-slate-500 text-[11px]">
                12 Consultations Booked • ₱60,000 Volume
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Top Grossing Law Firm (Manage -> /lawfirms) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between">
          {/* Gradient Eyebrow Bar */}
          <div className="h-[5px] w-full bg-lexmeet-gradient" />

          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#5E1B89]">
                Top Grossing Law Firm
              </h3>
              <Link
                to="/lawfirms"
                className="bg-[#F4512C] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#FF7F4D] transition-colors shadow-xs"
              >
                Manage
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4512C] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                CP
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  Cruz & Partners Law Firm
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Atty. Teressa Cruz • cruzlaw.com
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  TOTAL SALES PROCESSED
                </span>
                <span className="text-sm font-extrabold text-[#F4512C] mt-0.5 block">
                  ₱485,000
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  NET PLATFORM COMMISSION
                </span>
                <span className="text-sm font-extrabold text-[#5E1B89] mt-0.5 block">
                  ₱48,500 (10%)
                </span>
              </div>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                ACTIVE SUBSCRIPTION TIER
              </span>
              <div className="font-bold text-slate-900">Advanced Plan (Enterprise Lex)</div>
              <div className="text-slate-500 text-[11px]">
                98 Consultations Completed • 100% Payout Verified
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Onboarding & Health (Manage -> /reports) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between">
          {/* Gradient Eyebrow Bar */}
          <div className="h-[5px] w-full bg-lexmeet-gradient" />

          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#5E1B89]">
                Onboarding & Health
              </h3>
              <Link
                to="/reports"
                className="bg-[#F4512C] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#FF7F4D] transition-colors shadow-xs"
              >
                Manage
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5E1B89] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                LC
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  Fastest Growing Tenant
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  LexConsult Corporate • lexconsult.ph
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  PENDING SIGNUPS
                </span>
                <span className="text-sm font-extrabold text-[#F4512C] mt-0.5 block">
                  7 Pending
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  GLOBAL NODE UPTIME
                </span>
                <span className="text-sm font-extrabold text-[#5E1B89] mt-0.5 block">
                  99.98%
                </span>
              </div>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                SYSTEM ALERT STATUS
              </span>
              <div className="font-bold text-slate-900">2 Custom Domains Awaiting DNS</div>
              <div className="text-slate-500 text-[11px]">
                Bandwidth cap warning sent to 1 tenant
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
