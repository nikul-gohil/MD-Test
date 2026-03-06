import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  sku: string
  name: string
  price: number
  qty: number
  image: string
}

interface CartStore {
  cartId: string | null
  items: CartItem[]
  setCartId: (id: string) => void
  addItem: (item: CartItem) => void
  removeItem: (sku: string) => void
  updateQty: (sku: string, qty: number) => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      setCartId: (id) => set({ cartId: id }),
      addItem: (item) => {
        const existing = get().items.find((i) => i.sku === item.sku)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.sku === item.sku ? { ...i, qty: i.qty + item.qty } : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (sku) => set({ items: get().items.filter((i) => i.sku !== sku) }),
      updateQty: (sku, qty) => {
        if (qty <= 0) {
          get().removeItem(sku)
          return
        }
        set({ items: get().items.map((i) => (i.sku === sku ? { ...i, qty } : i)) })
      },
      total: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
    }),
    { name: 'medguard-cart' }
  )
)
