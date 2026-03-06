'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AccountSidebar from '@/components/account/AccountSidebar'
import { useAuthStore } from '@/store/authStore'
import { magentoFetch } from '@/lib/magentoFetch'
import { GET_CUSTOMER_ORDERS } from '@/lib/queries/customer'
import { ShoppingBag, ChevronRight } from 'lucide-react'

interface Order {
  number: string
  order_date: string
  status: string
  total: { grand_total: { value: number; currency: string } }
  items: { product_name: string; quantity_ordered: number }[]
}

export default function OrdersPage() {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) { router.replace('/account/login'); return }
    magentoFetch<{ customer: { orders: { items: Order[] } } }>(GET_CUSTOMER_ORDERS, {}, token)
      .then((d) => setOrders(d?.customer?.orders?.items ?? []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [token, router])

  if (!token) return null

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
                <h1 className="text-lg font-bold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>My Orders</h1>
              </div>

              {loading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}
                </div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <ShoppingBag size={48} className="text-gray-200 mb-4" />
                  <p className="text-gray-500 text-sm">You haven&apos;t placed any orders yet.</p>
                  <Link href="/" className="mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600">Start Shopping →</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <Link
                      key={order.number}
                      href={`/account/orders/${order.number}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-800">#{order.number}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(order.order_date).toLocaleDateString('en-IE', { dateStyle: 'medium' })}
                          {' · '}{order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold" style={{ color: '#1B2B6B' }}>
                            €{order.total.grand_total.value.toFixed(2)}
                          </p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: order.status === 'Complete' ? '#F0FDF4' : '#FFF7F4',
                              color: order.status === 'Complete' ? '#16A34A' : '#F15A24',
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                      </div>
                    </Link>
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
