'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import ProductGrid from '@/components/plp/ProductGrid'
import Pagination from '@/components/ui/Pagination'
import EmptyState from '@/components/ui/EmptyState'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import type { ProductListResult } from '@/lib/types'
import { Search } from 'lucide-react'

interface Props {
  query: string
  initialResults: ProductListResult | null
  initialPage: number
  initialPageSize: number
}

export default function SearchPageClient({ query, initialResults, initialPage, initialPageSize }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const items = initialResults?.items ?? []
  const totalCount = initialResults?.total_count ?? 0
  const totalPages = initialResults?.page_info?.total_pages ?? 1

  function navigate(overrides: Record<string, string | number>) {
    const params = new URLSearchParams({ q: query, page: String(initialPage), pageSize: String(initialPageSize), ...Object.fromEntries(Object.entries(overrides).map(([k, v]) => [k, String(v)])) })
    startTransition(() => router.push(`${pathname}?${params.toString()}`))
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Search size={20} style={{ color: '#1B2B6B' }} />
            <h1 className="text-2xl font-extrabold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
              {query ? `Results for "${query}"` : 'Search Products'}
            </h1>
          </div>
          {query && totalCount > 0 && (
            <p className="text-sm text-gray-500 ml-9">{totalCount.toLocaleString()} products found</p>
          )}
        </div>

        {!query ? (
          <div className="bg-white rounded-xl p-8">
            <EmptyState type="search" title="Enter a search term" message="Use the search bar above to find products." />
          </div>
        ) : isPending ? (
          <ProductGridSkeleton count={initialPageSize} />
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl p-8">
            <EmptyState
              type="search"
              title={`No results for "${query}"`}
              message="Try a different search term or browse our categories."
            />
          </div>
        ) : (
          <>
            <ProductGrid products={items} view="grid" />
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
  )
}
