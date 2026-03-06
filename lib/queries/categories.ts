import { gql } from '@apollo/client'

export const GET_NAV_CATEGORIES = gql`
  query GetNavCategories {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      product_count
      image
      children {
        id
        name
        url_path
        product_count
        children {
          id
          name
          url_path
          product_count
        }
      }
    }
  }
`

export const GET_TOP_CATEGORIES = gql`
  query GetTopCategories {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      product_count
      image
      children {
        id
        name
        url_path
        product_count
        image
      }
    }
  }
`

export const GET_CATEGORY_BY_URL = gql`
  query GetCategoryByUrl($url_path: String!) {
    categoryList(filters: { url_path: { eq: $url_path } }) {
      id
      name
      description
      url_path
      image
      meta_title
      meta_description
      product_count
    }
  }
`
