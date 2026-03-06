export const GENERATE_TOKEN = `
  mutation GenerateToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`

export const CREATE_CUSTOMER = `
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $is_subscribed: Boolean
  ) {
    createCustomer(input: {
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      is_subscribed: $is_subscribed
    }) {
      customer { firstname lastname email }
    }
  }
`

export const GET_CUSTOMER = `
  query GetCustomer {
    customer {
      firstname lastname email
      addresses {
        id firstname lastname
        street city region { region_code }
        postcode country_code telephone
        default_shipping default_billing
      }
    }
  }
`

export const GET_CUSTOMER_ORDERS = `
  query GetCustomerOrders($pageSize: Int, $currentPage: Int) {
    customer {
      orders(pageSize: $pageSize, currentPage: $currentPage) {
        total_count
        items {
          id number status order_date
          shipping_address { firstname lastname }
          total { grand_total { value currency } }
          items { product_name product_sku quantity_ordered product_sale_price { value currency } }
        }
      }
    }
  }
`

export const REVOKE_TOKEN = `
  mutation { revokeCustomerToken { result } }
`
