import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReducer,
  productCreateReviewReducer
} from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/UserReducers'
import { userLogout } from './actions/UserActions'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer
} from './reducers/OrderReducer'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdatedProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  userProfile: userProfileReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  orderDeliver: orderDeliverReducer,
  productCreateReview: productCreateReviewReducer
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

const authInterceptor = ({ dispatch }) => next => action => {
  if (action.status && action.status === 401) {
    dispatch(userLogout())
  } else {
    next(action)
  }
  next(action)
}

const middleware = [thunk, authInterceptor]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
