'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, MapPin, Heart, User } from 'lucide-react'
import AccountSidebar from '@/components/account/AccountSidebar'
import { useAuthStore } from '@/store/authStore'

const quickLinks = [
  { href: '/account/orders', label: 'My Orders', desc: 'View and track your orders', icon: ShoppingBag },
  { href: '/account/addresses', label: 'Addresses', desc: 'Manage delivery addresses', icon: MapPin },
  { href: '/account/wishlist', label: 'Wishlist', desc: 'View saved products', icon: Heart },
]

export default function DashboardPage() {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)
  const customer = useAuthStore((s) => s.customer)

  useEffect(() => {
    if (!token) router.replace('/account/login')
  }, [token, router])

  if (!token) return null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {/* Welcome */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: '#1B2B6B' }}>
                  {customer?.firstname?.[0] ?? <User size={22} />}
                </div>
                <div>
                  <h1 className="text-xl font-extrabold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                    Welcome back, {customer?.firstname ?? 'Customer'}!
                  </h1>
                  <p className="text-sm text-gray-500">{customer?.email}</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickLinks.map(({ href, label, desc, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#FFF7F4' }}>
                    <Icon size={20} style={{ color: '#F15A24' }} />
                  </div>
                  <p className="font-bold text-sm text-gray-800 group-hover:text-orange-500 transition-colors">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
