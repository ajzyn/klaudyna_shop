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
import { LinkContainer } from 'react-router-bootstrap'
import { getProductDetails } from '../actions/ProductActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductDetailsScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails
  const [qty, setQty] = useState(product && product.countInStock > 0 ? 1 : 0)

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match])

  const handleAddToCart = () => {
    history.push(`/cart/`)
  }

  return (
    <Container fluid='xl'>
      <LinkContainer to='/'>
        <Button>Powrót</Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md='6'>
            <Image src={`/images${product.image}`} fluid />
          </Col>
          <Col md='3'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
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
                      onChange={e => console.log(e.target.value)}
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
