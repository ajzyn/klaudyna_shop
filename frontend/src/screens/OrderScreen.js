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
import { getOrder, payOrder } from '../actions/OrderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/OrderConstants'

const ColStyle = {
  margin: 'auto'
}

//w cart zmien na productID id
const OrderScreen = ({ history, match }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const { id } = match.params

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=PLN`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || order._id !== id || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrder(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, order])

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
      <Button
        as='a'
        onClick={() => history.goBack()}
        style={{ marginBottom: '20px' }}
      >
        Powrót
      </Button>
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
                  <p>Imie : {order.user.name}</p>
                  <p>
                    Email :{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    Adres : {order.shippingAddress.address},
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.city},{order.shippingAddress.country}
                  </p>
                  <Message variant={order.isDelivered ? 'success' : 'danger'}>
                    {order.isDelivered ? order.deliveredAt : 'Nie dostarczono'}
                  </Message>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Metoda płatności</h4>
                  <p>Metoda płatności: {order.paymentMethod}</p>
                  <Message variant={order.isPaid ? 'success' : 'danger'}>
                    {order.isPaid ? order.paidAt : 'Brak płatności'}
                  </Message>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Przedmioty zamówienia</h4>
                  <ListGroup variant='flush'>
                    {order.cart.map(cartItem => (
                      <ListGroup.Item key={cartItem._id}>
                        <Row>
                          <Col md='2' style={ColStyle}>
                            <Image
                              className='cartscreen-image'
                              src={`/images${cartItem.image}`}
                            />
                          </Col>
                          <Col style={ColStyle} md='7'>
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
                  {!order.isPaid && (
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
    </Container>
  )
}

export default OrderScreen