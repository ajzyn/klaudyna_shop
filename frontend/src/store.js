import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import {
  productListReducer,
  productDetailsReducer
} from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const initalCartItems = JSON.parse(localStorage.getItem('cart'))
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const initialState = {
  cart: {
    cartItems: [...initalCartItems]
  }
}

const middleware = [thunk, logger]
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
