import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ children, variant }) => {
  console.log(variant)
  return <Alert>{children}</Alert>
}

export default Message
