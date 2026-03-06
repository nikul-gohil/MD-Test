'use client'

import Link from 'next/link'
import Image from 'next/image'
import AccountSidebar from '@/components/account/AccountSidebar'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { items: wishlist, toggle } = useWishlistStore()
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h1 className="text-lg font-bold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                  My Wishlist ({wishlist.length})
                </h1>
              </div>

              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <Heart size={48} className="text-gray-200 mb-4" />
                  <p className="text-gray-500 text-sm">Your wishlist is empty.</p>
                  <Link href="/" className="mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600">
                    Browse Products →
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {wishlist.map((item) => (
                    <div key={item.sku} className="flex items-center gap-4 px-6 py-4">
                      {/* Image */}
                      <Link href={`/product/${item.sku}`} className="relative w-16 h-16 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <Heart size={20} className="text-gray-300" />
                        </div>
                      </Link>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.sku}`}
                          className="text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5">SKU: {item.sku}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            addItem({ sku: item.sku, name: item.name, price: 0, qty: 1, image: '' })
                            toast.success('Added to cart')
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: '#F15A24' }}
                        >
                          <ShoppingCart size={13} /> Add to Cart
                        </button>
                        <button
                          onClick={() => { toggle(item.sku, item.name); toast.success('Removed from wishlist') }}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
