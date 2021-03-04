import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL
} from '../constants/OrderConstants'

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, orderId: payload.id }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: payload }
    default:
      return { ...state }
  }
}

export const orderDetailsReducer = (
  state = { order: [], shippingAddress: {}, loading: true },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return { ...state }
  }
}
