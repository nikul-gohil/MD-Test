import { gql } from '@apollo/client'

export const GET_CMS_BLOCK = gql`
  query GetCMSBlock($identifiers: [String!]!) {
    cmsBlocks(identifiers: $identifiers) {
      items {
        identifier
        title
        content
      }
    }
  }
`

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    categoryList(filters: { parent_id: { eq: "2" } }) {
      id
      name
      url_path
      product_count
      image
    }
  }
`
