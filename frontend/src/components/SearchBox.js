import React, { useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [input, setInput] = useState('')
  const submitHanlder = e => {
    e.preventDefault()
    if (input.trim()) {
      history.push(`/search/${input}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={submitHanlder} className='d-flex header-searchbox'>
      <FormControl
        type='text'
        placeholder='czego szukasz?'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button type='submit' variant='primary' color='light'>
        Szukaj
      </Button>
    </Form>
  )
}

export default SearchBox
