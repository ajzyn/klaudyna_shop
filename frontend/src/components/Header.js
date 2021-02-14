import React from 'react'
import SearchBox from './SearchBox'
import { Navbar, Nav, Image, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.scss'

const Header = () => {
  return (
    <header className='sticky-top'>
      <Navbar
        bg='ligth'
        expand='lg'
        className='custom-navbar-header'
        bg='dark-purple'
      >
        <Container className='header-container'>
          <Navbar.Brand as='h1'>
            <LinkContainer to='/'>
              <Image src='/logo.png' fluid className='header-logo' />
            </LinkContainer>
          </Navbar.Brand>
          <SearchBox />
          <Nav className='ml-auto'>
            <Nav.Link className='mr-3'>
              <FontAwesomeIcon icon={faUser} size='lg' className='mr-2' />
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className='mr-2'
                size='lg'
              />
            </Nav.Link>
          </Nav>

          {/* <Navbar.Collapse id='navbar-toggle'>
            <Nav className='ml-auto'>
              {width < 992 && <div className='separator' />}
              <Nav.Link className='mr-3'>
                <FontAwesomeIcon
                  icon={faUser}
                  size='lg'
                  className='primary-color mr-2'
                />
                <span>Zaloguj</span>
              </Nav.Link>
              <Nav.Link>
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className='mr-2 primary-color'
                  size='lg'
                />
                <span>Koszyk</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
