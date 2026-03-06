'use client'

import Link from 'next/link'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import CartItemList from '@/components/cart/CartItemList'
import OrderSummary from '@/components/cart/OrderSummary'
import EmptyState from '@/components/ui/EmptyState'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const items = useCartStore((s) => s.items)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart size={22} style={{ color: '#1B2B6B' }} />
          <h1 className="text-2xl font-extrabold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-8">
            <EmptyState
              type="cart"
              title="Your cart is empty"
              message="Browse our products and add items to your cart."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <CartItemList />
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
