import Link from 'next/link'
import { ShoppingBag, Search, Heart, Package } from 'lucide-react'

type EmptyType = 'cart' | 'search' | 'wishlist' | 'orders' | 'generic'

interface EmptyStateProps {
  type?: EmptyType
  title?: string
  message?: string
  actionLabel?: string
  actionHref?: string
}

const DEFAULTS: Record<EmptyType, { icon: React.ElementType; title: string; message: string; actionLabel: string; actionHref: string }> = {
  cart: {
    icon: ShoppingBag,
    title: 'Your cart is empty',
    message: 'Add some products to get started.',
    actionLabel: 'Continue Shopping',
    actionHref: '/',
  },
  search: {
    icon: Search,
    title: 'No products found',
    message: 'Try a different search term or browse our categories.',
    actionLabel: 'Browse Categories',
    actionHref: '/',
  },
  wishlist: {
    icon: Heart,
    title: 'Your wishlist is empty',
    message: 'Save products you love by clicking the heart icon.',
    actionLabel: 'Browse Products',
    actionHref: '/',
  },
  orders: {
    icon: Package,
    title: 'No orders yet',
    message: 'Your order history will appear here.',
    actionLabel: 'Start Shopping',
    actionHref: '/',
  },
  generic: {
    icon: Package,
    title: 'Nothing here yet',
    message: '',
    actionLabel: 'Go Home',
    actionHref: '/',
  },
}

export default function EmptyState({ type = 'generic', title, message, actionLabel, actionHref }: EmptyStateProps) {
  const defaults = DEFAULTS[type]
  const Icon = defaults.icon
  const displayTitle = title ?? defaults.title
  const displayMessage = message ?? defaults.message
  const displayActionLabel = actionLabel ?? defaults.actionLabel
  const displayActionHref = actionHref ?? defaults.actionHref

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#EBF3FF' }}>
        <Icon size={28} style={{ color: '#1B2B6B' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
        {displayTitle}
      </h3>
      {displayMessage && <p className="text-gray-500 text-sm mb-6 max-w-xs">{displayMessage}</p>}
      <Link
        href={displayActionHref}
        className="px-6 py-2.5 text-sm font-bold text-white rounded transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {displayActionLabel}
      </Link>
    </div>
  )
}
