import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import {
  productListReducer,
  productDetailsReducer
} from './reducers/ProductReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
})

const initialState = {}

const middleware = [thunk, logger]
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
