'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import WishlistButton from '@/components/ui/WishlistButton'
import type { ProductDetail } from '@/lib/types'

interface ProductInfoProps {
  product: ProductDetail
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const finalPrice = product.price_range.minimum_price.final_price
  const regularPrice = product.price_range.minimum_price.regular_price
  const hasDiscount = finalPrice.value < regularPrice.value
  const currency = finalPrice.currency === 'EUR' ? '€' : finalPrice.currency
  const mainImage = product.media_gallery?.[0]?.url || ''

  const handleAddToCart = () => {
    addItem({ sku: product.sku, name: product.name, price: finalPrice.value, qty, image: mainImage })
    toast.success(`${product.name} added to cart!`, { style: { fontSize: '13px' } })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Brand / SKU */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          {product.categories?.[0]?.name ?? ''}
        </p>
        <h1 className="text-2xl font-extrabold leading-snug" style={{ color: '#1B2B6B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {product.name}
        </h1>
        <p className="text-xs text-gray-400 mt-1">SKU: <span className="font-medium text-gray-600">{product.sku}</span></p>
      </div>

      {/* Price */}
      <div className="border-t border-b border-gray-100 py-4">
        <p className="text-xs text-gray-400 mb-1">As Low As</p>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold" style={{ color: hasDiscount ? '#F15A24' : '#1B2B6B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {currency}{finalPrice.value.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">Ex. Vat</span>
          {hasDiscount && (
            <span className="text-base text-gray-400 line-through">{currency}{regularPrice.value.toFixed(2)}</span>
          )}
        </div>
        {hasDiscount && (
          <p className="text-xs font-semibold text-green-600 mt-1">
            You save {currency}{(regularPrice.value - finalPrice.value).toFixed(2)}
          </p>
        )}
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Qty:</span>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              value={qty}
              min={1}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center text-sm font-medium outline-none border-x border-gray-200 py-2"
            />
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 text-sm font-bold uppercase tracking-wide rounded-lg flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#F15A24', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <WishlistButton sku={product.sku} name={product.name} size={18} />
        </div>
      </div>

      {/* Trust icons */}
      <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
        {[
          { icon: Truck, label: 'Free Delivery' },
          { icon: Shield, label: 'Secure Checkout' },
          { icon: RotateCcw, label: 'Easy Returns' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
            <Icon size={14} style={{ color: '#1B2B6B' }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
