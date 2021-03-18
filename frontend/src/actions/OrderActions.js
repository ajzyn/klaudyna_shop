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
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_IS_SENT_REQUEST,
  ORDER_IS_SENT_SUCCESS,
  ORDER_IS_SENT_FAIL
} from '../constants/OrderConstants'
import axios from 'axios'

export const createOrder = order => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data } = await axios.post('/orders', order, options)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    localStorage.removeItem('cart')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}

export const getOrder = orderId => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data } = await axios.get(`/orders/${orderId}`, options)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data } = await axios.put(
      `/orders/${orderId}/pay`,
      paymentResult,
      options
    )
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const getOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_MY_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data } = await axios.get(`/orders/myorders`, options)
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_ALL_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data } = await axios.get(`/orders`, options)
    dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const markAsSent = id => async (dispatch, getState) => {
  dispatch({ type: ORDER_IS_SENT_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    await axios.get(`/orders/${id}/deliver`, options)
    dispatch({ type: ORDER_IS_SENT_SUCCESS })
  } catch (error) {
    dispatch({
      type: ORDER_IS_SENT_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}
