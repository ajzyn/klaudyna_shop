import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {} from '../actions/ProductActions'
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Container,
  Form
} from 'react-bootstrap'
import { getProductDetails } from '../actions/ProductActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import '../styles/productscreen.scss'
import { PRODUCT_DETAILS_RESET } from '../constants/ProductConstants'
import jwt_decode from 'jwt-decode'

const ProductDetailsScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails
  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET })
    }
  }, [dispatch, match])

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <Container fluid='xl'>
      <Button
        type='button'
        style={{ marginBottom: '20px' }}
        onClick={() => history.goBack()}
      >
        Powrót
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md='4'>
            <div className='productscreen-image'>
              <Image
                src={`/images/${product.image}`}
                fluid
                alt={product.name}
                rounded
              />
            </div>
          </Col>
          <Col md='5'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='productscreen-name'>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>{`Marka : ${product.brand}`}</ListGroup.Item>
              <ListGroup.Item>{`Opis : ${product.description}`}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md='3'>
            <ListGroup>
              <ListGroup.Item>{`Cena : ${product.price}zł`}</ListGroup.Item>
              <ListGroup.Item>
                {`Status : ${
                  product.countInStock > 0 ? 'Dostępny' : 'Niedostępny'
                }`}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ilość</Col>
                  <Col>
                    <Form.Control
                      as='select'
                      onChange={e => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock)].map((count, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' onClick={handleAddToCart}>
                  Dodaj do koszyka
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ProductDetailsScreen
