import { CART_ADD_ITEM } from '../constants/CartConstants'
import axios from 'axios'

export const AddToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${productId}`)
  const product = {
    id: data._id,
    name: data.name,
    price: data.price,
    image: data.image,
    countInStock: data.countInStock,
    qty
  }
  if (data.countInStock >= qty) {
    dispatch({ type: CART_ADD_ITEM, payload: product })
    localStorage.setItem('cart', JSON.stringify([...getState().cart.cartItems]))
  }
}
