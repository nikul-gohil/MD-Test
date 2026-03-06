'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Search,
  Phone,
  User,
  Heart,
  ShoppingCart,
  Truck,
  X,
  Menu,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { magentoFetch } from '@/lib/magentoFetch'
import { GET_SEARCH_PRODUCTS_QUERY } from '@/lib/queries/products'
import type { NavCategory, ProductListItem } from '@/lib/types'
import CartDrawer from '@/components/cart/CartDrawer'

interface HeaderProps {
  navCategories?: NavCategory[]
}

const STATIC_NAV_NAMES = [
  'Consumables',
  'Diagnostics',
  'Equipment & Furniture',
  'First Aid',
  'Hygiene',
  'Minor Surgery',
  'Physiotherapy',
  'Simulation',
]

const topLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Header({ navCategories = [] }: HeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<ProductListItem[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [showClearanceBadge, setShowClearanceBadge] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)
  const itemCount = items.reduce((acc, i) => acc + i.qty, 0)

  // Separate CLEARANCE for special treatment
  const clearanceCat = navCategories.find((c) => c.name.toLowerCase() === 'clearance')
  const mainNavCats = navCategories.filter((c) => c.name.toLowerCase() !== 'clearance')

  const staticFallback: NavCategory[] = STATIC_NAV_NAMES.map((name, i) => ({
    id: `static-${i}`,
    name,
    url_path: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    product_count: 0,
    image: null,
    children: [],
  }))
  const displayNav = mainNavCats.length > 0 ? mainNavCats : staticFallback

  const activeCat = mainNavCats.find((c) => c.id === activeMenu) ?? null
  const subCount = activeCat?.children.length ?? 0
  const columnCount = subCount <= 4 ? 2 : subCount <= 9 ? 3 : 4

  // Debounced search
  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    setSearchLoading(true)
    try {
      const data = await magentoFetch<{ products: { items: ProductListItem[] } }>(
        GET_SEARCH_PRODUCTS_QUERY,
        { search: q.trim(), pageSize: 6, currentPage: 1 }
      )
      setSuggestions(data?.products?.items ?? [])
      setShowSuggestions(true)
    } catch {
      setSuggestions([])
    } finally {
      setSearchLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(searchQuery), 350)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchQuery, fetchSuggestions])

  useEffect(() => { setMounted(true) }, [])

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const SearchBox = ({ mobile = false }: { mobile?: boolean }) => (
    <form onSubmit={handleSearchSubmit} className={mobile ? 'flex border border-gray-200 rounded-md overflow-hidden' : 'flex w-full border border-gray-200 rounded-md overflow-hidden'}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        placeholder="Search Product..."
        className="flex-1 px-4 py-2 text-sm outline-none text-gray-700 bg-white"
      />
      <button
        type="submit"
        style={{ backgroundColor: '#F15A24' }}
        className="px-4 flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Search size={mobile ? 16 : 18} className="text-white" />
      </button>
    </form>
  )

  return (
    <>
    <header className="w-full sticky top-0 z-50 shadow-sm">

      {/* ── Top Bar ──────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#1B2B6B' }} className="py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5">
            <Truck size={13} className="text-orange-400" />
            <span>Order <strong>TODAY</strong>, Delivered <strong>TOMORROW</strong></span>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            {topLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-orange-400 transition-colors duration-150">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Middle Bar ───────────────────────────────────────────────── */}
      <div className="bg-white py-3 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="grid grid-cols-3 gap-0.5 w-7 h-7">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{ backgroundColor: i === 4 ? '#E53935' : '#1B2B6B', width: '6px', height: '6px' }}
                />
              ))}
            </div>
            <span className="font-extrabold text-xl tracking-widest" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
              MEDGUARD
            </span>
          </Link>

          {/* Desktop Search with suggestions */}
          <div className="flex-1 max-w-2xl mx-auto hidden md:block relative" ref={searchRef}>
            <SearchBox />

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                {searchLoading ? (
                  <div className="p-3 text-sm text-gray-400 text-center">Searching…</div>
                ) : suggestions.length === 0 ? (
                  <div className="p-3 text-sm text-gray-400 text-center">No results for &quot;{searchQuery}&quot;</div>
                ) : (
                  <>
                    {suggestions.map((p) => {
                      const price = p.price_range.minimum_price.final_price
                      const currency = price.currency === 'EUR' ? '€' : price.currency
                      return (
                        <Link
                          key={p.id}
                          href={`/product/${p.url_key}`}
                          onClick={() => setShowSuggestions(false)}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-none transition-colors"
                        >
                          {p.small_image?.url && (
                            <div className="relative w-10 h-10 shrink-0 rounded bg-gray-50 overflow-hidden">
                              <Image src={p.small_image.url} alt={p.name} fill className="object-contain p-1" sizes="40px" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                          </div>
                          <p className="text-sm font-bold shrink-0" style={{ color: '#1B2B6B' }}>
                            {currency}{price.value.toFixed(2)}
                          </p>
                        </Link>
                      )
                    })}
                    <button
                      onClick={() => { setShowSuggestions(false); router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`) }}
                      className="w-full text-center text-xs font-semibold py-2.5 text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      See all results for &quot;{searchQuery}&quot; →
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5 ml-auto md:ml-0">
            <div className="hidden lg:flex items-center gap-1.5 text-sm">
              <Phone size={16} style={{ color: '#1B2B6B' }} />
              <div>
                <p className="text-gray-400 text-xs leading-none">Need help?</p>
                <p className="font-semibold text-gray-800 leading-tight">01 835 2111</p>
              </div>
            </div>
            <Link href="/account" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-navy transition-colors">
              <User size={20} />
              <span className="text-xs hidden sm:block">Account</span>
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-navy transition-colors">
              <Heart size={20} />
              <span className="text-xs hidden sm:block">Wishlist</span>
            </Link>
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-navy transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {mounted && itemCount > 0 && (
                  <span style={{ backgroundColor: '#F15A24' }} className="absolute -top-2 -right-2 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-gray-400 leading-none">Cart</p>
                <p className="font-semibold text-sm leading-tight" style={{ color: '#1B2B6B' }}>€{mounted ? total().toFixed(2) : '0.00'}</p>
              </div>
            </button>
            <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2">
          <SearchBox mobile />
        </div>
      </div>

      {/* ── Nav Bar + Mega Menu ───────────────────────────────────────── */}
      <div
        className="bg-white border-b border-gray-200 relative"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4">

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center overflow-x-auto">
            {displayNav.map((cat) => (
              <div key={cat.id} onMouseEnter={() => setActiveMenu(cat.id)}>
                <Link
                  href={`/category/${cat.url_path}`}
                  className="px-3 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 border-b-2 transition-colors duration-150"
                  style={{
                    color: activeMenu === cat.id ? '#F15A24' : '#374151',
                    borderBottomColor: activeMenu === cat.id ? '#F15A24' : 'transparent',
                    fontFamily: 'var(--font-dm), sans-serif',
                  }}
                >
                  {cat.name}
                  {cat.children.length > 0 && (
                    <ChevronDown
                      size={12}
                      style={{ transform: activeMenu === cat.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
                    />
                  )}
                </Link>
              </div>
            ))}

            {/* Clearance badge */}
            {showClearanceBadge && (
              <div className="ml-auto flex items-center gap-1 pl-4 shrink-0">
                <Link
                  href={clearanceCat ? `/category/${clearanceCat.url_path}` : '/sale'}
                  style={{ backgroundColor: '#F15A24' }}
                  className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity"
                >
                  Clearance — Get amazing offers
                  <button
                    onClick={(e) => { e.preventDefault(); setShowClearanceBadge(false) }}
                    className="ml-1 hover:opacity-70"
                  >
                    <X size={12} />
                  </button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-2 flex flex-col border-t border-gray-100">
              {displayNav.map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center border-b border-gray-100">
                    <Link href={`/category/${cat.url_path}`} className="py-2.5 px-2 text-sm font-medium text-gray-700 hover:text-orange-500 flex-1">
                      {cat.name}
                    </Link>
                    {cat.children.length > 0 && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === cat.id ? null : cat.id)}
                        className="px-3 py-2.5 text-gray-400 hover:text-orange-500"
                      >
                        <ChevronDown size={16} style={{ transform: mobileExpanded === cat.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s' }} />
                      </button>
                    )}
                  </div>

                  {mobileExpanded === cat.id && (
                    <div className="bg-gray-50 pl-4">
                      {cat.children.map((sub) => (
                        <div key={sub.id}>
                          <div className="flex items-center border-b border-gray-100">
                            <Link href={`/category/${sub.url_path}`} className="py-2 px-2 text-sm text-gray-600 hover:text-orange-500 flex-1">
                              {sub.name}
                            </Link>
                            {sub.children.length > 0 && (
                              <button
                                onClick={() => setMobileSubExpanded(mobileSubExpanded === sub.id ? null : sub.id)}
                                className="px-3 py-2 text-gray-400 hover:text-orange-500"
                              >
                                <ChevronDown size={14} style={{ transform: mobileSubExpanded === sub.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s' }} />
                              </button>
                            )}
                          </div>
                          {mobileSubExpanded === sub.id && (
                            <div className="bg-gray-100 pl-4">
                              {sub.children.map((leaf) => (
                                <Link key={leaf.id} href={`/category/${leaf.url_path}`} className="flex items-center gap-1 py-2 px-2 text-xs text-gray-500 hover:text-orange-500 border-b border-gray-200">
                                  <ChevronRight size={10} className="text-gray-400" />
                                  {leaf.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href={clearanceCat ? `/category/${clearanceCat.url_path}` : '/sale'}
                style={{ backgroundColor: '#F15A24' }}
                className="mt-2 text-white text-xs font-semibold px-3 py-2 rounded-full text-center"
              >
                Clearance — Get amazing offers
              </Link>
            </nav>
          )}
        </div>

        {/* ── Mega Menu Panel ───────────────────────────────────────── */}
        {activeCat && activeCat.children.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 border-t-2 border-orange-500">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex gap-8">

                {/* Left panel: category image + "View All" */}
                <div className="w-44 shrink-0 flex flex-col gap-3">
                  {activeCat.image ? (
                    <div className="rounded-xl overflow-hidden h-28">
                      <Image
                        src={activeCat.image}
                        alt={activeCat.name}
                        width={176}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl h-28 flex items-center justify-center" style={{ backgroundColor: '#EBF3FF' }}>
                      <span className="text-3xl font-extrabold opacity-20" style={{ color: '#1B2B6B' }}>
                        {activeCat.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/category/${activeCat.url_path}`}
                      className="text-sm font-bold hover:text-orange-500 transition-colors flex items-center gap-1"
                      style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}
                    >
                      View All {activeCat.name}
                      <ChevronRight size={14} />
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeCat.product_count.toLocaleString()} Products
                    </p>
                  </div>
                </div>

                {/* Right panel: subcategories — CSS columns for even fill */}
                <div
                  className="flex-1"
                  style={{ columns: columnCount, columnGap: '2rem' }}
                >
                  {activeCat.children.slice(0, 20).map((sub) => (
                    <div key={sub.id} className="break-inside-avoid mb-5">
                      <Link
                        href={`/category/${sub.url_path}`}
                        className="block text-sm font-semibold text-gray-800 hover:text-orange-500 mb-1.5 leading-snug transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                      >
                        {sub.name}
                      </Link>
                      {sub.children.length > 0 && (
                        <ul className="space-y-1">
                          {sub.children.map((leaf) => (
                            <li key={leaf.id}>
                              <Link
                                href={`/category/${leaf.url_path}`}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 transition-colors"
                                style={{ fontFamily: 'var(--font-dm), sans-serif' }}
                              >
                                <ChevronRight size={10} className="shrink-0 text-gray-300" />
                                {leaf.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {activeCat.children.length > 20 && (
                    <div className="break-inside-avoid">
                      <Link
                        href={`/category/${activeCat.url_path}`}
                        className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        View all {activeCat.children.length} subcategories →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>

    <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  )
}
