'use client'

import { useState } from 'react'
import { CreditCard, Building2, ArrowLeft } from 'lucide-react'

interface PaymentStepProps {
  onBack: () => void
  onNext: (method: string) => void
  isLoading?: boolean
}

export default function PaymentStep({ onBack, onNext, isLoading }: PaymentStepProps) {
  const [method, setMethod] = useState<'card' | 'invoice'>('card')

  const methods = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Secure card payment via Stripe' },
    { id: 'invoice', label: 'Pay by Invoice', icon: Building2, desc: 'For approved business accounts' },
  ] as const

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
        Payment Method
      </h2>

      <div className="space-y-3">
        {methods.map(({ id, label, icon: Icon, desc }) => (
          <label
            key={id}
            className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors"
            style={{ borderColor: method === id ? '#F15A24' : '#E5E7EB', backgroundColor: method === id ? '#FFF7F4' : '#fff' }}
          >
            <input
              type="radio"
              name="payment"
              value={id}
              checked={method === id}
              onChange={() => setMethod(id)}
              className="accent-orange-500"
            />
            <Icon size={20} style={{ color: method === id ? '#F15A24' : '#9CA3AF' }} />
            <div>
              <p className="text-sm font-semibold text-gray-800">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          </label>
        ))}
      </div>

      {method === 'card' && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry</label>
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                maxLength={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
            />
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          onClick={() => onNext(method)}
          disabled={isLoading}
          className="flex-1 py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          {isLoading ? 'Processing…' : 'Review Order →'}
        </button>
      </div>
    </div>
  )
}
