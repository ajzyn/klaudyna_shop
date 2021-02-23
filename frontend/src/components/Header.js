import React from 'react'
import SearchBox from './SearchBox'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Image, Container, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.scss'
import { userLogout } from '../actions/UserActions'

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
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
            <LinkContainer to='/cart'>
              <Nav.Link>
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className='mr-2'
                  size='lg'
                />
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <Dropdown onSelect={e => console.log(e)}>
                <Dropdown.Toggle id='dropdown-custom-1' as='a'>
                  <FontAwesomeIcon icon={faUser} size='lg' className='mr-2' />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  popperConfig={{
                    modifiers: {
                      preventOverflow: {
                        boundariesElement: 'offsetParent'
                      }
                    }
                  }}
                >
                  <LinkContainer to='/profile'>
                    <Dropdown.Item eventKey='1'>Profil</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item
                    onClick={() => dispatch(userLogout())}
                    eventKey='2'
                    active={false}
                  >
                    Wyloguj
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link className='mr-3'>
                  <FontAwesomeIcon icon={faUser} size='lg' className='mr-2' />
                </Nav.Link>
              </LinkContainer>
            )}
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
