import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/CartConstants'
import axios from 'axios'

export const AddToCart = (productId, qty) => async (dispatch, getState) => {
  dispatch({ type: CART_REQUEST })
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

export const RemoveFromCart = productId => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId })
  localStorage.setItem('cart', JSON.stringify([...getState().cart.cartItems]))
}

export const SaveShippingAddress = shippingAddress => async (
  dispatch,
  getState
) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: shippingAddress })
  localStorage.setItem(
    'shippingAddress',
    JSON.stringify(getState().cart.shippingAddress)
  )
}

export const SavePaymentMethod = method => async (dispatch, getState) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method })
  localStorage.setItem(
    'paymentMethod',
    JSON.stringify(getState().cart.paymentMethod)
  )
}
