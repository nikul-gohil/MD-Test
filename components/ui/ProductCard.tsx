'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  sku: string
  name: string
  brand: string
  price: number
  image: string
  currency?: string
}

export default function ProductCard({
  sku,
  name,
  brand,
  price,
  image,
  currency = '€',
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = () => {
    addItem({ sku, name, price, qty: 1, image })
    toast.success(`${name} added to cart!`, {
      style: { fontFamily: 'var(--font-dm), sans-serif', fontSize: '13px' },
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/product/${sku}`} className="block relative w-full aspect-square bg-gray-50 border-b border-gray-100 overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart size={32} className="text-gray-300 mx-auto mb-1" />
              <p className="text-xs text-gray-300">No Image</p>
            </div>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{brand}</p>
        <Link href={`/product/${sku}`}>
          <h3
            className="text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors leading-snug mb-2 line-clamp-2 flex-1"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            {name}
          </h3>
        </Link>
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-0.5">As Low As</p>
          <p className="font-bold text-base" style={{ color: '#1B2B6B' }}>
            {currency}{price.toFixed(2)}
            <span className="text-xs font-normal text-gray-400 ml-1">Ex. Vat</span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 text-xs font-bold uppercase tracking-wide rounded bg-gray-100 text-navy hover:bg-orange-500 hover:text-white transition-all duration-150 flex items-center justify-center gap-1.5"
          style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          <ShoppingCart size={13} />
          ADD TO CART
        </button>
      </div>
    </div>
  )
}
