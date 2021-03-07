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
  USER_LIST_RESET
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
    const { data } = await axios.post('/users/login', loginData, options)
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
    const { data } = await axios.post('/users', loginData, options)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userRegister.userInfo)
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
  localStorage.setItem(
    'userInfo',
    JSON.stringify(getState().userLogin.userInfo)
  )
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
    const { data, status } = await axios.put('/users', updatedData, config)
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data, status } = await axios.get(
      `/users/profile/${userInfo._id}`,
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  try {
    const { data, status } = await axios.get(`/users/all`, config)
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
