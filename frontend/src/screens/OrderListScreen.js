import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import { getAllOrders } from '../actions/OrderActions'
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

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const orderList = useSelector(state => state.orderList)
  const { error, orders, loading } = orderList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders())
    } else {
      history.push('/login')
    }
  }, [userInfo, history, dispatch])

  return (
    <Container>
      {error && <Message variant='danger'>{error}</Message>}
      <h1>Zamówienia</h1>
      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Użytkownik</th>
              <th>Data złożenia zamówienia</th>
              <th>Kwota</th>
              <th>Płatność</th>
              <th>Dostawa</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} zł</td>
                <td>
                  {order.isPaid ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                  )}
                </td>
                <td className='d-flex justify-content-center align-items-center'>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button>Szczegóły</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message variant='info'>Brak zamówień</Message>
      )}
    </Container>
  )
}

export default OrderListScreen
