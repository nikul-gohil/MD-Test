'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  const subtotal = total()
  const itemCount = items.reduce((a, i) => a + i.qty, 0)

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} style={{ color: '#1B2B6B' }} />
            <h2 className="font-bold text-base" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
              Cart ({itemCount})
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <ShoppingCart size={48} className="text-gray-200" />
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 p-4 space-y-0">
              {items.map((item) => (
                <div key={item.sku} className="flex gap-3 py-4">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg bg-gray-50 overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="64px" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">€{item.price.toFixed(2)} each</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                        <button onClick={() => updateQty(item.sku, item.qty - 1)} className="px-2 py-1 hover:bg-gray-50 text-gray-600">
                          <Minus size={10} />
                        </button>
                        <span className="px-2 text-xs font-medium border-x border-gray-200">{item.qty}</span>
                        <button onClick={() => updateQty(item.sku, item.qty + 1)} className="px-2 py-1 hover:bg-gray-50 text-gray-600">
                          <Plus size={10} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold" style={{ color: '#1B2B6B' }}>€{(item.price * item.qty).toFixed(2)}</p>
                        <button onClick={() => removeItem(item.sku)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-600">Subtotal (ex. VAT)</span>
              <span style={{ color: '#1B2B6B' }}>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex-1 py-2.5 text-center text-sm font-semibold border-2 rounded-lg transition-colors"
                style={{ borderColor: '#1B2B6B', color: '#1B2B6B' }}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex-1 py-2.5 text-center text-sm font-bold text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
