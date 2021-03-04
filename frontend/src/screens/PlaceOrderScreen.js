import React, { useEffect } from 'react'
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
import CheckoutProccess from '../components/CheckoutProcess'
import useCheckAuthorization from '../hooks/useCheckAuthorization'
import Message from '../components/Message'
import { Redirect } from 'react-router-dom'
import '../styles/cartscreen.scss'
import { createOrder } from '../actions/OrderActions'
import Loader from '../components/Loader'

const ColStyle = {
  margin: 'auto'
}

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems, shippingAddress, paymentMethod, error: cartError } = cart
  const orderCreate = useSelector(state => state.orderCreate)
  const { loading, error: orderError, success, orderId } = orderCreate

  useEffect(() => {
    if (success) history.push(`/order/${orderId}`)
  }, [success, history, orderId])

  useCheckAuthorization(history)

  const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cartItems.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(cart.itemsPrice * 0.23)

  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )

  const handleSubmit = () => {
    dispatch(createOrder(cart))
  }

  return (
    <>
      {cartError && <Message variant='danger'>{cartError}</Message>}
      {orderError && <Message variant='danger'>{orderError}</Message>}
      {cartItems.length === 0 ||
      !paymentMethod ||
      Object.keys(shippingAddress).length === 0 ? (
        <Redirect to='/' />
      ) : (
        <Container>
          <CheckoutProccess step1 step2 step3 step4 />
          <Row>
            <Col md='8'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Wysyłka</h4>
                  <p>{`${shippingAddress.address}, ${shippingAddress.postalCode}, ${shippingAddress.city}, ${shippingAddress.country}`}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Metoda płatności</h4>
                  <p style={{ textTransform: 'uppercase' }}>{paymentMethod}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Przedmioty zamówienia</h4>
                  <ListGroup variant='flush'>
                    {cartItems.map(cartItem => (
                      <ListGroup.Item key={cartItem.id}>
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
                      <Col>{cart.itemsPrice} zł</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Przesyłka</Col>
                      <Col>{cart.shippingPrice} zł</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Podatki</Col>
                      <Col>{cart.taxPrice} zł</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Łącznie do zapłaty</Col>
                      <Col>{cart.totalPrice} zł</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='d-flex justify-content-center'>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button type='button' onClick={handleSubmit}>
                        Załóż zamówienie
                      </Button>
                    )}
                  </ListGroup.Item>
                </Card>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default PlaceOrderScreen
