import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_WAITING
} from '../constants/CartConstants'

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_WAITING:
      return { ...state, loading: true }
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(item => item.id === payload.id)
      if (existItem) {
        return {
          loading: false,
          cartItems: [
            ...state.cartItems.map(item =>
              item.id !== payload.id ? item : payload
            )
          ]
        }
      } else {
        return { cartItems: [...state.cartItems, payload] }
      }
    case CART_REMOVE_ITEM:
      return {
        cartItems: [...state.cartItems.filter(item => item.id !== payload)]
      }
    default:
      return { ...state }
  }
}
