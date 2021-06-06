import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import useCheckAuthorization from '../hooks/useCheckAuthorization'
import Message from '../components/Message'
import '../styles/cartscreen.scss'
import Loader from '../components/Loader'
import { getOrder, payOrder, markAsSent } from '../actions/OrderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ORDER_PAY_RESET,
  ORDER_IS_SENT_RESET
} from '../constants/OrderConstants'
import { CART_RESET_ITEMS } from '../constants/CartConstants'

const ColStyle = {
  margin: 'auto'
}

//w cart zmien na productID id
const OrderScreen = ({ history, match }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const [isPayPalBtnRendered, setIsPayPalBtnRendered] = useState(false)
  const dispatch = useDispatch()
  const { id } = match.params

  const { userInfo } = useSelector(state => state.userLogin)

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { success: successDeliver } = orderDeliver

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=PLN`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_IS_SENT_RESET })
      dispatch({ type: CART_RESET_ITEMS })
      dispatch(getOrder(id))
    } else if (!order.isPaid) {
      dispatch({ type: CART_RESET_ITEMS })
      if (!window.paypal && !isPayPalBtnRendered) {
        addPayPalScript()
        setIsPayPalBtnRendered(true)
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, order, userInfo, successDeliver, sdkReady])

  useCheckAuthorization(history)

  if (!loading && !error) {
    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
    order.itemsPrice = addDecimals(
      order.cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  const successPaymentHandler = (paymentResult, data) => {
    dispatch(payOrder(id, paymentResult))
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={() => history.push('/profile')}>
            Lista zamówień
          </Button>
        </Col>
        <Col>
          <Button onClick={() => history.push('/')}>Kontynuuj zakupy</Button>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h1>{`Zamówienie ${id}`}</h1>
            <Row>
              <Col md='8'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Wysyłka</h4>
                    <p>Nazwa użytkownika : {order.user.name}</p>
                    <p>
                      Email :{' '}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      Adres : {order.shippingAddress.address},
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.city},
                      {order.shippingAddress.country}
                    </p>
                    <Message variant={order.isDelivered ? 'success' : 'danger'}>
                      {order.isDelivered
                        ? 'Dostarczono ' + order.deliveredAt.substring(0, 10)
                        : 'Nie dostarczono'}
                    </Message>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Metoda płatności</h4>
                    <p>Metoda płatności: {order.paymentMethod}</p>
                    <Message variant={order.isPaid ? 'success' : 'danger'}>
                      {order.isPaid
                        ? 'Zapłacono ' + order.paidAt.substring(0, 10)
                        : 'Brak płatności'}
                    </Message>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Przedmioty zamówienia</h4>
                    <ListGroup variant='flush'>
                      {order.cart.map(cartItem => (
                        <ListGroup.Item key={cartItem._id}>
                          <Row>
                            <Col md='3' style={ColStyle}>
                              <Image
                                fluid
                                className='cartscreen-image'
                                src={cartItem.image}
                              />
                            </Col>
                            <Col style={ColStyle} md='6'>
                              {cartItem.name}
                            </Col>
                            <Col style={ColStyle} md='3'>
                              {`${cartItem.qty} x ${cartItem.price}zł = ${(
                                cartItem.qty * cartItem.price
                              ).toFixed(2)}`}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md='4'>
                <ListGroup>
                  <Card>
                    <ListGroup.Item>
                      <h4>Podsumowanie zamówienia</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Przedmioty</Col>
                        <Col>
                          {order.itemsPrice}
                          zł
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Przesyłka</Col>
                        <Col>{order.shippingPrice} zł</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Podatki</Col>
                        <Col>{order.taxPrice} zł</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Łącznie do zapłaty</Col>
                        <Col>{order.totalPrice} zł</Col>
                      </Row>
                    </ListGroup.Item>
                    {userInfo && userInfo.isAdmin
                      ? !order.isDelivered && (
                          <ListGroup.Item>
                            <Button
                              onClick={() => dispatch(markAsSent(order._id))}
                              variant='secondary'
                            >
                              Oznacz jako wysłane
                            </Button>
                          </ListGroup.Item>
                        )
                      : !order.isPaid && (
                          <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? (
                              <Loader />
                            ) : (
                              <PayPalButton
                                currency='PLN'
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                              />
                            )}
                          </ListGroup.Item>
                        )}
                  </Card>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Row>
    </Container>
  )
}

export default OrderScreen
