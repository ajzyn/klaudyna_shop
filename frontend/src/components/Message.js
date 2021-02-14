import React from 'react'
import { Alert, Container } from 'react-bootstrap'

const Message = ({ children, variant }) => {
  return (
    <Container>
      <Alert variant={variant}>{children}</Alert>
    </Container>
  )
}

export default Message
