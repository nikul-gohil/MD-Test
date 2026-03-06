import { client } from '@/lib/apolloClient'
import { GET_TOP_CATEGORIES } from '@/lib/queries/categories'
import { GET_FEATURED_PRODUCTS } from '@/lib/queries/products'
import HeroBanner from '@/components/home/HeroBanner'
import TrustedBrands from '@/components/home/TrustedBrands'
import TopCategories from '@/components/home/TopCategories'
import PromoBanners from '@/components/home/PromoBanners'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TopBrands from '@/components/home/TopBrands'
import Testimonial from '@/components/home/Testimonial'
import TrustBar from '@/components/home/TrustBar'
import type { CategoryItem, FeaturedProduct } from '@/lib/types'

export const revalidate = 60

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' }

const SKIP_CATEGORIES = ['test', 'mg brand']

export default async function HomePage() {
  // ── 1. Fetch top-level categories ──────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawCategories: any[] = []
  try {
    const result = await client.query({ query: GET_TOP_CATEGORIES, fetchPolicy: 'network-only' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rawCategories = (result.data as any)?.categoryList ?? []
  } catch {
    // Magento unreachable — components will render static fallback data
  }

  const displayCategories: CategoryItem[] = rawCategories
    .filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (c: any) =>
        !SKIP_CATEGORIES.some((s) => c.name.toLowerCase().includes(s)) &&
        c.product_count > 5
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((c: any) => ({
      id: String(c.id),
      name: c.name,
      url_path: c.url_path,
      product_count: c.product_count,
      image: c.image ?? null,
    }))

  // ── 2. Fetch products from the top 4 categories in parallel ────────────
  const featuredCats = displayCategories.slice(0, 4)

  const productResults = await Promise.allSettled(
    featuredCats.map((cat) =>
      client
        .query({
          query: GET_FEATURED_PRODUCTS,
          variables: { categoryId: cat.id, pageSize: 6 },
          fetchPolicy: 'network-only',
        })
        .then((result) => ({
          tabCategory: cat.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items: (result.data as any)?.products?.items ?? [],
        }))
    )
  )

  const products: FeaturedProduct[] = productResults.flatMap((r) => {
    if (r.status !== 'fulfilled') return []
    const { tabCategory, items } = r.value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((p: any) => ({
      sku: p.sku as string,
      name: p.name as string,
      // manufacturer returns an option ID (number) in Magento — skip if not a plain string
      brand: typeof p.manufacturer === 'string' ? p.manufacturer : '',
      price: (p.price_range?.minimum_price?.final_price?.value ?? 0) as number,
      image: (p.small_image?.url ?? '') as string,
      currency: CURRENCY_SYMBOLS[p.price_range?.minimum_price?.final_price?.currency] ?? '€',
      tabCategory,
    }))
  })

  return (
    <main>
      <HeroBanner />
      <TrustedBrands />
      <TopCategories categories={displayCategories} />
      <PromoBanners />
      <FeaturedProducts products={products} />
      <TopBrands />
      <Testimonial />
      <TrustBar />
    </main>
  )
}
