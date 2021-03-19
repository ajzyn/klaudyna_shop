import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
import { getProductDetails, createReview } from '../actions/ProductActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import '../styles/productscreen.scss'
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REVIEW_RESET
} from '../constants/ProductConstants'

const ProductDetailsScreen = ({ match, history }) => {
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [incorrectSelectValue, setIncorrectSelectValue] = useState(false)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails
  const [qty, setQty] = useState(1)

  const productCreateReview = useSelector(state => state.productCreateReview)
  const {
    success: successReview,
    loading: loadingReview,
    error: errorReview
  } = productCreateReview

  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET })
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match.params.id, successReview, errorReview])

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (rating === 'Wybierz' || rating === '' || comment === '') {
      setIncorrectSelectValue(true)
      return
    }
    setIncorrectSelectValue(false)
    setComment('')
    setRating('')
    dispatch(
      createReview(match.params.id, {
        name: userInfo.name,
        user: userInfo._id,
        comment,
        rating
      })
    )
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
        <>
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
                        {[...Array(product.countInStock)].map(
                          (count, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
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
          <Row>
            <Col md='6'>
              <h3 className='ml-0'>Opinie</h3>
              {userInfo ? (
                <ListGroup variant='flush'>
                  {product.numReviews > 0 ? (
                    <ListGroup variant='flush'>
                      {product.reviews.map(review => (
                        <ListGroup.Item key={review.user}>
                          <p>{review.name}</p>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Message variant='info'>Brak opinii</Message>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <h3 className='ml-0'>Napisz swoją opinie</h3>
                    {errorReview && (
                      <Message variant='danger'>{errorReview}</Message>
                    )}
                    {incorrectSelectValue && (
                      <Message variant='danger'>Proszę uzupełnić pola</Message>
                    )}
                    {successReview && (
                      <Message variant='success'>Dodano komenatrz</Message>
                    )}
                    {loadingReview ? (
                      <Loader />
                    ) : (
                      <>
                        <Form.Group>
                          <Form.Label>Ocena</Form.Label>
                          <Form.Control
                            as='select'
                            onChange={e => setRating(e.target.value)}
                            value={rating}
                          >
                            <option>Wybierz</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Komenatarz</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={3}
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                          />
                        </Form.Group>
                      </>
                    )}
                    <Button type='submit'>Skomentuj</Button>
                  </Form>
                </ListGroup>
              ) : (
                <Message varaint='info'>
                  <Link to={`/login?redirect=product/${product._id}`}>
                    Zaloguj się
                  </Link>{' '}
                  by dodać komenatrz
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProductDetailsScreen
