export const productListReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'GET':
      return { ...state }
    default:
      return state
  }
}
