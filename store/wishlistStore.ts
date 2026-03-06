import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  skus: string[]
  toggle: (sku: string) => void
  has: (sku: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      skus: [],
      toggle: (sku) => {
        const current = get().skus
        set({
          skus: current.includes(sku)
            ? current.filter((s) => s !== sku)
            : [...current, sku],
        })
      },
      has: (sku) => get().skus.includes(sku),
      clear: () => set({ skus: [] }),
    }),
    { name: 'medguard-wishlist' }
  )
)
