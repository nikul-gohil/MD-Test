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
  ) {
    createCustomer(input: {
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    }) {
      customer { firstname lastname email }
    }
  }
`

export const GET_CUSTOMER = `
  query GetCustomer {
    customer {
      firstname lastname email
    }
  }
`

export const GET_CUSTOMER_ORDERS = `
  query GetCustomerOrders {
    customer {
      orders(pageSize: 20) {
        items {
          number status order_date
          total { grand_total { value currency } }
          shipping_address {
            firstname lastname
            street city region { region_code }
            postcode country_code
          }
          items {
            product_name
            quantity_ordered
            product_sale_price { value currency }
          }
        }
      }
    }
  }
`

export const REVOKE_TOKEN = `
  mutation { revokeCustomerToken { result } }
`
