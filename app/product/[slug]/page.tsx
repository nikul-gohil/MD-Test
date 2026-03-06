import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { magentoFetch } from '@/lib/magentoFetch'
import { GET_PRODUCT_DETAIL_QUERY } from '@/lib/queries/products'
import type { ProductDetail } from '@/lib/types'
import ProductGallery from '@/components/pdp/ProductGallery'
import ProductInfo from '@/components/pdp/ProductInfo'
import ProductTabs from '@/components/pdp/ProductTabs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import RelatedProducts from '@/components/pdp/RelatedProducts'
import ProductSchema from '@/components/seo/ProductSchema'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function fetchProduct(sku: string): Promise<ProductDetail | null> {
  try {
    const data = await magentoFetch<{ products: { items: ProductDetail[] } }>(
      GET_PRODUCT_DETAIL_QUERY,
      { sku }
    )
    return data?.products?.items?.[0] ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProduct(slug)
  if (!product) return { title: 'Product | MedGuard' }
  return {
    title: product.meta_title || `${product.name} | MedGuard`,
    description: product.meta_description || `Buy ${product.name} at MedGuard — Ireland's leading medical supplier.`,
    openGraph: {
      title: product.meta_title || product.name,
      description: product.meta_description || '',
      images: product.media_gallery?.[0]?.url ? [{ url: product.media_gallery[0].url }] : [],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await fetchProduct(slug)

  if (!product) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medguard.ie'

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(product.categories?.[0]
      ? [{ label: product.categories[0].name, href: `/category/${product.categories[0].url_path}` }]
      : []),
    { label: product.name, href: undefined },
  ]

  // Preload the main product image — placed in <head> by Next.js hoisting
  const firstImageUrl = product.media_gallery?.find((m) => m.url)?.url
  const preloadHref = firstImageUrl
    ? `/_next/image?url=${encodeURIComponent(firstImageUrl)}&w=828&q=75`
    : null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Preload LCP image before any JS executes */}
      {preloadHref && (
        // eslint-disable-next-line @next/next/no-head-element
        <link rel="preload" as="image" href={preloadHref} fetchPriority="high" />
      )}
      <ProductSchema product={product} url={`${siteUrl}/product/${slug}`} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Main product section — no Suspense: ProductGallery is a client component
            that renders synchronously on the server; wrapping in Suspense delays
            the priority image preload into a stream chunk instead of the initial <head> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <ProductGallery
            images={product.media_gallery ?? []}
            productName={product.name}
          />

          <ProductInfo product={product} />
        </div>

        {/* Tabs: Description / Specifications / Reviews */}
        <div className="mb-10">
          <ProductTabs product={product} />
        </div>

        {/* Related products */}
        {product.related_products && product.related_products.length > 0 && (
          <RelatedProducts products={product.related_products} />
        )}
      </div>
    </div>
  )
}
