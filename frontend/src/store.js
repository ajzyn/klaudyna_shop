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

const initialState = {
  cart: {
    cartItems: [...initalCartItems]
  },
  userLogin: {
    userInfo: initialUserInfo
  }
}

// ponizszy middleware ale chyba lepiej w backendzie zrobic routa od weryfikacji czy token nie jest wygasniety i w tym middlewarze to sprawdzac, albo w authmiddleware jakos to oagrnac
// const checkTokenExpirationMiddleware = store => next => action => {
//   const token =
//     JSON.parse(localStorage.getItem('userInfo')) &&
//     JSON.parse(localStorage.getItem('userInfo'))['token']
//   if (jwtDecode(token).exp < Date.now() / 1000) {
//     next(action)
//     localStorage.removeItem('userInfo')
//   }
//   next(action)
// }

const middleware = [thunk, logger]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
