import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../styles/LoginScreen.scss'
import { userRegister, getUserProfile } from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { USER_REGISTER_RESET } from '../constants/UserConstants'

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.userRegister)
  const { userInfo } = useSelector(state => state.userLogin)

  const redirect = location.search
    ? location.search.slice(location.search.indexOf('=') + 1)
    : ''

  useEffect(() => {
    if (userInfo) {
      if (redirect) {
        history.push(`/${redirect}`)
      } else {
        history.push(`/profile`)
      }
    }
    return () => dispatch({ type: USER_REGISTER_RESET })
  }, [location, history, dispatch, redirect, userInfo])

  const formik = useFormik({
    initialValues: {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object({
      registerName: Yup.string()
        .min(8, 'Minimalna długość nazwy użytkownika to 8 znaków')
        .max(20, 'Maksymalna długość nazwy użytkownika to 20 znaków')
        .required('Wymagane pole'),
      registerEmail: Yup.string()
        .email('Niepoprawny e-mail')
        .required('Wymagane pole'),
      registerPassword: Yup.string()
        .min(8, 'Minimalna długość hasła to 8 znaków')
        .max(20, 'Maksymalna długość hasła to 20 znaków')
        .required('Wymagane pole'),
      passwordConfirmation: Yup.string()
        .oneOf(
          [Yup.ref('registerPassword'), null],
          'Hasła muszą być takie same!'
        )
        .required('Wymagane pole')
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        userRegister({
          name: values.registerName,
          email: values.registerEmail,
          password: values.registerPassword
        })
      )
      resetForm()
    }
  })

  //czyszczenie

  return (
    <Container>
      {loading && <Loader />}
      <div className='loginscreen-form-container'>
        {error && (
          <Message padding variant='danger'>
            {error}
          </Message>
        )}
        <h1>Zarejestruj się</h1>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='registerName'>
              Podaj nazwę użytkownika
            </Form.Label>
            <Form.Control
              id='registerName'
              type='text'
              autoComplete='name'
              {...formik.getFieldProps('registerName')}
            />
            {formik.touched.registerName && formik.errors.registerName && (
              <Form.Control.Feedback className='d-block' type='invalid'>
                {formik.errors.registerName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='registerEmail'>Podaj adres e-mail</Form.Label>
            <Form.Control
              id='registerEmail'
              type='email'
              autoComplete='email'
              {...formik.getFieldProps('registerEmail')}
            />
            {formik.touched.registerEmail && formik.errors.registerEmail && (
              <Form.Control.Feedback className='d-block' type='invalid'>
                {formik.errors.registerEmail}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='registerPassword'>Podas hasło</Form.Label>
            <Form.Control
              type='password'
              id='registerPassword'
              autoComplete='new-password'
              {...formik.getFieldProps('registerPassword')}
            />
            {formik.touched.registerPassword && formik.errors.registerPassword && (
              <Form.Control.Feedback className='d-block' type='invalid'>
                {formik.errors.registerPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='passwordConfirmation'>Podas hasło</Form.Label>
            <Form.Control
              type='password'
              id='passwordConfirmation'
              autoComplete='new-password'
              {...formik.getFieldProps('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation && (
                <Form.Control.Feedback className='d-block' type='invalid'>
                  {formik.errors.passwordConfirmation}
                </Form.Control.Feedback>
              )}
          </Form.Group>
          <Button type='submit'>Zaloguj</Button>
        </Form>
        <div className='py-3'>
          Masz konto?{' '}
          <Link to={`/login${redirect && `?redirect=${redirect}`}`}>
            Zaloguj się
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default RegisterScreen
