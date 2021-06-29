import React from 'react'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Image, Container, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.scss'
import { userLogout } from '../actions/UserActions'

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  return (
    <header className="sticky-top">
      <Navbar bg="dark-purple" expand="lg" className="custom-navbar-header">
        <Container className="header-container">
          <Navbar.Brand as="h1">
            <LinkContainer to="/">
              <Image src="/logo.png" fluid className="header-logo" />
            </LinkContainer>
          </Navbar.Brand>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className="mr-2"
                  size="lg"
                />
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-1" as="a">
                  <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
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
                  <LinkContainer to="/profile">
                    <Dropdown.Item eventKey="4">Profil</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item
                    onClick={() => dispatch(userLogout())}
                    eventKey="5"
                    active={false}
                  >
                    Wyloguj
                  </Dropdown.Item>
                  {userInfo.isAdmin && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Header>Zarządzaj</Dropdown.Header>
                      <LinkContainer to="/admin/orders">
                        <Dropdown.Item eventKey="1">Zamówienia</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <Dropdown.Item eventKey="2">Użytkownicy</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <Dropdown.Item eventKey="3">Produkty</Dropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="mr-3">
                  <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
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
