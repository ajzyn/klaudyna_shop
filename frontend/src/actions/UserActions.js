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
  USER_PROFILE_DETAILS_SUCCESS
} from '../constants/UserConstants'

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
