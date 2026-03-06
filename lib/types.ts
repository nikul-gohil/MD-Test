// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLeafCategory {
  id: string
  name: string
  url_path: string
  product_count: number
}

export interface NavSubCategory extends NavLeafCategory {
  children: NavLeafCategory[]
}

export interface NavCategory extends NavLeafCategory {
  image: string | null
  children: NavSubCategory[]
}

// ─── Homepage ────────────────────────────────────────────────────────────────

export interface CategoryItem {
  id: string
  name: string
  url_path: string
  product_count: number
  image?: string | null
}

export interface FeaturedProduct {
  sku: string
  name: string
  brand: string
  price: number
  image: string
  currency: string
  tabCategory: string
}

// ─── PLP ─────────────────────────────────────────────────────────────────────

export interface ProductListItem {
  id: number
  sku: string
  name: string
  url_key: string
  price_range: {
    minimum_price: {
      regular_price: { value: number; currency: string }
      final_price: { value: number; currency: string }
    }
  }
  small_image: { url: string; label: string } | null
}

export interface AggregationOption {
  label: string
  value: string
  count: number
}

export interface Aggregation {
  attribute_code: string
  label: string
  options: AggregationOption[]
}

export interface PageInfo {
  current_page: number
  page_size: number
  total_pages: number
}

export interface ProductListResult {
  total_count: number
  aggregations: Aggregation[]
  page_info: PageInfo
  items: ProductListItem[]
}

// ─── PDP ─────────────────────────────────────────────────────────────────────

export interface MediaGalleryItem {
  url: string
  label: string
  position: number
}

export interface ProductDetail {
  id: number
  sku: string
  name: string
  url_key: string
  description: { html: string }
  meta_title: string | null
  meta_description: string | null
  price_range: {
    minimum_price: {
      regular_price: { value: number; currency: string }
      final_price: { value: number; currency: string }
    }
  }
  media_gallery: MediaGalleryItem[]
  categories: { id: number; name: string; url_path: string }[]
  related_products: ProductListItem[]
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  sku: string
  name: string
  price: number
  qty: number
  image: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface Customer {
  firstname: string
  lastname: string
  email: string
}
