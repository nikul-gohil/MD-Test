'use client'

import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import toast from 'react-hot-toast'

interface WishlistButtonProps {
  sku: string
  name?: string
  size?: number
}

export default function WishlistButton({ sku, name = '', size = 16 }: WishlistButtonProps) {
  const toggle = useWishlistStore((s) => s.toggle)
  const has = useWishlistStore((s) => s.has)
  const isWishlisted = has(sku)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(sku, name)
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isWishlisted ? '💔' : '❤️',
      style: { fontSize: '13px' },
    })
  }

  return (
    <button
      onClick={handleClick}
      className="w-7 h-7 flex items-center justify-center rounded-full bg-white border transition-colors hover:border-red-400"
      style={{ borderColor: isWishlisted ? '#EF4444' : '#E5E7EB' }}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        size={size}
        style={{ color: isWishlisted ? '#EF4444' : '#9CA3AF' }}
        fill={isWishlisted ? '#EF4444' : 'none'}
      />
    </button>
  )
}
