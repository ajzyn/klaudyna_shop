import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from '../constants/UserConstants'
import { ORDER_LIST_MY_RESET } from '../constants/OrderConstants'

export const userLogin = loginData => async (dispatch, getState) => {
  dispatch({ type: USER_LOGIN_REQUEST })
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/users/login', loginData, options)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userLogin.userInfo)
    )
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}

export const userRegister = loginData => async (dispatch, getState) => {
  dispatch({ type: USER_REGISTER_REQUEST })
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/users', loginData, options)
    dispatch({ type: USER_REGISTER_SUCCESS })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userLogin.userInfo)
    )
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}

export const userLogout = () => (dispatch, getState) => {
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
  localStorage.removeItem('userInfo')
  localStorage.removeItem('__paypal_storage__')
  localStorage.removeItem('cart')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
}

export const updateUserProfile = updatedData => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
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
    const { data, status } = await axios.put('/api/users', updatedData, config)
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data, status })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data, status })
    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userLogin.userInfo)
    )
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: USER_PROFILE_DETAILS_REQUEST })
  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data, status } = await axios.get(
      `/api/users/profile/${userInfo._id}`,
      config
    )
    dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data, status })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const getAllUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST })
  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data, status } = await axios.get(`/api/users/all`, config)
    dispatch({ type: USER_LIST_SUCCESS, payload: data, status })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const deleteUser = id => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST })
  const {
    userLogin: { userInfo }
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  try {
    await axios.delete(`/api/users/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}

export const updateUserProfileById = (id, user) => async (
  dispatch,
  getState
) => {
  dispatch({ type: USER_UPDATE_REQUEST })
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
    const { data } = await axios.put(`/api/users/${id}`, user, config)
    dispatch({ type: USER_UPDATE_SUCCESS })
    dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}

export const getUserProfileById = id => async (dispatch, getState) => {
  dispatch({ type: USER_PROFILE_DETAILS_REQUEST })
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
    const { data } = await axios.get(`/api/users/${id}`, config)
    dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message,
      status: error.response.status
    })
  }
}
