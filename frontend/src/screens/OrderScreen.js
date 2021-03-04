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
import useCheckAuthorization from '../hooks/useCheckAuthorization'
import Message from '../components/Message'
import '../styles/cartscreen.scss'
import Loader from '../components/Loader'
import { getOrder } from '../actions/OrderActions'
import { getUserProfile } from '../actions/UserActions'

const ColStyle = {
  margin: 'auto'
}

//w cart zmien na productID id
const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const { id } = match.params

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (order) {
      if (order._id !== id) {
        history.push('/')
      }
    } else {
      dispatch(getOrder(id))
    }
  }, [dispatch, id])

  useCheckAuthorization(history)
  if (!loading && !error) {
    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
    order.itemsPrice = addDecimals(
      order.cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <h1>{`Zamówienie ${id}`}</h1>
      <Row>
        <Col md='8'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>Wysyłka</h4>
              <p>Imie : {userInfo.name}</p>
              <p>Email : {userInfo.email}</p>
              <p>
                Adres : {order.shippingAddress.address},
                {order.shippingAddress.postalCode}, {order.shippingAddress.city}
                ,{order.shippingAddress.country}
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
              <ListGroup.Item className='d-flex justify-content-center'>
                <p>button</p>
              </ListGroup.Item>
            </Card>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderScreen
