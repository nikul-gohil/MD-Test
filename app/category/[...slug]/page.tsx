import { Suspense } from 'react'
import type { Metadata } from 'next'
import { magentoFetch } from '@/lib/magentoFetch'
import { GET_CATEGORY_PRODUCTS_QUERY, GET_CATEGORY_BY_URL_PATH_QUERY } from '@/lib/queries/products'
import type { ProductListResult } from '@/lib/types'
import CategoryPageClient from './CategoryPageClient'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

function CategorySkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-xl p-5 shadow-sm h-96 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-6" />
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<Record<string, string>>
}

async function fetchCategoryData(urlPath: string, page: number, pageSize: number, sort: string, minPrice?: string, maxPrice?: string) {
  // Build filter
  const filters: Record<string, unknown> = { category_id: { eq: urlPath } }
  if (minPrice || maxPrice) {
    filters.price = { from: minPrice || '0', to: maxPrice || '999999' }
  }

  // Build sort
  const [field, dir] = sort.split('_')
  const sortInput: Record<string, string> = {}
  if (field && dir) sortInput[field] = dir

  const [categoryRes, productsRes] = await Promise.allSettled([
    magentoFetch<{ categoryList: { id: number; name: string; description: string; url_path: string; image: string | null; meta_title: string | null; meta_description: string | null }[] }>(
      GET_CATEGORY_BY_URL_PATH_QUERY,
      { url_path: urlPath }
    ),
    magentoFetch<{ products: ProductListResult }>(GET_CATEGORY_PRODUCTS_QUERY, {
      filters,
      sort: Object.keys(sortInput).length ? sortInput : { position: 'ASC' },
      pageSize,
      currentPage: page,
    }),
  ])

  const category = categoryRes.status === 'fulfilled' ? categoryRes.value?.categoryList?.[0] ?? null : null
  const products = productsRes.status === 'fulfilled' ? productsRes.value?.products ?? null : null

  return { category, products }
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const urlPath = slug.join('/')
  try {
    const data = await magentoFetch<{ categoryList: { name: string; meta_title: string | null; meta_description: string | null }[] }>(
      GET_CATEGORY_BY_URL_PATH_QUERY, { url_path: urlPath }
    )
    const cat = data?.categoryList?.[0]
    if (cat) {
      return {
        title: cat.meta_title || `${cat.name} | MedGuard`,
        description: cat.meta_description || `Shop ${cat.name} at MedGuard — Ireland's leading medical supplier.`,
      }
    }
  } catch { /* fallback */ }
  void searchParams
  return { title: 'Category | MedGuard' }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sp = await searchParams
  const urlPath = slug.join('/')

  // We need the category ID for filtering — Magento's category_id filter takes the integer ID
  // First fetch category to get its ID
  let categoryId: string = urlPath
  let categoryName = ''
  let categoryMeta = { title: '', description: '', image: null as string | null }

  try {
    const catData = await magentoFetch<{ categoryList: { id: number; name: string; description: string; url_path: string; image: string | null; meta_title: string | null; meta_description: string | null }[] }>(
      GET_CATEGORY_BY_URL_PATH_QUERY, { url_path: urlPath }
    )
    const cat = catData?.categoryList?.[0]
    if (cat) {
      categoryId = String(cat.id)
      categoryName = cat.name
      categoryMeta = { title: cat.meta_title || cat.name, description: cat.description || '', image: cat.image }
    }
  } catch { /* use urlPath as fallback */ }

  const page = parseInt(sp.page || '1', 10)
  const pageSize = parseInt(sp.pageSize || '24', 10)
  const sort = sp.sort || 'position_ASC'
  const minPrice = sp.min_price
  const maxPrice = sp.max_price

  const [sortField, sortDir] = sort.split('_')
  const sortInput: Record<string, string> = {}
  if (sortField && sortDir) sortInput[sortField] = sortDir

  const filters: Record<string, unknown> = { category_id: { eq: categoryId } }
  if (minPrice || maxPrice) filters.price = { from: minPrice || '0', to: maxPrice || '999999' }

  let productsData: ProductListResult | null = null
  try {
    const res = await magentoFetch<{ products: ProductListResult }>(GET_CATEGORY_PRODUCTS_QUERY, {
      filters,
      sort: Object.keys(sortInput).length ? sortInput : { position: 'ASC' },
      pageSize,
      currentPage: page,
    })
    productsData = res?.products ?? null
  } catch { /* null fallback */ }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: categoryName || urlPath, href: undefined },
  ]

  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryPageClient
        categoryName={categoryName || urlPath}
        categoryMeta={categoryMeta}
        breadcrumbs={breadcrumbs}
        urlPath={urlPath}
        categoryId={categoryId}
        initialProducts={productsData}
        initialPage={page}
        initialPageSize={pageSize}
        initialSort={sort}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
      />
    </Suspense>
  )
}
