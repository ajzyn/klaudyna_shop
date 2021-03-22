import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import { getTopRanked } from '../actions/ProductActions'
import Loader from './Loader'
import '../styles/carouse.scss'

const TopRankCarousel = () => {
  const dispatch = useDispatch()
  const productTopRank = useSelector(state => state.productTopRank)
  const { loading, products } = productTopRank
  useEffect(() => {
    dispatch(getTopRanked())
  }, [dispatch])
  return loading ? (
    <Loader />
  ) : (
    <Carousel className='w-100 carousel-custom'>
      {products &&
        products.map(product => (
          <Carousel.Item key={product._id}>
            <img
              className='d-block w-100'
              src={`/images/${product.image}`}
              alt='product image'
            />
            <Carousel.Caption>
              <h5>{product.name}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default TopRankCarousel
