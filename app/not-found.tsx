import Link from 'next/link'
import { Home, Search, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="text-center max-w-lg">
        <p className="text-8xl font-extrabold mb-4" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          404
        </p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#F15A24' }}
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition-colors"
          >
            <Search size={16} />
            Search Products
          </Link>
          <Link
            href="/category/consumables"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition-colors"
          >
            <ShoppingBag size={16} />
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
