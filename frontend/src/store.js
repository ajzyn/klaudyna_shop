import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import { productListReducer } from './reducers/ProdcutReducers'

const reducers = combineReducers({
  productList: productListReducer
})

const initialState = {}

const middleware = [thunk, logger]
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
