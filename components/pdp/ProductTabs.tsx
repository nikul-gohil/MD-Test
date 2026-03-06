'use client'

import { useState } from 'react'
import type { ProductDetail } from '@/lib/types'

interface ProductTabsProps {
  product: ProductDetail
}

const TABS = ['Description', 'Specifications', 'Reviews'] as const
type Tab = typeof TABS[number]

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Description')

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-6 py-3.5 text-sm font-semibold transition-all duration-150 border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F15A24' : '#6B7280',
              borderBottomColor: activeTab === tab ? '#F15A24' : 'transparent',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'Description' && (
          <div
            className="prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.description?.html || '<p>No description available.</p>' }}
          />
        )}

        {activeTab === 'Specifications' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['SKU', product.sku],
                  ['Product Name', product.name],
                  ['Category', product.categories?.[0]?.name ?? '—'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-none">
                    <td className="py-2.5 pr-4 font-medium text-gray-700 w-40" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{label}</td>
                    <td className="py-2.5 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No reviews yet. Be the first to review this product.</p>
          </div>
        )}
      </div>
    </div>
  )
}
