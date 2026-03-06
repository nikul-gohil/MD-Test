'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Aggregation } from '@/lib/types'

interface ActiveFilters {
  min_price?: string
  max_price?: string
  [key: string]: string | string[] | undefined
}

interface FilterSidebarProps {
  aggregations: Aggregation[]
  activeFilters: ActiveFilters
  onFilterChange: (filters: ActiveFilters) => void
}

const HIDDEN_AGGREGATIONS = ['category_uid', 'littmann_colour']

function AccordionSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors"
        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {title}
        <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s' }} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

export default function FilterSidebar({ aggregations, activeFilters, onFilterChange }: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(activeFilters.min_price || '')
  const [maxPrice, setMaxPrice] = useState(activeFilters.max_price || '')

  const visibleAggs = aggregations.filter((a) => !HIDDEN_AGGREGATIONS.includes(a.attribute_code))

  function handleCheckbox(code: string, value: string, checked: boolean) {
    const current = (activeFilters[code] as string[]) || []
    const next = checked ? [...current, value] : current.filter((v) => v !== value)
    onFilterChange({ ...activeFilters, [code]: next.length ? next : undefined })
  }

  function handlePriceApply() {
    onFilterChange({ ...activeFilters, min_price: minPrice || undefined, max_price: maxPrice || undefined })
  }

  function handleClearAll() {
    setMinPrice('')
    setMaxPrice('')
    onFilterChange({})
  }

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-extrabold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Filter By
        </h2>
        <button
          onClick={handleClearAll}
          className="text-xs font-semibold hover:opacity-80 transition-opacity"
          style={{ color: '#F15A24' }}
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <AccordionSection title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min €"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-orange-400"
          />
          <span className="text-gray-400 text-xs">–</span>
          <input
            type="number"
            placeholder="Max €"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-orange-400"
          />
        </div>
        <button
          onClick={handlePriceApply}
          className="mt-2 w-full py-1.5 text-xs font-bold rounded transition-colors"
          style={{ backgroundColor: '#1B2B6B', color: 'white' }}
        >
          Apply
        </button>
      </AccordionSection>

      {/* Dynamic aggregations */}
      {visibleAggs.map((agg) => (
        <AccordionSection key={agg.attribute_code} title={agg.label} defaultOpen={agg.attribute_code === 'manufacturer'}>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {agg.options.map((opt) => {
              const current = (activeFilters[agg.attribute_code] as string[]) || []
              const checked = current.includes(opt.value)
              return (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleCheckbox(agg.attribute_code, opt.value, e.target.checked)}
                    className="accent-orange-500 w-3.5 h-3.5 rounded"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{opt.label}</span>
                  <span className="text-xs text-gray-400">({opt.count})</span>
                </label>
              )
            })}
          </div>
        </AccordionSection>
      ))}
    </aside>
  )
}
