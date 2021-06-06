import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET_ITEMS
} from '../constants/CartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
  { type, payload }
) => {
  switch (type) {
    case CART_REQUEST:
      return { ...state, loading: true }

    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        item => item.product === payload.product
      )
      if (existItem) {
        return {
          ...state,
          loading: false,
          cartItems: [
            ...state.cartItems.map(item =>
              item.product !== payload.product ? item : payload
            )
          ]
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems.filter(item => item.product !== payload)]
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload
      }

    case CART_RESET_ITEMS:
      return {
        ...state,
        cartItems: []
      }
    default:
      return { ...state }
  }
}

// paypal czasami nie dzialczy
//dodac na kazdej podstronie lokalizzaotry lepsze ( np. do numeru total prac spana w ktorym jest kwota ) albo na placeorder adres wysylki w osobnych spanach
//zmienic w components checkoutproccess bylo podswietlone na jakim etapie jestesmy
//nie dziala edycja hasla

//odkryj opcje "za darmo" ( /paymentscreen) przy której zamówienie będize z góry opłacone
//na stronie /cart zmienić "zamów" na "przejdz do nastepnego kroku np."
//zrobić inną kwotę zamówienia dla adresu wysyłki poza polską
//usuwaja sie wszystkie egzempalrze gdy usuwam jeden z nich - w koszyku
//sprawdzic dlaczego nie moge 2 razy zrobic zamowienia
//na order imie zmienic na nazwa usera
