'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AccountSidebar from '@/components/account/AccountSidebar'
import { useAuthStore } from '@/store/authStore'
import { MapPin, Plus } from 'lucide-react'

export default function AddressesPage() {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)

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

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h1 className="text-lg font-bold" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
                  Saved Addresses
                </h1>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  <Plus size={15} /> Add New
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <MapPin size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-500 text-sm">No saved addresses yet.</p>
                <p className="text-xs text-gray-400 mt-1">Addresses you use at checkout will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
