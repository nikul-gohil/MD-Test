'use client'

import { LayoutGrid, List } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs'

export type SortOption = 'position_ASC' | 'price_ASC' | 'price_DESC' | 'name_ASC' | 'created_at_DESC'

interface SortToolbarProps {
  breadcrumbs: BreadcrumbItem[]
  totalCount: number
  currentPage: number
  pageSize: number
  sortValue: SortOption
  view: 'grid' | 'list'
  onSortChange: (sort: SortOption) => void
  onViewChange: (view: 'grid' | 'list') => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'position_ASC', label: 'Relevance' },
  { value: 'price_ASC', label: 'Price: Low to High' },
  { value: 'price_DESC', label: 'Price: High to Low' },
  { value: 'name_ASC', label: 'Name A–Z' },
  { value: 'created_at_DESC', label: 'Newest' },
]

export default function SortToolbar({ breadcrumbs, totalCount, currentPage, pageSize, sortValue, view, onSortChange, onViewChange }: SortToolbarProps) {
  const from = Math.min((currentPage - 1) * pageSize + 1, totalCount)
  const to = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="mb-6">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-800">{from}–{to}</span> of{' '}
          <span className="font-medium text-gray-800">{totalCount}</span> products
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-gray-200 rounded px-3 py-1.5 text-sm outline-none focus:border-orange-400 bg-white"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewChange('grid')}
              className="p-1.5 rounded border transition-colors"
              style={{ borderColor: view === 'grid' ? '#F15A24' : '#E5E7EB', color: view === 'grid' ? '#F15A24' : '#9CA3AF' }}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className="p-1.5 rounded border transition-colors"
              style={{ borderColor: view === 'list' ? '#F15A24' : '#E5E7EB', color: view === 'list' ? '#F15A24' : '#9CA3AF' }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
