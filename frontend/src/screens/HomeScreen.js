import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Loader from '../components/Loader'
import Categories from '../components/Categories'
import Product from '../components/Product'
import '../styles/homescreen.scss'
import { getProducts } from '../actions/ProductActions'
import Message from '../components/Message'

const HomeScreen = () => {
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <div>
      <Categories />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='homescreen-best-products'>
          <h3>Najciekawsze produkty</h3>
          <hr />
          <Container>
            <Row xs='2' md='4'>
              {products.map(product => (
                <Col key={product._id} style={{ marginBottom: '35px' }}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
