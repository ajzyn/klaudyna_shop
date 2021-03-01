import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const navStyle = {
  marginTop: '-25px',
  marginBottom: '25px'
}

const CheckoutProcess = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='d-flex flex-row justify-content-center' style={navStyle}>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Zaloguj</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Zaloguj</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Wysyłka</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Wysyłka</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Płatności</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Płatności</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/checkout'>
            <Nav.Link>Złóż zamówienie</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Złóż zamówienie</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutProcess
