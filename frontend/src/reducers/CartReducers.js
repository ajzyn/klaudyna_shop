import { CART_ADD_ITEM } from '../constants/CartConstants'

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(item => item.id === payload.id)
      if (existItem) {
        return {
          cartItems: [
            ...state.cartItems.map(item =>
              item.id !== payload.id ? item : payload
            )
          ]
        }
      } else {
        return { cartItems: [...state.cartItems, payload] }
      }
    default:
      return { ...state }
  }
}
