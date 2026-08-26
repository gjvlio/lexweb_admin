import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Card from '../../components/ui/Card'
import subscriptionsIcon from './Assets/assets_photos/subscriptions-icon.svg'
import templatesIcon from './Assets/assets_photos/templates-icon.svg'
import assetsIcon from './Assets/assets_photos/assets-icon.svg'

const PRODUCT_CARDS = [
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    description: 'We are always looking for other ways to make legal services convenient.',
    icon: subscriptionsIcon,
    path: '/products/subscriptions',
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'We are always looking for other ways to make legal services convenient.',
    icon: templatesIcon,
    path: '/products/templates',
  },
  {
    id: 'assets',
    title: 'Assets',
    description: 'We are always looking for other ways to make legal services convenient.',
    icon: assetsIcon,
    path: '/products/assets',
  },
]

export default function ProductsMainPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const visibleCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return PRODUCT_CARDS
    return PRODUCT_CARDS.filter((product) => product.title.toLowerCase().includes(query))
  }, [searchQuery])

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Breadcrumb + Title + Search / Add row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-6 mb-2">
            <Link
              to="/products"
              className="font-sans hover:underline cursor-pointer block"
              style={{ fontSize: 12, color: '#F4512C' }}
            >
              &gt; Products
            </Link>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-purple">
            Products
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-orange pointer-events-none" />
            <input
              id="products-search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
              className="w-56 md:w-72 border border-brand-purple-soft/50 rounded-xl pl-9 pr-4 py-2 text-sm font-sans text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center font-semibold rounded-xl bg-brand-orange text-white px-4 py-2 text-sm shadow-xs hover:bg-brand-orange-light transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange whitespace-nowrap"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Product category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCards.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center text-center py-10 px-6"
          >
            <img src={product.icon} alt="" className="w-11 h-11 mb-4" />

            <h2 className="font-heading text-2xl font-bold text-brand-purple mb-3">
              {product.title}
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-[230px]">
              {product.description}
            </p>

            <Link
              to={product.path}
              className="inline-flex items-center justify-center font-semibold rounded-xl bg-brand-orange text-white px-6 py-2 text-sm shadow-xs hover:bg-brand-orange-light transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
            >
              View More
            </Link>
          </Card>
        ))}

        {visibleCards.length === 0 && (
          <Card className="col-span-full py-12 text-center text-slate-500">
            <p className="text-sm font-sans">No products match "{searchQuery}".</p>
          </Card>
        )}
      </div>
    </div>
  )
}