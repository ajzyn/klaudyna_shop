import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

const SearchBox = () => {
  const submitHanlder = e => {
    e.preventDefault()
  }
  return (
    <Form onSubmit={submitHanlder} className='d-flex header-searchbox'>
      <FormControl type='text' placeholder='czego szukasz?' />
      <Button type='submit' variant='primary' color='light'>
        Szukaj
      </Button>
    </Form>
  )
}

export default SearchBox
