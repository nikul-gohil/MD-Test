import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Customer } from '@/lib/types'

interface AuthStore {
  token: string | null
  customer: Customer | null
  setToken: (token: string) => void
  setCustomer: (customer: Customer) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      customer: null,
      setToken: (token) => set({ token }),
      setCustomer: (customer) => set({ customer }),
      logout: () => set({ token: null, customer: null }),
    }),
    { name: 'medguard-auth' }
  )
)
