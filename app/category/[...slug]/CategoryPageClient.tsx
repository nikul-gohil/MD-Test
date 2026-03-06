'use client'

import { useState, useTransition, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import FilterSidebar from '@/components/plp/FilterSidebar'
import SortToolbar from '@/components/plp/SortToolbar'
import ProductGrid from '@/components/plp/ProductGrid'
import Pagination from '@/components/ui/Pagination'
import EmptyState from '@/components/ui/EmptyState'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import type { ProductListResult, Aggregation } from '@/lib/types'
import type { SortOption } from '@/components/plp/SortToolbar'
import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs'
import { SlidersHorizontal, X } from 'lucide-react'

interface Props {
  categoryName: string
  categoryMeta: { title: string; description: string; image: string | null }
  breadcrumbs: BreadcrumbItem[]
  urlPath: string
  categoryId: string
  initialProducts: ProductListResult | null
  initialPage: number
  initialPageSize: number
  initialSort: string
  initialMinPrice?: string
  initialMaxPrice?: string
}

export default function CategoryPageClient({
  categoryName,
  breadcrumbs,
  initialProducts,
  initialPage,
  initialPageSize,
  initialSort,
  initialMinPrice,
  initialMaxPrice,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const products = initialProducts
  const items = products?.items ?? []
  const totalCount = products?.total_count ?? 0
  const totalPages = products?.page_info?.total_pages ?? 1
  const aggregations: Aggregation[] = products?.aggregations ?? []

  const [view, setView] = useState<'grid' | 'list'>('grid')

  // Active filters from initial URL params
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[] | undefined>>({
    min_price: initialMinPrice,
    max_price: initialMaxPrice,
  })

  function buildUrl(overrides: Record<string, string | number | undefined>) {
    const params = new URLSearchParams()
    const merged = { page: initialPage, pageSize: initialPageSize, sort: initialSort, ...overrides }
    Object.entries(merged).forEach(([k, v]) => { if (v !== undefined && v !== '') params.set(k, String(v)) })
    return `${pathname}?${params.toString()}`
  }

  const navigate = useCallback((params: Record<string, string | number | undefined>) => {
    startTransition(() => { router.push(buildUrl(params)) })
  }, [pathname, initialPage, initialPageSize, initialSort]) // eslint-disable-line

  function handleFilterChange(filters: Record<string, string | string[] | undefined>) {
    setActiveFilters(filters)
    navigate({
      page: 1,
      pageSize: initialPageSize,
      sort: initialSort,
      min_price: filters.min_price as string | undefined,
      max_price: filters.max_price as string | undefined,
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-xl p-5 shadow-sm sticky top-24">
              <FilterSidebar
                aggregations={aggregations}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal size={15} />
                Filter & Sort
              </button>
            </div>

            <SortToolbar
              breadcrumbs={breadcrumbs}
              totalCount={totalCount}
              currentPage={initialPage}
              pageSize={initialPageSize}
              sortValue={initialSort as SortOption}
              view={view}
              onSortChange={(sort) => navigate({ sort, page: 1 })}
              onViewChange={setView}
            />

            {isPending ? (
              <ProductGridSkeleton count={initialPageSize} />
            ) : items.length === 0 ? (
              <div className="bg-white rounded-xl p-8">
                <EmptyState type="search" title={`No products found in ${categoryName}`} />
              </div>
            ) : (
              <>
                <ProductGrid products={items} view={view} />
                <Pagination
                  currentPage={initialPage}
                  totalPages={totalPages}
                  onPageChange={(page) => navigate({ page })}
                  pageSize={initialPageSize}
                  onPageSizeChange={(pageSize) => navigate({ pageSize, page: 1 })}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-navy" style={{ color: '#1B2B6B' }}>Filter & Sort</h2>
              <button onClick={() => setMobileSidebarOpen(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <FilterSidebar
              aggregations={aggregations}
              activeFilters={activeFilters}
              onFilterChange={(f) => { handleFilterChange(f); setMobileSidebarOpen(false) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
