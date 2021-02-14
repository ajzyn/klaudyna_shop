import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/ProductConstants'
import axios from 'axios'

export const getProducts = () => async dispatch => {
  dispatch({ type: PRODUCT_LIST_REQUEST })
  try {
    const { data } = await axios.get('/products')
    console.log(data)
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.err
          ? error.response.data.err
          : error.message
    })
  }
}
