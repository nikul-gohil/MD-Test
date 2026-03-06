'use client'

import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '420px' }}
    >
      {/* Background image with fallback gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/hero.jpg'), linear-gradient(135deg, #1B2B6B 0%, #0F1A45 50%, #1a3a5c 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(11,22,65,0.92) 0%, rgba(11,22,65,0.55) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-10"
        style={{ backgroundColor: '#F15A24', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute right-24 bottom-0 w-64 h-64 rounded-full opacity-5"
        style={{ backgroundColor: '#ffffff', transform: 'translateY(30%)' }}
      />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Left: Heading */}
          <div className="max-w-xl">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{ backgroundColor: '#F15A24', color: '#fff' }}
            >
              Trusted Healthcare Partner
            </span>
            <h1
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Reliable Medical &amp; Healthcare Supplies — Ireland Wide
            </h1>
          </div>

          {/* Right: Sub + Buttons */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-white/80 text-sm md:text-right max-w-xs">
              Over <strong className="text-white">15+ years</strong> serving hospitals, clinics and care homes
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#"
                className="border-2 border-white text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-white hover:text-navy transition-all duration-200"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                TALK TO A SPECIALIST ›
              </Link>
              <Link
                href="#"
                className="text-white text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#F15A24', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                SHOP BY CATEGORY ›
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
