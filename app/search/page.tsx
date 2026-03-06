import { Suspense } from 'react'
import type { Metadata } from 'next'
import { magentoFetch } from '@/lib/magentoFetch'
import { GET_SEARCH_PRODUCTS_QUERY } from '@/lib/queries/products'
import type { ProductListResult } from '@/lib/types'
import SearchPageClient from './SearchPageClient'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const q = sp.q || ''
  return {
    title: q ? `Search results for "${q}" | MedGuard` : 'Search | MedGuard',
    description: `Find medical supplies matching "${q}" at MedGuard.`,
  }
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const query = sp.q || ''
  const page = parseInt(sp.page || '1', 10)
  const pageSize = parseInt(sp.pageSize || '24', 10)

  let results: ProductListResult | null = null
  if (query.trim()) {
    try {
      const data = await magentoFetch<{ products: ProductListResult }>(
        GET_SEARCH_PRODUCTS_QUERY,
        { search: query.trim(), pageSize, currentPage: page }
      )
      results = data?.products ?? null
    } catch { /* null fallback */ }
  }

  return (
    <Suspense>
      <SearchPageClient
        query={query}
        initialResults={results}
        initialPage={page}
        initialPageSize={pageSize}
      />
    </Suspense>
  )
}
