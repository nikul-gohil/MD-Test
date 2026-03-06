'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import WishlistButton from '@/components/ui/WishlistButton'
import type { ProductListItem } from '@/lib/types'

interface ProductGridProps {
  products: ProductListItem[]
  view?: 'grid' | 'list'
}

function PLPProductCard({ product, priority = false }: { product: ProductListItem; priority?: boolean }) {
  const addItem = useCartStore((s) => s.addItem)
  const finalPrice = product.price_range.minimum_price.final_price
  const regularPrice = product.price_range.minimum_price.regular_price
  const hasDiscount = regularPrice && finalPrice.value < regularPrice.value
  const currency = finalPrice.currency === 'EUR' ? '€' : finalPrice.currency

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, price: finalPrice.value, qty: 1, image: product.small_image?.url || '' })
    toast.success(`${product.name} added to cart!`, { style: { fontSize: '13px' } })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-200 flex flex-col relative">
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton sku={product.sku} />
      </div>

      <Link href={`/product/${product.sku}`} className="block">
        <div className="relative aspect-square bg-gray-50 border-b border-gray-100 overflow-hidden">
          {product.small_image?.url ? (
            <Image
              src={product.small_image.url}
              alt={product.small_image.label || product.name}
              fill
              priority={priority}
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link href={`/product/${product.sku}`}>
          <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2 hover:text-orange-500 transition-colors" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
            {product.name}
          </h3>
        </Link>
        <div className="mb-3 mt-auto">
          <p className="text-xs text-gray-400 mb-0.5">As Low As</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="font-bold text-base" style={{ color: hasDiscount ? '#F15A24' : '#1B2B6B' }}>
              {currency}{finalPrice.value.toFixed(2)}
              <span className="text-xs font-normal text-gray-400 ml-1">Ex. Vat</span>
            </p>
            {hasDiscount && <p className="text-xs text-gray-400 line-through">{currency}{regularPrice.value.toFixed(2)}</p>}
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="w-full py-2 text-xs font-bold uppercase tracking-wide rounded flex items-center justify-center gap-1.5 transition-all duration-150 bg-gray-100 hover:bg-orange-500 hover:text-white"
          style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          <ShoppingCart size={13} />
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

function PLPProductRow({ product }: { product: ProductListItem }) {
  const addItem = useCartStore((s) => s.addItem)
  const finalPrice = product.price_range.minimum_price.final_price
  const regularPrice = product.price_range.minimum_price.regular_price
  const hasDiscount = regularPrice && finalPrice.value < regularPrice.value
  const currency = finalPrice.currency === 'EUR' ? '€' : finalPrice.currency

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, price: finalPrice.value, qty: 1, image: product.small_image?.url || '' })
    toast.success(`${product.name} added to cart!`, { style: { fontSize: '13px' } })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex gap-4 p-3 hover:shadow-md transition-shadow">
      <Link href={`/product/${product.sku}`} className="shrink-0">
        <div className="relative w-24 h-24 bg-gray-50 border border-gray-100 rounded overflow-hidden">
          {product.small_image?.url ? (
            <Image src={product.small_image.url} alt={product.name} fill className="object-contain p-2" sizes="96px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><ShoppingCart size={20} className="text-gray-300" /></div>
          )}
        </div>
      </Link>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link href={`/product/${product.sku}`}>
            <h3 className="text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>{product.name}</h3>
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku}</p>
        </div>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex items-baseline gap-2">
            <p className="font-bold" style={{ color: hasDiscount ? '#F15A24' : '#1B2B6B' }}>
              {currency}{finalPrice.value.toFixed(2)}<span className="text-xs font-normal text-gray-400 ml-1">Ex. Vat</span>
            </p>
            {hasDiscount && <p className="text-xs text-gray-400 line-through">{currency}{regularPrice.value.toFixed(2)}</p>}
          </div>
          <div className="flex items-center gap-2">
            <WishlistButton sku={product.sku} />
            <button onClick={handleAdd} className="px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-opacity hover:opacity-90" style={{ backgroundColor: '#F15A24', color: 'white' }}>
              <ShoppingCart size={12} />Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid({ products, view = 'grid' }: ProductGridProps) {
  if (view === 'list') {
    return <div className="space-y-3">{products.map((p) => <PLPProductRow key={p.id} product={p} />)}</div>
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p, i) => <PLPProductCard key={p.id} product={p} priority={i < 4} />)}
    </div>
  )
}
