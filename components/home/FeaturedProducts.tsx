'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import type { FeaturedProduct } from '@/lib/types'

interface FeaturedProductsProps {
  products?: FeaturedProduct[]
}

const STATIC_PRODUCTS: FeaturedProduct[] = [
  { sku: 'DHAT-001', name: 'Disposable Hats (6 x 40)', brand: 'MedGuard', price: 12.99, image: '', currency: '€', tabCategory: 'Consumables' },
  { sku: 'BEUR-TH-001', name: 'Beurer Digital Thermo Hygrometer Indoor Thermometer', brand: 'Beurer', price: 34.95, image: '', currency: '€', tabCategory: 'Diagnostics' },
  { sku: 'HEM-RB-025', name: 'Hemmis Resistance Band 25m', brand: 'Hemmis', price: 48.50, image: '', currency: '€', tabCategory: 'Physiotherapy' },
  { sku: 'CPE-GLV-16', name: '16" CPE Glove Overshoes', brand: 'MedGuard', price: 8.75, image: '', currency: '€', tabCategory: 'Consumables' },
  { sku: 'WA-767-WALL', name: 'Welch Allyn 767 Wall Model Aneroid Sphygmomanometer', brand: 'Welch Allyn', price: 153.55, image: '', currency: '€', tabCategory: 'Diagnostics' },
  { sku: 'NITR-GL-L', name: 'Nitrile Examination Gloves Large (100)', brand: 'MedGuard', price: 7.99, image: '', currency: '€', tabCategory: 'Consumables' },
  { sku: 'OMRON-M3', name: 'Omron M3 Upper Arm Blood Pressure Monitor', brand: 'Omron', price: 49.95, image: '', currency: '€', tabCategory: 'Diagnostics' },
  { sku: 'THERA-BAND-RED', name: 'Thera-Band Resistance Band Red 5.5m', brand: 'Thera-Band', price: 14.99, image: '', currency: '€', tabCategory: 'Physiotherapy' },
]

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState('All')
  const scrollRef = useRef<HTMLDivElement>(null)

  const items = products && products.length > 0 ? products : STATIC_PRODUCTS
  const tabNames = Array.from(new Set(items.map((p) => p.tabCategory)))
  const tabs = ['All', ...tabNames]

  const filtered = activeTab === 'All' ? items : items.filter((p) => p.tabCategory === activeTab)

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2
            className="text-2xl font-extrabold"
            style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Featured Products
          </h2>
          <div className="flex items-center gap-1">
            {/* Tabs */}
            <div className="flex items-center gap-1 mr-4 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
                  }}
                  className="px-3 py-1.5 text-xs font-semibold transition-all duration-150 border-b-2 whitespace-nowrap"
                  style={{
                    color: activeTab === tab ? '#F15A24' : '#6B7280',
                    borderBottomColor: activeTab === tab ? '#F15A24' : 'transparent',
                    fontFamily: 'var(--font-jakarta), sans-serif',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Arrows */}
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors shrink-0"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors shrink-0"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {filtered.map((product) => (
            <div key={product.sku} className="shrink-0 w-52 sm:w-56">
              <ProductCard
                sku={product.sku}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.image}
                currency={product.currency}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
