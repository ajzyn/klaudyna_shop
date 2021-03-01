import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import {
  productListReducer,
  productDetailsReducer
} from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer
} from './reducers/UserReducers'
import jwt_decode from 'jwt-decode'
import jwtDecode from 'jwt-decode'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdatedProfile: userUpdateProfileReducer
})

const initialUserInfo = JSON.parse(localStorage.getItem('userInfo'))
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initalCartItems = JSON.parse(localStorage.getItem('cart'))
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const initalShippingAddress = JSON.parse(
  localStorage.getItem('shippingAddress')
)
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialPaymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''

const initialState = {
  cart: {
    cartItems: [...initalCartItems],
    shippingAddress: initalShippingAddress,
    paymentMethod: initialPaymentMethod
  },
  userLogin: {
    userInfo: initialUserInfo
  }
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
