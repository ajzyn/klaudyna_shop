import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import { getProducts } from '../actions/ProductActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faCheck,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import Loader from '../components/Loader'
import Message from '../components/Message'

const trashStyle = {
  padding: '0 !important',
  marginLeft: '5px'
}

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const productList = useSelector(state => state.productList)
  const { products, loading, error } = productList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProducts())
    } else {
      history.push('/login')
    }
  }, [userInfo, history, dispatch])

  const handleDeleteProduct = id => {
    // dispatch(deleteUser(id))
    console.log('dziala')
  }

  return (
    <Container>
      {error && <Message variant='danger'>{error}</Message>}
      <h1>Produkty</h1>
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Kategoria</th>
              <th>Marka</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className='d-flex justify-content-center align-items-center'>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant='alert'>
                      <FontAwesomeIcon size='xs' icon={faEdit} />
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => handleDeleteProduct(product._id)}
                    variant='danger'
                    style={trashStyle}
                  >
                    <FontAwesomeIcon size='xs' icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default ProductListScreen
