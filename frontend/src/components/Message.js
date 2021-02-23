import React from 'react'
import { Alert, Container } from 'react-bootstrap'

const Message = ({ children, variant, padding }) => {
  const setPadding = padding ? '0' : null

  return (
    <Container style={{ padding: setPadding }}>
      <Alert variant={variant}>{children}</Alert>
    </Container>
  )
}

export default Message
