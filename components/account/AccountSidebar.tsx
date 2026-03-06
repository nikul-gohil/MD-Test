'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, MapPin, Heart, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
]

export default function AccountSidebar() {
  const pathname = usePathname()
  const logout = useAuthStore((s) => s.logout)
  const customer = useAuthStore((s) => s.customer)
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {customer && (
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="text-sm font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
            {customer.firstname} {customer.lastname}
          </p>
          <p className="text-xs text-gray-500">{customer.email}</p>
        </div>
      )}

      <nav className="p-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: active ? '#FFF7F4' : 'transparent',
                color: active ? '#F15A24' : '#374151',
              }}
            >
              <Icon size={16} style={{ color: active ? '#F15A24' : '#9CA3AF' }} />
              {label}
            </Link>
          )
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>
    </div>
  )
}
