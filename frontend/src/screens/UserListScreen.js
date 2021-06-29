import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import { getAllUsers } from '../actions/UserActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faCheck,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import Loader from '../components/Loader'
import { deleteUser } from '../actions/UserActions'
import Message from '../components/Message'
import { USER_DELETE_RESET } from '../constants/UserConstants'

const trashStyle = {
  padding: '0 !important',
  marginLeft: '5px'
}

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)

  const userList = useSelector((state) => state.userList)
  const { users, loading } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success, error } = userDelete

  useEffect(() => {
    dispatch({ type: USER_DELETE_RESET })
  }, [dispatch])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers())
    } else {
      history.push('/login')
    }
  }, [userInfo, history, dispatch, success, error])

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <Container>
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Użytkownik usunięty</Message>}
      <h1>Użytkownicy</h1>
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                  )}
                </td>
                <td className="d-flex justify-content-center align-items-center">
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="alert">
                      <FontAwesomeIcon size="xs" icon={faEdit} />
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => handleDeleteUser(user._id)}
                    variant="danger"
                    style={trashStyle}
                  >
                    <FontAwesomeIcon size="xs" icon={faTrash} />
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

export default UserListScreen
