import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={13} className="text-gray-400 shrink-0" />}
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: 'var(--font-dm), sans-serif' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-gray-800 font-medium"
                  style={{ fontFamily: 'var(--font-dm), sans-serif' }}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
