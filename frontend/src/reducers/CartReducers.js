import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/CartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
  { type, payload }
) => {
  switch (type) {
    case CART_REQUEST:
      return { ...state, loading: true }

    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        item => item.product === payload.product
      )
      if (existItem) {
        return {
          ...state,
          loading: false,
          cartItems: [
            ...state.cartItems.map(item =>
              item.product !== payload.product ? item : payload
            )
          ]
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems.filter(item => item.id !== payload)]
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload
      }
    default:
      return { ...state }
  }
}
