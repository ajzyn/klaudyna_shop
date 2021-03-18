import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_IS_SENT_REQUEST,
  ORDER_IS_SENT_SUCCESS,
  ORDER_IS_SENT_FAIL,
  ORDER_IS_SENT_RESET,
  ORDER_CREATE_RESET
} from '../constants/OrderConstants'

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, orderId: payload.id }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: payload }
    case ORDER_CREATE_RESET:
      return {}
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
      return { loading: false, order: payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return { ...state }
  }
}

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true, order: payload }
    case ORDER_PAY_FAIL:
      return { loading: false, error: payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return { ...state }
  }
}

export const orderListMyReducer = (
  state = { orders: [] },
  { type, payload }
) => {
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true }
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: payload, success: true }
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: payload, orders: [] }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return { ...state }
  }
}

export const orderListReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_ALL_REQUEST:
      return { loading: true }
    case ORDER_LIST_ALL_SUCCESS:
      return { loading: false, orders: payload, success: true }
    case ORDER_LIST_ALL_FAIL:
      return { loading: false, error: payload, orders: [] }
    default:
      return { ...state }
  }
}

export const orderDeliverReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_IS_SENT_REQUEST:
      return { loading: true }
    case ORDER_IS_SENT_SUCCESS:
      return { loading: false, success: true }
    case ORDER_IS_SENT_FAIL:
      return { loading: false, success: false }
    case ORDER_IS_SENT_RESET:
      return { success: false }
    default:
      return { ...state }
  }
}
