import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import { productListReducer } from './reducers/ProdcutReducers'

const reducer = combineReducers({
  productList: productListReducer
})

const initialState = {}

const middleware = [thunk, logger]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
