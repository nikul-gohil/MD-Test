'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote1:
      'MedGuard has been an invaluable partner to UCD\'s Clinical Skills Centre for a number of years. Their product range is extensive and of the highest quality, meeting our diverse teaching and simulation needs.',
    quote2:
      'The team at MedGuard is always professional, responsive, and genuinely committed to supporting healthcare education. We would highly recommend them to any institution in the sector.',
    author: 'Jestin Jose',
    role: 'Clinical Skills Manager',
    org: 'UCD Dublin',
  },
  {
    quote1:
      'We have been working with MedGuard for over 5 years and they have consistently provided excellent service and products. Their delivery is always on time and their customer support team is second to none.',
    quote2:
      'As a busy outpatient clinic, reliability is essential for us. MedGuard delivers that every time.',
    author: 'Dr. Sarah O\'Brien',
    role: 'Practice Manager',
    org: 'Dublin Medical Centre',
  },
]

export default function Testimonial() {
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]

  return (
    <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#1B2B6B' }}>
      {/* Giant quote mark */}
      <div
        className="absolute top-4 left-8 text-9xl font-serif leading-none select-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.06)', fontSize: '200px', lineHeight: 1 }}
      >
        ❝
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-center">
          {/* Left: Shield/Logo */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            {/* UCD-style shield placeholder */}
            <div className="w-24 h-28 border-2 border-white/30 rounded-t-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-white/60 text-xs font-bold uppercase tracking-wider leading-tight">
                  {t.org}
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs text-center lg:text-left">Verified Partner</p>
          </div>

          {/* Right: Testimonial */}
          <div className="lg:col-span-3">
            <Quote size={32} className="text-orange-400 mb-4" />
            <p className="text-white/90 text-lg font-light leading-relaxed italic mb-4">
              {t.quote1}
            </p>
            <p className="text-white/70 text-base leading-relaxed italic mb-6">
              {t.quote2}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white font-bold text-sm">{t.author}</p>
                <p className="text-orange-400 text-xs">{t.role}</p>
              </div>
              {/* Nav buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                  className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{ backgroundColor: i === idx ? '#F15A24' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
