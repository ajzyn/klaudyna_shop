import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Categories from '../components/Categories'
import Product from '../components/Product'
import '../styles/homescreen.scss'
import { getProducts } from '../actions/ProductActions'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import TopRankCarousel from '../components/TopRankCarousel'

const HomeScreen = ({ match }) => {
  const { keyword } = match.params
  const productList = useSelector(state => state.productList)
  const {
    error,
    loading,
    products,
    offset: offsetProductList,
    pages
  } = productList
  const { loading: loadingCarousel } = useSelector(
    state => state.productTopRank
  )
  const dispatch = useDispatch()
  const offset = match.params.offset - 1 || 0

  useEffect(() => {
    dispatch(getProducts(keyword, offset))
  }, [dispatch, keyword, offset])
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
            <>
              <Row>
                <TopRankCarousel />
              </Row>
              <Row xs='2' md='4'>
                {products.length > 0 ? (
                  products.map(product => (
                    <Col key={product._id} style={{ marginBottom: '35px' }}>
                      <Product product={product} />
                    </Col>
                  ))
                ) : (
                  <Message variant='info'>Brak wyników wyszukiwanai</Message>
                )}
              </Row>
              <Paginate
                pages={pages}
                offset={offsetProductList}
                keyword={keyword}
              />
            </>
          </Container>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
