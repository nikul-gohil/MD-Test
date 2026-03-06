import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import type { ProductListItem } from '@/lib/types'

interface RelatedProductsProps {
  products: ProductListItem[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null

  return (
    <div>
      <h2
        className="text-xl font-extrabold mb-5"
        style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, 5).map((p) => {
          const price = p.price_range.minimum_price.final_price
          const currency = price.currency === 'EUR' ? '€' : price.currency

          return (
            <Link
              key={p.id}
              href={`/product/${p.sku}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50">
                {p.small_image?.url ? (
                  <Image
                    src={p.small_image.url}
                    alt={p.small_image.label || p.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCart size={32} className="text-gray-200" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p
                  className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                  {p.name}
                </p>
                <p className="text-sm font-extrabold" style={{ color: '#1B2B6B' }}>
                  {currency}{price.value.toFixed(2)}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
