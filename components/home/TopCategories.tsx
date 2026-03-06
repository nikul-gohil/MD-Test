'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { LucideIcon } from 'lucide-react'
import {
  Shield,
  Droplets,
  FileText,
  Ear,
  Sparkles,
  Syringe,
  FlaskConical,
  Stethoscope,
  Activity,
  Heart,
  Package,
  Scissors,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import 'swiper/css'
import type { CategoryItem } from '@/lib/types'

interface TopCategoriesProps {
  categories?: CategoryItem[]
}

// Fallback Lucide icon mapping when a category has no image
const ICON_MAP: { keywords: string[]; icon: LucideIcon; color: string }[] = [
  { keywords: ['personal protection', 'ppe'], icon: Shield, color: '#EBF3FF' },
  { keywords: ['infusion', 'iv', 'drip'], icon: Droplets, color: '#FFF0EB' },
  { keywords: ['paper', 'disposable'], icon: FileText, color: '#EBFFF5' },
  { keywords: ['ear', 'ent', 'hearing'], icon: Ear, color: '#FFF8EB' },
  { keywords: ['hygiene', 'skin', 'wash', 'hand'], icon: Sparkles, color: '#F0EBFF' },
  { keywords: ['syringe', 'needle', 'injection', 'cannula'], icon: Syringe, color: '#EBFBFF' },
  { keywords: ['surface', 'disinfect', 'chemical'], icon: FlaskConical, color: '#FFEBF5' },
  { keywords: ['diagnostic', 'stethoscope'], icon: Stethoscope, color: '#F5FFEB' },
  { keywords: ['monitor', 'vital', 'activity'], icon: Activity, color: '#EBEBFF' },
  { keywords: ['cardio', 'heart', 'cardiac'], icon: Heart, color: '#FFEBEB' },
  { keywords: ['surgery', 'wound', 'dressing', 'suture', 'minor'], icon: Scissors, color: '#FFF0F5' },
  { keywords: ['first aid', 'emergency'], icon: Plus, color: '#FFF0EB' },
  { keywords: ['consumable', 'glove', 'mask'], icon: Package, color: '#F5F0FF' },
  { keywords: ['physio', 'therapy', 'rehab', 'simulation'], icon: Activity, color: '#EBEBFF' },
  { keywords: ['equipment', 'furniture'], icon: Package, color: '#EBF3FF' },
]

function getIconFallback(name: string): { icon: LucideIcon; color: string } {
  const lower = name.toLowerCase()
  for (const { keywords, icon, color } of ICON_MAP) {
    if (keywords.some((k) => lower.includes(k))) return { icon, color }
  }
  return { icon: Package, color: '#F5F7FA' }
}

const STATIC_FALLBACK: CategoryItem[] = [
  { id: '1', name: 'Consumables', url_path: 'consumables', product_count: 759 },
  { id: '2', name: 'Diagnostics', url_path: 'healthcare-diagnostics', product_count: 1043 },
  { id: '3', name: 'Equipment & Furniture', url_path: 'furniture', product_count: 1745 },
  { id: '4', name: 'First Aid', url_path: 'first-aid-supplies', product_count: 980 },
  { id: '5', name: 'Hygiene', url_path: 'surgery-hygiene', product_count: 600 },
  { id: '6', name: 'Minor Surgery', url_path: 'minor-surgery', product_count: 341 },
  { id: '7', name: 'Physiotherapy', url_path: 'physiotherapy', product_count: 224 },
  { id: '8', name: 'Simulation', url_path: 'medical-simulation', product_count: 287 },
]

export default function TopCategories({ categories }: TopCategoriesProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const items = categories && categories.length > 0 ? categories : STATIC_FALLBACK

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl font-extrabold"
            style={{ color: '#1B2B6B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Top Categories
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
        >
          {items.map((cat) => {
            const { icon: Icon, color } = getIconFallback(cat.name)
            return (
              <SwiperSlide key={cat.id}>
                <Link
                  href={`/${cat.url_path}`}
                  className="flex flex-col items-center gap-2 group cursor-pointer py-2"
                >
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: cat.image ? '#EBF3FF' : color }}
                  >
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon
                        size={32}
                        style={{ color: '#1B2B6B' }}
                        className="group-hover:scale-110 transition-transform duration-200"
                      />
                    )}
                  </div>
                  <p
                    className="text-xs font-semibold text-center text-gray-800 leading-tight"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-400">{cat.product_count.toLocaleString()} Products</p>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
