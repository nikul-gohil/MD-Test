export const CREATE_EMPTY_CART = `mutation { createEmptyCart }`

export const ADD_PRODUCTS_TO_CART = `
  mutation AddProductsToCart($cartId: String!, $items: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $items) {
      cart {
        id
        total_quantity
        prices { grand_total { value currency } subtotal_excluding_tax { value currency } }
        items {
          id
          quantity
          product { name sku small_image { url } }
          prices { price { value currency } row_total { value currency } }
        }
      }
      user_errors { code message }
    }
  }
`

export const GET_CART = `
  query GetCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      total_quantity
      prices {
        grand_total { value currency }
        subtotal_excluding_tax { value currency }
        applied_taxes { amount { value currency } label }
      }
      items {
        id
        quantity
        product { name sku small_image { url } }
        prices { price { value currency } row_total { value currency } }
      }
    }
  }
`

export const UPDATE_CART_ITEMS = `
  mutation UpdateCartItems($cartId: String!, $items: [CartItemUpdateInput!]!) {
    updateCartItems(input: { cart_id: $cartId, cart_items: $items }) {
      cart {
        items { id quantity prices { row_total { value currency } } }
        prices { grand_total { value currency } subtotal_excluding_tax { value currency } }
      }
    }
  }
`

export const REMOVE_ITEM_FROM_CART = `
  mutation RemoveItemFromCart($cartId: String!, $itemId: Int!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $itemId }) {
      cart {
        items { id quantity }
        prices { grand_total { value currency } subtotal_excluding_tax { value currency } }
      }
    }
  }
`

export const SET_GUEST_EMAIL = `
  mutation SetGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart { email }
    }
  }
`

export const SET_SHIPPING_ADDRESS = `
  mutation SetShippingAddress($cartId: String!, $address: CartAddressInput!) {
    setShippingAddressesOnCart(input: {
      cart_id: $cartId
      shipping_addresses: [{ address: $address }]
    }) {
      cart {
        shipping_addresses {
          available_shipping_methods { carrier_code method_code carrier_title method_title amount { value currency } }
        }
      }
    }
  }
`

export const SET_SHIPPING_METHOD = `
  mutation SetShippingMethod($cartId: String!, $carrierCode: String!, $methodCode: String!) {
    setShippingMethodsOnCart(input: {
      cart_id: $cartId
      shipping_methods: [{ carrier_code: $carrierCode, method_code: $methodCode }]
    }) {
      cart { shipping_addresses { selected_shipping_method { carrier_title method_title amount { value currency } } } }
    }
  }
`

export const SET_PAYMENT_METHOD = `
  mutation SetPaymentMethod($cartId: String!, $code: String!) {
    setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: { code: $code } }) {
      cart { selected_payment_method { code title } }
    }
  }
`

export const PLACE_ORDER = `
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      order { order_number }
    }
  }
`
