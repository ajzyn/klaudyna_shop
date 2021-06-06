import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import CheckoutProcess from '../components/CheckoutProcess'
import { SavePaymentMethod } from '../actions/CartActions'
import useCheckAuthorization from '../hooks/useCheckAuthorization'

const btnStyle = {
  padding: '10px 20px',
  display: 'block',
  margin: '50px auto 0'
}

const PaymentMethodScreen = ({ history }) => {
  useCheckAuthorization(history)
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const dispatch = useDispatch()

  const submitHandler = () => {
    dispatch(SavePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='6'>
          <CheckoutProcess step1 step2 step3 />
          <h1 style={{ marginBottom: '50px' }}>Wybierz metode platności</h1>
          <Form onSubmit={submitHandler}>
            <Form.Check
              type='radio'
              value='paypal'
              name='paymentMethod'
              defaultChecked
              id='PayPalMethod'
              label='PayPal albo karta kredytowa'
              onClick={e => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              value='free'
              name='paymentMethod'
              id='FreePaymentMethod'
              label='Za darmo'
              onClick={e => setPaymentMethod(e.target.value)}
            />
            <Button type='submit' style={btnStyle}>
              Przejdź dalej
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentMethodScreen
