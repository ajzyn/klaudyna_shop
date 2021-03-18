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
  USER_PROFILE_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET
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
      return { success: true, loading: false }
    case USER_REGISTER_FAIL:
      return { error: payload, loading: false }
    case USER_REGISTER_RESET:
      return { ...state, error: '' }
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
      return { userInfo: payload, loading: false, success: true }
    case USER_PROFILE_DETAILS_FAIL:
      return { error: payload, loading: false }
    case USER_PROFILE_DETAILS_RESET:
      return {}
    default:
      return { ...state }
  }
}

export const userListReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true }
    case USER_LIST_SUCCESS:
      return { users: payload, loading: false }
    case USER_LIST_FAIL:
      return { ...state, error: payload, loading: false }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return { ...state }
  }
}

export const userDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { error: payload, loading: false }
    default:
      return { ...state }
  }
}

export const userUpdateReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { error: payload, loading: false }
    case USER_UPDATE_RESET:
      return { success: false }
    default:
      return { ...state }
  }
}
