import { gql } from '@apollo/client'

// ─── Plain-string queries (used with magentoFetch for server/client) ──────────

export const GET_CATEGORY_PRODUCTS_QUERY = `
  query GetCategoryProducts(
    $filters: ProductAttributeFilterInput
    $sort: ProductAttributeSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    products(
      filter: $filters
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      aggregations {
        attribute_code
        label
        options { label value count }
      }
      page_info { current_page page_size total_pages }
      items {
        id sku name url_key
        price_range {
          minimum_price {
            regular_price { value currency }
            final_price { value currency }
          }
        }
        small_image { url label }
      }
    }
  }
`

export const GET_PRODUCT_DETAIL_QUERY = `
  query GetProductDetail($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id sku name url_key
        description { html }
        meta_title meta_description
        price_range {
          minimum_price {
            regular_price { value currency }
            final_price { value currency }
          }
        }
        media_gallery { url label position }
        categories { id name url_path }
        related_products {
          id sku name url_key
          small_image { url label }
          price_range { minimum_price { final_price { value currency } } }
        }
      }
    }
  }
`

export const GET_SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($search: String!, $pageSize: Int, $currentPage: Int) {
    products(search: $search, pageSize: $pageSize, currentPage: $currentPage) {
      total_count
      aggregations {
        attribute_code label
        options { label value count }
      }
      page_info { current_page page_size total_pages }
      items {
        id sku name url_key
        small_image { url label }
        price_range {
          minimum_price {
            regular_price { value currency }
            final_price { value currency }
          }
        }
      }
    }
  }
`

export const GET_CATEGORY_BY_URL_PATH_QUERY = `
  query GetCategoryByUrlPath($url_path: String!) {
    categoryList(filters: { url_path: { eq: $url_path } }) {
      id name description url_path image
      meta_title meta_description
    }
  }
`

// ─── Apollo gql-tagged queries (used server-side via Apollo Client) ───────────

export const GET_HOMEPAGE_FEATURED_PRODUCTS = gql`
  query GetHomepageFeaturedProducts($pageSize: Int = 16) {
    products(
      filter: { price: { from: "0.01" } }
      pageSize: $pageSize
      sort: { position: ASC }
    ) {
      items {
        id
        name
        sku
        url_key
        manufacturer
        small_image {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
        categories {
          id
          name
          url_path
        }
      }
      total_count
    }
  }
`

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($categoryId: String!, $pageSize: Int = 10) {
    products(
      filter: { category_id: { eq: $categoryId } }
      pageSize: $pageSize
      sort: { position: ASC }
    ) {
      items {
        id
        name
        sku
        url_key
        manufacturer
        small_image {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
      }
      total_count
    }
  }
`

export const GET_PRODUCT_BY_SKU = gql`
  query GetProductBySku($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        name
        sku
        url_key
        description {
          html
        }
        small_image {
          url
          label
        }
        media_gallery {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`
