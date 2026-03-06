'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize?: number
  onPageSizeChange?: (size: number) => void
}

const PAGE_SIZES = [12, 24, 48]

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  const pages: (number | '...')[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Page size selector */}
      {onPageSizeChange && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Show per page:</span>
          {PAGE_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onPageSizeChange(s)}
              className="px-2 py-1 border rounded text-xs font-medium transition-colors"
              style={{
                borderColor: pageSize === s ? '#F15A24' : '#E5E7EB',
                color: pageSize === s ? '#F15A24' : '#6B7280',
                backgroundColor: pageSize === s ? '#FFF5F1' : 'white',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-orange-500 hover:text-orange-500 transition-colors"
        >
          <ChevronLeft size={15} />
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className="w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: currentPage === p ? '#1B2B6B' : 'white',
                color: currentPage === p ? 'white' : '#374151',
                border: `1px solid ${currentPage === p ? '#1B2B6B' : '#E5E7EB'}`,
              }}
            >
              {p}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-orange-500 hover:text-orange-500 transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
