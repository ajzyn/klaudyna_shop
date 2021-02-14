import React from 'react'
import { ListGroup, Image } from 'react-bootstrap'
import LinkContainer from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPumpSoap,
  faCookieBite,
  faToilet,
  faUtensils,
  faQuestion
} from '@fortawesome/free-solid-svg-icons'
import '../styles/categories.scss'

const Categories = () => {
  return (
    <div className='categories-container'>
      <h3>Kategorie</h3>
      <hr />
      <ListGroup className='categories'>
        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faToilet} />
            </div>
            <p>Chemia domowa</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faCookieBite} />
            </div>
            <p>Słodycze</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faPumpSoap} />
            </div>
            <p>Higiena</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faUtensils} />
            </div>
            <p>Jedzenie</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>

        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>
        <Link to='/dupa'>
          <ListGroup.Item>
            <div className='list-group-item-circle'>
              <FontAwesomeIcon size='4x' icon={faQuestion} />
            </div>
            <p>Coś innego</p>
          </ListGroup.Item>
        </Link>
      </ListGroup>
    </div>
  )
}

export default Categories
