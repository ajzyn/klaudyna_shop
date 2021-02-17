import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  ListGroup,
  Col,
  Row,
  Image,
  Form,
  Button
} from 'react-bootstrap'
import { AddToCart } from '../actions/CartActions'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../styles/cartscreen.scss'

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)

  const qty = location.search
    ? Number(location.search.slice(location.search.indexOf('=') + 1))
    : 1
  const productId = match.params.id
  useEffect(() => {
    if (productId) {
      dispatch(AddToCart(productId, qty))
    }
  }, [dispatch, match, location, history])

  const handleRemoveProduct = () => {
    console.log('remove')
  }

  const orderHanlder = () => {
    //  po zalogowaniu ma przekierowywac na shipping
  }

  const subtotalItems = cartItems.reduce((acc, curr) => acc + curr.qty, 0)

  return (
    <Container>
      <h1>Koszyk</h1>
      <Row>
        <Col md='8'>
          <ListGroup variant='flush'>
            {cartItems.map(product => (
              <ListGroup.Item key={product.id}>
                <Row className='cartscreen-row'>
                  <Col md='3'>
                    <Image
                      src={`/images/${product.image}`}
                      className='cartscreen-image'
                    />
                  </Col>
                  <Col md='3'>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </Col>
                  <Col md='2'>{product.price} zł</Col>
                  <Col md='2'>
                    <Form.Control
                      as='select'
                      value={product.qty}
                      onChange={e =>
                        dispatch(AddToCart(product.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(product.countInStock)].map((item, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md='1'>
                    <Button type='button' onClick={handleRemoveProduct}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md='4'>
          <ListGroup>
            <ListGroup.Item>
              <h4>{`Łącznie ${subtotalItems} ${
                subtotalItems > 1 ? 'przedmioty' : 'przedmiot'
              }`}</h4>
              <span>
                {cartItems.reduce(
                  (acc, curr) => acc + curr.qty * curr.price,
                  0
                )}{' '}
                zł
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                onClick={orderHanlder}
              >
                Zamów
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

// dodać powrót
// obsłuzyzyc brak przedmiotw w koszyku
// dodac style - zdjecie ten sam heigh ma miec
// usuniecie z koszyka
// powrot z productDetails po przejsciu do niego z koszyka

export default CartScreen
