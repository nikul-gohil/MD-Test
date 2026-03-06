import Link from 'next/link'

const banners = [
  {
    brand: '3M',
    product: '3M Coban Elastic Wrap 5cm x 4.5m (36)',
    tagline: 'Professional wound care solutions',
    bg: '#EBF3FF',
    accentBg: '#D6E8FF',
    textColor: '#1B2B6B',
    img: null,
  },
  {
    brand: 'OMRON',
    product: 'Omron BF511 Body Composition Monitor',
    tagline: 'Advanced health monitoring at home',
    bg: '#FFF8F0',
    accentBg: '#FDEBD0',
    textColor: '#8B4513',
    img: null,
  },
  {
    brand: 'MEDGUARD',
    product: 'Medguard Incontinence Sheets',
    tagline: 'Superior comfort & protection',
    bg: '#EBFAF7',
    accentBg: '#D0F0EA',
    textColor: '#1B5E4E',
    img: null,
  },
]

export default function PromoBanners() {
  return (
    <section className="py-12" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {banners.map(({ brand, product, tagline, bg, accentBg, textColor }) => (
            <div
              key={brand}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ backgroundColor: bg }}
            >
              {/* Image placeholder */}
              <div
                className="w-full h-40 flex items-center justify-center"
                style={{ backgroundColor: accentBg }}
              >
                <div className="text-center opacity-40">
                  <div
                    className="text-4xl font-extrabold"
                    style={{ color: textColor, fontFamily: 'var(--font-jakarta), sans-serif' }}
                  >
                    {brand}
                  </div>
                  <p className="text-xs mt-1" style={{ color: textColor }}>
                    Product Image
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: '#F15A24' }}
                >
                  {brand}
                </p>
                <h3
                  className="font-bold text-base leading-snug mb-1"
                  style={{ color: textColor, fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                  {product}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{tagline}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-bold transition-opacity hover:opacity-80"
                  style={{ color: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                  EXPLORE MORE ›
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
