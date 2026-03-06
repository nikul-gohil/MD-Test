'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function CartItemList() {
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  if (items.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-lg" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Your Cart ({items.reduce((a, i) => a + i.qty, 0)} items)
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.sku} className="flex gap-4 p-5">
            {/* Image */}
            <Link href={`/product/${item.sku}`} className="relative w-20 h-20 shrink-0 rounded-lg bg-gray-50 overflow-hidden">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="80px" />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg" />
              )}
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${item.sku}`}
                className="text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors line-clamp-2"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {item.name}
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">SKU: {item.sku}</p>

              <div className="flex items-center justify-between mt-3">
                {/* Qty stepper */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQty(item.sku, item.qty - 1)}
                    className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 text-sm font-medium border-x border-gray-200">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.sku, item.qty + 1)}
                    className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-base font-extrabold" style={{ color: '#1B2B6B' }}>
                    €{(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.sku)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
