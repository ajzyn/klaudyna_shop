import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL
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
    const { data } = await axios.post('/order', order, options)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
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
  console.log(orderId)
  dispatch({ type: ORDER_DETAILS_REQUEST })
  const { userInfo } = getState().userLogin

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data } = await axios.get(`/order/${orderId}`, options)
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
