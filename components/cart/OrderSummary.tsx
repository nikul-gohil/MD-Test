'use client'

import Link from 'next/link'
import { ShoppingBag, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function OrderSummary({ checkoutMode = false }: { checkoutMode?: boolean }) {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)

  const subtotal = total()
  const shipping = subtotal >= 75 ? 0 : 6.99
  const vat = subtotal * 0.23
  const grandTotal = subtotal + shipping + vat

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-lg" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Order Summary
        </h2>
      </div>

      <div className="p-5 space-y-3">
        {/* Line items summary */}
        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div key={item.sku} className="flex justify-between text-gray-600">
              <span className="truncate flex-1 pr-4">{item.name} × {item.qty}</span>
              <span className="shrink-0 font-medium">€{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal (ex. VAT)</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>VAT (23%)</span>
            <span>€{vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `€${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-gray-400">
              Free shipping on orders over €75
            </p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-extrabold text-base" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            <span>Total (inc. VAT)</span>
            <span>€{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Promo code (UI only) */}
        {!checkoutMode && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex gap-2">
              <div className="flex items-center flex-1 border border-gray-200 rounded-lg px-3 gap-2">
                <Tag size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 text-sm py-2 outline-none bg-transparent"
                />
              </div>
              <button className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                Apply
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        {!checkoutMode && (
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity mt-2"
            style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            <ShoppingBag size={16} />
            Proceed to Checkout
          </Link>
        )}
      </div>
    </div>
  )
}
