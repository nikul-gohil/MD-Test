import type { ProductDetail } from '@/lib/types'

interface ProductSchemaProps {
  product: ProductDetail
  url: string
}

export default function ProductSchema({ product, url }: ProductSchemaProps) {
  const finalPrice = product.price_range.minimum_price.final_price
  const currency = finalPrice.currency

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.meta_description || '',
    image: product.media_gallery?.map((m) => m.url) ?? [],
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: finalPrice.value.toFixed(2),
      availability: 'https://schema.org/InStock',
      url,
    },
    brand: {
      '@type': 'Brand',
      name: 'MedGuard',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
