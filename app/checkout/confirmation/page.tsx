'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ShoppingBag, Home } from 'lucide-react'
import { Suspense } from 'react'

function ConfirmationContent() {
  const sp = useSearchParams()
  const orderNum = sp.get('order') || 'MG000000'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
            <CheckCircle size={44} className="text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold mb-2" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Order Confirmed!
        </h1>
        <p className="text-gray-500 text-sm mb-1">Thank you for your order.</p>
        <p className="text-gray-700 font-semibold mb-6">
          Order #{orderNum}
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 text-left space-y-2">
          <p>✓ A confirmation email has been sent to you.</p>
          <p>✓ Your order will be dispatched within 1 business day.</p>
          <p>✓ Free next-day delivery for orders over €75.</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/account/orders"
            className="flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#F15A24' }}
          >
            <ShoppingBag size={16} />
            Track Your Order
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition-colors"
          >
            <Home size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  )
}
