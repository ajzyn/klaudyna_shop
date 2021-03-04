import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_RESET,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_RESET
} from '../constants/UserConstants'

export const userLoginReducer = (
  state = { userInfo: null },
  { type, payload }
) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { userInfo: payload, loading: false }
    case USER_LOGIN_FAIL:
      return { error: payload, loading: false }
    case USER_LOGIN_RESET:
      return { userInfo: { ...state.userInfo } }
    case USER_LOGOUT:
      return { userInfo: null }
    default:
      return { ...state }
  }
}

export const userRegisterReducer = (
  state = { userInfo: {} },
  { type, payload }
) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return { userInfo: payload, loading: false }
    case USER_REGISTER_FAIL:
      return { error: payload, loading: false }
    case USER_REGISTER_RESET:
      return { userInfo: {} }
    default:
      return { ...state }
  }
}

export const userUpdateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { userInfo: payload, loading: false }
    case USER_UPDATE_PROFILE_FAIL:
      return { error: payload, loading: false }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return { ...state }
  }
}

export const userProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { loading: true }
    case USER_PROFILE_DETAILS_SUCCESS:
      return { userInfo: payload, loading: false }
    case USER_PROFILE_DETAILS_FAIL:
      return { error: payload, loading: false }
    case USER_PROFILE_DETAILS_RESET:
      return {}
    default:
      return { ...state }
  }
}
