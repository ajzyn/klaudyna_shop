import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Container, Form, Button, Table } from 'react-bootstrap'
import '../styles/profilescreen.scss'
import { updateUserProfile } from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useCheckAuthorization from '../hooks/useCheckAuthorization'
import { getOrders } from '../actions/OrderActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { USER_UPDATE_PROFILE_RESET } from '../constants/UserConstants'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { userInfo, loading } = useSelector((state) => state.userLogin)
  const { success: successUpdateUserProfile, error } = useSelector(
    (state) => state.userUpdatedProfile
  )

  const orderListMy = useSelector((state) => state.orderListMy)
  const { orders, loading: loadingOrders, success } = orderListMy

  useCheckAuthorization(history)

  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
  }, [dispatch])

  useEffect(() => {
    if (userInfo && !success) {
      dispatch(getOrders())
    }
  }, [dispatch, userInfo, success])

  const formik = useFormik({
    initialValues: {
      editName: userInfo ? userInfo.name : '',
      editEmail: userInfo ? userInfo.email : '',
      editPassword: '',
      editConfirmPassword: ''
    },
    validationSchema: Yup.object({
      editName: Yup.string()
        .min(8, 'Minimalna długość nazwy użytkownika to 8 znaków')
        .max(20, 'Maksymalna długość nazwy użytkownika to 20 znaków'),
      editEmail: Yup.string().email('Niepoprawny e-mail'),
      editPassword: Yup.string()
        .min(8, 'Minimalna długość hasła to 8 znaków')
        .max(20, 'Maksymalna długość hasła to 20 znaków'),
      editConfirmPassword: Yup.string().oneOf(
        [Yup.ref('editPassword'), null],
        'Hasła muszą być takie same!'
      )
    }),
    onSubmit: (values) => {
      const data = {
        name: values.editName ? values.editName : null,
        email: values.editEmail ? values.editEmail : null,
        password: values.editPassword ? values.editPassword : null
      }
      dispatch(updateUserProfile(data))
    }
  })

  return loading ? (
    <Loader />
  ) : (
    <Container className="profilescreen-container">
      {successUpdateUserProfile && (
        <Message variant="success">Udało się zmienić dane</Message>
      )}
      {error && <Message variant="danger">Nie udał się zmienić danych</Message>}
      <Row>
        <Col>
          <Button onClick={() => history.goBack()}>Powrót</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => history.goBack()}>Powrót</Button>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <h2>Profil użytkownika</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control
                type="text"
                id="editName"
                {...formik.getFieldProps('editName')}
              />
              {formik.touched.editName && formik.errors.editName && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  {formik.errors.editName}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Adres email</Form.Label>
              <Form.Control
                type="email"
                id="editEmail"
                {...formik.getFieldProps('editEmail')}
              />
              {formik.touched.editEmail && formik.errors.editEmail && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  {formik.errors.editEmail}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                id="editPassword"
                autoComplete="new-password"
                {...formik.getFieldProps('editPassword')}
              />
              {formik.touched.editPassword && formik.errors.editPassword && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  {formik.errors.editPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Potwierdź hasło</Form.Label>
              <Form.Control
                type="password"
                id="editConfirmPassword"
                autoComplete="new-password"
                {...formik.getFieldProps('editConfirmPassword')}
              />
              {formik.touched.editConfirmPassword &&
                formik.errors.editConfirmPassword && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {formik.errors.editConfirmPassword}
                  </Form.Control.Feedback>
                )}
            </Form.Group>
            <Button type="submit">Edytuj dane</Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Moje zamówienia</h2>
          {loadingOrders ? (
            <Loader />
          ) : orders.length < 1 ? (
            <Message variant="info">Brak zamówień</Message>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Kwota</th>
                  <th>Płatność</th>
                  <th>Wysyłka</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: 'green' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: 'red' }}
                        />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: 'green' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: 'red' }}
                        />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>Szczegóły</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
