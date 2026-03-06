'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import StepIndicator from '@/components/checkout/StepIndicator'
import ShippingStep, { type ShippingData } from '@/components/checkout/ShippingStep'
import PaymentStep from '@/components/checkout/PaymentStep'
import OrderSummary from '@/components/cart/OrderSummary'
import EmptyState from '@/components/ui/EmptyState'
import Image from 'next/image'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState<ShippingData | null>(null)
  const [isPlacing, setIsPlacing] = useState(false)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4">
          <EmptyState type="cart" title="Your cart is empty" message="Add items before checking out." />
        </div>
      </div>
    )
  }

  async function handlePlaceOrder() {
    setIsPlacing(true)
    // Simulate network delay — real integration would call Magento placeOrder mutation
    await new Promise((r) => setTimeout(r, 1200))
    useCartStore.getState().items.forEach((i) => useCartStore.getState().removeItem(i.sku))
    router.push('/checkout/confirmation?order=MG' + Math.floor(100000 + Math.random() * 900000))
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back to cart */}
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Cart
        </Link>

        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main form */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
            {step === 1 && (
              <ShippingStep
                onNext={(data) => { setShipping(data); setStep(2) }}
                defaultValues={shipping ?? undefined}
              />
            )}

            {step === 2 && (
              <PaymentStep
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                  Review & Place Order
                </h2>

                {/* Shipping address summary */}
                {shipping && (
                  <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                    <p className="font-semibold text-gray-700 mb-2">Delivering to:</p>
                    <p>{shipping.firstname} {shipping.lastname}</p>
                    {shipping.company && <p>{shipping.company}</p>}
                    <p>{shipping.street}</p>
                    <p>{shipping.city}{shipping.postcode ? `, ${shipping.postcode}` : ''}</p>
                    <p>{shipping.country}</p>
                    <p className="text-gray-500">{shipping.email}</p>
                    <button onClick={() => setStep(1)} className="text-xs text-orange-500 hover:text-orange-600 font-medium mt-2">Edit</button>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.sku} className="flex items-center gap-3 text-sm">
                      <div className="relative w-12 h-12 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        {item.image && <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="48px" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold shrink-0" style={{ color: '#1B2B6B' }}>€{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacing}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
                  >
                    {isPlacing ? 'Placing Order…' : <><Check size={16} /> Place Order</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2">
            <OrderSummary checkoutMode />
          </div>
        </div>
      </div>
    </div>
  )
}
