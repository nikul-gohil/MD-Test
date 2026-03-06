'use client'

import dynamic from 'next/dynamic'
import type { FeaturedProduct } from '@/lib/types'

const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  ssr: false,
  loading: () => (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
        <div className="flex gap-4 overflow-hidden">
          <div className="shrink-0 w-52 h-64 bg-gray-100 rounded-lg animate-pulse" />
          <div className="shrink-0 w-52 h-64 bg-gray-100 rounded-lg animate-pulse" />
          <div className="shrink-0 w-52 h-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  ),
})

const Testimonial = dynamic(() => import('@/components/home/Testimonial'), {
  ssr: false,
  loading: () => <div className="py-16" style={{ backgroundColor: '#1B2B6B', minHeight: '220px' }} />,
})

export default function BelowFoldSections({ products }: { products: FeaturedProduct[] }) {
  return (
    <>
      <FeaturedProducts products={products} />
      <Testimonial />
    </>
  )
}
