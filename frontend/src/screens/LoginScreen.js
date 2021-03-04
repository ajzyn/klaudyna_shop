import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../styles/LoginScreen.scss'
import { userLogin, getUserProfile } from '../actions/UserActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { USER_LOGIN_RESET } from '../constants/UserConstants'

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const { userInfo, loading, error } = useSelector(state => state.userLogin)

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
  }, [location, history, dispatch, redirect, userInfo])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Niepoprawny e-mail')
        .required('Wymagane pole'),
      password: Yup.string()
        .min(8, 'Minimalna długość hasła to 8 znaków')
        .max(20, 'Maksymalna długość hasła to 20 znaków')
        .required('Wymagane pole')
    }),
    onSubmit: values => {
      dispatch(userLogin(values))
    }
  })

  return (
    <Container>
      {loading && <Loader />}
      <div className='loginscreen-form-container'>
        {error && (
          <Message padding variant='danger'>
            {error}
          </Message>
        )}
        <h1>Zaloguj się</h1>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='email'>Podaj adres e-mail</Form.Label>
            <Form.Control
              id='email'
              type='email'
              autoComplete='email'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback className='d-block' type='invalid'>
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Podas hasło</Form.Label>
            <Form.Control
              type='password'
              id='password'
              autoComplete='current-password'
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <Form.Control.Feedback className='d-block' type='invalid'>
                {formik.errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button type='submit'>Zaloguj</Button>
        </Form>
        <div className='py-3'>
          Nie masz konta?{' '}
          <Link to={`/register${redirect && `?redirect=${redirect}`}`}>
            Zarejestruj się
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default LoginScreen
