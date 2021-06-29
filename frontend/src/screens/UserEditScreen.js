import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  getUserProfileById,
  updateUserProfileById
} from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  USER_PROFILE_DETAILS_RESET,
  USER_UPDATE_RESET
} from '../constants/UserConstants'
import useCheckAuthorization from '../hooks/useCheckAuthorization'

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.userProfile)
  const { error, loading, userInfo: user } = userProfile

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate
  } = userUpdate

  const { userInfo } = useSelector((state) => state.userLogin)

  useCheckAuthorization(history)

  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET })
  }, [dispatch])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserProfileById(userId))
    }

    return () => {
      dispatch({ type: USER_PROFILE_DETAILS_RESET })
    }
  }, [userInfo, dispatch, history, userId])

  const formik = useFormik({
    initialValues: {
      editUserName: (user && user.name) || '',
      editUserEmail: (user && user.email) || '',
      editUserIsAdmin: (user && user.isAdmin) || false
    },
    validationSchema: Yup.object({
      editUserName: Yup.string()
        .min(8, 'Minimalna długość nazwy użytkownika to 8 znaków')
        .max(20, 'Maksymalna długość nazwy użytkownika to 20 znaków')
        .required('Wymagane pole'),
      editUserEmail: Yup.string()
        .email('Niepoprawny e-mail')
        .required('Wymagane pole'),
      editUserIsAdmin: Yup.boolean()
    }),
    onSubmit: (values) => {
      dispatch(
        updateUserProfileById(userId, {
          name: values.editUserName,
          email: values.editUserEmail,
          isAdmin: values.editUserIsAdmin
        })
      )
    },
    enableReinitialize: true
  })

  return loading || loadingUpdate || !user ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {successUpdate && (
        <Message variant="success">Użytkownik zedytowany</Message>
      )}
      {errorUpdate && <Message variant="success">{errorUpdate}</Message>}
      <Container>
        <Row>
          <Col md={6}>
            <Button as="a" onClick={() => history.goBack()}>
              Powrót
            </Button>
            <h1>Edytuj dane użytkownika</h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label>Nazwa uzytkownika</Form.Label>
                <Form.Control
                  id="editUserName"
                  type="text"
                  {...formik.getFieldProps('editUserName')}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email uzytkownika</Form.Label>
                <Form.Control
                  id="editUserEmail"
                  type="email"
                  {...formik.getFieldProps('editUserEmail')}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Uprawnienia administratora</Form.Label>
                <Form.Check
                  id="editUserEmail"
                  type="checkbox"
                  checked={formik.values.editUserIsAdmin}
                  {...formik.getFieldProps('editUserIsAdmin')}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit">Zapisz</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserEditScreen
