import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import '../styles/profilescreen.scss'
import { updateUserProfile } from '../actions/UserActions'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (!userInfo) history.push('/')
  }, [dispatch, userInfo, history])

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
        [Yup.ref('registerPassword'), null],
        'Hasła muszą być takie same!'
      )
    }),
    onSubmit: values => {
      const data = {
        name: values.editName ? values.editName : null,
        email: values.editEmail ? values.editEmail : null,
        password: values.editPassword ? values.editPassword : null
      }
      dispatch(updateUserProfile(data))
    }
  })
  return (
    <Container className='profilescreen-container'>
      <Row>
        <Col md={3}>
          <h2>Profil użytkownika</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control
                type='text'
                id='editName'
                {...formik.getFieldProps('editName')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Adres email</Form.Label>
              <Form.Control
                type='email'
                id='editEmail'
                autoComplete='username'
                {...formik.getFieldProps('editEmail')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type='password'
                id='editPassword'
                autoComplete='new-password'
                {...formik.getFieldProps('editPassword')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Potwierdź hasło</Form.Label>
              <Form.Control
                type='password'
                id='editConfirmPassword'
                autoComplete='new-password'
                {...formik.getFieldProps('editConfirmPassword')}
              />
            </Form.Group>
            <Button type='submit'>Edytuj dane</Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Moje zamówienia</h2>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
