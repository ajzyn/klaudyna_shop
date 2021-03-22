import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_RANK_REQUEST,
  PRODUCT_TOP_RANK_SUCCESS,
  PRODUCT_TOP_RANK_FAIL
} from '../constants/ProductConstants'
import axios from 'axios'

export const getProducts = (keyword = '', offset = '') => async dispatch => {
  dispatch({ type: PRODUCT_LIST_REQUEST })
  const query = `/products/?keyword=${keyword}&offset=${Number(offset)}`

  try {
    const { data } = await axios.get(query)
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}

export const getProductDetails = id => async dispatch => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST })

  try {
    const { data } = await axios.get(`/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST })

  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  try {
    await axios.delete(`/products/${id}`, config)
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const updateProduct = (id, product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST })

  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  try {
    await axios.put(`/products/${id}`, product, config)
    dispatch({ type: PRODUCT_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const createProduct = product => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST })

  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  try {
    const { data } = await axios.post(`/products`, product, config)
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const createReview = (id, review) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  try {
    await axios.post(`/products/${id}/reviews`, review, config)
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const getTopRanked = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_TOP_RANK_REQUEST })

  try {
    const { data } = await axios.get(`/products/top`)
    dispatch({ type: PRODUCT_TOP_RANK_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RANK_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}
