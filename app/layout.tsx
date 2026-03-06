import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { client } from '@/lib/apolloClient'
import { GET_NAV_CATEGORIES } from '@/lib/queries/categories'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { NavCategory, NavSubCategory, NavLeafCategory } from '@/lib/types'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'MedGuard — Professional Healthcare Supplies',
  description: 'Ireland\'s leading supplier of medical and healthcare supplies for hospitals, clinics and care homes.',
}

const SKIP_NAV = ['test', 'mg brand']

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let navCategories: NavCategory[] = []

  try {
    const result = await client.query({ query: GET_NAV_CATEGORIES, fetchPolicy: 'network-only' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = (result.data as any)?.categoryList ?? []

    navCategories = raw
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c: any) =>
          !SKIP_NAV.some((s) => c.name.toLowerCase().includes(s)) &&
          c.product_count > 0
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((c: any): NavCategory => ({
        id: String(c.id),
        name: c.name as string,
        url_path: c.url_path as string,
        product_count: c.product_count as number,
        image: (c.image as string | null) ?? null,
        children: ((c.children ?? []) as any[])
          .filter((sc) => sc.product_count > 0)
          .map((sc): NavSubCategory => ({
            id: String(sc.id),
            name: sc.name as string,
            url_path: sc.url_path as string,
            product_count: sc.product_count as number,
            children: ((sc.children ?? []) as any[])
              .filter((leaf) => leaf.product_count > 0)
              .map((leaf): NavLeafCategory => ({
                id: String(leaf.id),
                name: leaf.name as string,
                url_path: leaf.url_path as string,
                product_count: leaf.product_count as number,
              })),
          })),
      }))
  } catch {
    // Magento unreachable — Header renders static fallback nav
  }

  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${dmSans.variable}`} suppressHydrationWarning>
        <Toaster position="top-right" />
        <Header navCategories={navCategories} />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
