import React from 'react'
import { Card, CardDeck } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'
import '../styles/homescreen.scss'

const Product = ({ product }) => {
  const { _id, name, brand, rating, price, image } = product

  return (
    <LinkContainer to={`/product/${_id}`}>
      <Card className='card-container'>
        <Card.Img
          variant='bottom'
          src={image}
          className='homescreen-card-image'
        />
        <Card.Body>
          <Card.Title as='h4'>{name}</Card.Title>
          <div className='card-content-separator'>
            <Card.Text>
              {' '}
              <small className='text-muted'>{brand} </small>{' '}
            </Card.Text>
            <Rating value={rating} />
            <Card.Text>Cena: {price} zł</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </LinkContainer>
  )
}

export default Product
