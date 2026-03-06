'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AccountSidebar from '@/components/account/AccountSidebar'
import { useAuthStore } from '@/store/authStore'
import { magentoFetch } from '@/lib/magentoFetch'
import { GET_CUSTOMER_ORDERS } from '@/lib/queries/customer'
import { ArrowLeft } from 'lucide-react'

interface Order {
  number: string
  order_date: string
  status: string
  total: { grand_total: { value: number; currency: string } }
  items: { product_name: string; quantity_ordered: number; product_sale_price: { value: number } }[]
  shipping_address: {
    firstname: string
    lastname: string
    street: string[]
    city: string
    postcode: string
    country_code: string
    region: { region_code: string } | null
  } | null
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const token = useAuthStore((s) => s.token)
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) { router.replace('/account/login'); return }
    magentoFetch<{ customer: { orders: { items: Order[] } } }>(GET_CUSTOMER_ORDERS, {}, token)
      .then((d) => {
        const found = d?.customer?.orders?.items?.find((o) => o.number === id)
        setOrder(found ?? null)
      })
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [token, id, router])

  if (!token) return null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors">
              <ArrowLeft size={14} /> Back to Orders
            </Link>

            {loading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}
              </div>
            ) : !order ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">Order not found.</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-lg font-bold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                        Order #{order.number}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {new Date(order.order_date).toLocaleDateString('en-IE', { dateStyle: 'long' })}
                      </p>
                    </div>
                    <span
                      className="text-sm px-3 py-1 rounded-full font-semibold"
                      style={{
                        backgroundColor: order.status === 'Complete' ? '#F0FDF4' : '#FFF7F4',
                        color: order.status === 'Complete' ? '#16A34A' : '#F15A24',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-none text-sm">
                        <div>
                          <p className="font-medium text-gray-800">{item.product_name}</p>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity_ordered}</p>
                        </div>
                        <p className="font-bold" style={{ color: '#1B2B6B' }}>
                          €{(item.product_sale_price.value * item.quantity_ordered).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <p className="text-base font-extrabold" style={{ color: '#1B2B6B' }}>
                      Total: €{order.total.grand_total.value.toFixed(2)}
                    </p>
                  </div>
                </div>

                {order.shipping_address && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-sm font-bold text-gray-700 mb-3">Shipping Address</h2>
                    <p className="text-sm text-gray-600">
                      {order.shipping_address.firstname} {order.shipping_address.lastname}<br />
                      {order.shipping_address.street.join(', ')}<br />
                      {order.shipping_address.city}, {order.shipping_address.postcode}<br />
                      {order.shipping_address.country_code}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
