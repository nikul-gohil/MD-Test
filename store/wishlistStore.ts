import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  sku: string
  name: string
}

interface WishlistStore {
  items: WishlistItem[]
  toggle: (sku: string, name?: string) => void
  has: (sku: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (sku, name = '') => {
        const current = get().items
        const exists = current.some((i) => i.sku === sku)
        set({
          items: exists
            ? current.filter((i) => i.sku !== sku)
            : [...current, { sku, name }],
        })
      },
      has: (sku) => get().items.some((i) => i.sku === sku),
      clear: () => set({ items: [] }),
    }),
    { name: 'medguard-wishlist' }
  )
)
