import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Card,
  Image
} from 'react-bootstrap'
import CheckoutProccess from '../components/CheckoutProcess'
import useCheckAuthorization from '../hooks/useCheckAuthorization'
import Message from '../components/Message'
import { Redirect } from 'react-router-dom'
import '../styles/cartscreen.scss'

const ColStyle = {
  margin: 'auto'
}

const PlaceOrderScreen = ({ history, match, redirect }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems, shippingAddress, paymentMethod, error } = cart

  useCheckAuthorization(history)

  //spradzicz dlaczego po wygasnieciu tokena w redux userinfo jest pusty obiekt, pomimo, ze w localstoarge dalej jest
  //zrobic by wszedzie ceny byly przedstawiane z 2 miesjacmi po przecinku
  //   const totalPrice = cartItems.map(item => item.price*item.qty) oblicz totalPrice
  // potem push na /order
  // zrobic w backend model dla Order - ma zawierac m.in
  //   1. ref o uzytkownika
  //   2. adresy przesylki
  //   3. metoda platnosci
  //   4. koszyk bedacy tablica - orderitems
  //   5. laczna kwote
  //   6 podatki
  //   7. przesylka
  //   7a. cena przrzesylki
  //   8. czy dostarczono
  //   9. kiedy dostarczono
  //   10. czy zaplacono
  //   11. kiedy zaplacono

  useEffect(() => {}, [history, cart])
  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      {cartItems.length === 0 ||
      !paymentMethod ||
      Object.keys(shippingAddress).length === 0 ? (
        <Redirect to='/login' />
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
                            {`${cartItem.qty} x ${
                              cartItem.price
                            }zł = ${cartItem.qty * cartItem.price}`}
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
                      <Col>{}</Col>
                    </Row>
                    <Row>
                      <Col>Przesyłka</Col>
                    </Row>
                    <Row>
                      <Col>Podatki</Col>
                    </Row>

                    <Row>
                      <Col>Łącznie do zapłaty</Col>
                    </Row>
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
