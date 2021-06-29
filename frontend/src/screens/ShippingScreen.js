import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CheckoutProcess from '../components/CheckoutProcess'
import { SaveShippingAddress } from '../actions/CartActions'
import useCheckAuthorization from '../hooks/useCheckAuthorization'

const btnStyle = {
  padding: '10px 20px',
  display: 'block',
  margin: '50px auto 0'
}

const ShippingScreen = ({ history }) => {
  useCheckAuthorization(history)
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)

  const formik = useFormik({
    initialValues: {
      address: shippingAddress ? shippingAddress.address : '',
      city: shippingAddress ? shippingAddress.city : '',
      postalCode: shippingAddress ? shippingAddress.postalCode : '',
      country: shippingAddress ? shippingAddress.country : ''
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Wypełnij pole'),
      city: Yup.string().required('Wypełnij pole'),
      postalCode: Yup.string().required('Wypełnij pole'),
      country: Yup.string().required('Wypełnij pole')
    }),
    onSubmit: (values) => {
      dispatch(SaveShippingAddress(values))
      history.push('/payment')
    },
    enableReinitialize: true
  })
  return (
    <>
      <Container>
        <CheckoutProcess step1 step2 />
        <Row className="justify-content-md-center">
          <Col md="6">
            <h1 className="mb-5">Wysyłka</h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Form.Label>Adres</Form.Label>
                <Form.Control
                  type="text"
                  id="address"
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {formik.errors.address}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label>Miasto</Form.Label>
                <Form.Control
                  type="text"
                  id="city"
                  {...formik.getFieldProps('city')}
                />
                {formik.touched.city && formik.errors.city && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {formik.errors.city}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label>Kod pocztowy</Form.Label>
                <Form.Control
                  type="text"
                  id="postalCode"
                  {...formik.getFieldProps('postalCode')}
                />
                {formik.touched.postalCode && formik.errors.postalCode && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {formik.errors.postalCode}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label>Kraj</Form.Label>
                <Form.Control
                  type="text"
                  id="country"
                  {...formik.getFieldProps('country')}
                />
                {formik.touched.country && formik.errors.country && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {formik.errors.country}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
              <Button type="submit" style={btnStyle}>
                Przejdź dalej
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ShippingScreen
