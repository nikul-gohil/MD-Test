'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import type { MediaGalleryItem } from '@/lib/types'

interface ProductGalleryProps {
  images: MediaGalleryItem[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => a.position - b.position)
  const [activeIdx, setActiveIdx] = useState(0)
  const activeImage = sorted[activeIdx]

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden">
        {activeImage?.url ? (
          <Image
            src={activeImage.url}
            alt={activeImage.label || productName}
            fill
            className="object-contain p-6 transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart size={48} className="text-gray-200" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="relative w-16 h-16 shrink-0 rounded-lg border-2 overflow-hidden bg-white transition-all"
              style={{ borderColor: activeIdx === i ? '#F15A24' : '#E5E7EB' }}
            >
              <Image
                src={img.url}
                alt={img.label || `Image ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
