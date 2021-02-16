import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as fillStar,
  faStarHalfAlt as halfStar
} from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

const Rating = ({ value, numReviews }) => {
  return (
    <div className='my-1'>
      <span>
        {value >= 0.5 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={fillStar}
            style={{ color: 'gold' }}
          />
        ) : value > 0 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={halfStar}
            style={{ color: 'gold' }}
          />
        ) : (
          <FontAwesomeIcon
            className='card-rating'
            icon={emptyStar}
            style={{ color: 'gold' }}
          />
        )}

        {value >= 1.5 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={fillStar}
            style={{ color: 'gold' }}
          />
        ) : value > 1 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={halfStar}
            style={{ color: 'gold' }}
          />
        ) : (
          <FontAwesomeIcon
            className='card-rating'
            icon={emptyStar}
            style={{ color: 'gold' }}
          />
        )}

        {value >= 2.5 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={fillStar}
            style={{ color: 'gold' }}
          />
        ) : value > 2 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={halfStar}
            style={{ color: 'gold' }}
          />
        ) : (
          <FontAwesomeIcon
            className='card-rating'
            icon={emptyStar}
            style={{ color: 'gold' }}
          />
        )}

        {value >= 3.5 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={fillStar}
            style={{ color: 'gold' }}
          />
        ) : value > 3 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={halfStar}
            style={{ color: 'gold' }}
          />
        ) : (
          <FontAwesomeIcon
            className='card-rating'
            icon={emptyStar}
            style={{ color: 'gold' }}
          />
        )}
        {value >= 4.5 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={fillStar}
            style={{ color: 'gold' }}
          />
        ) : value > 4 ? (
          <FontAwesomeIcon
            className='card-rating'
            icon={halfStar}
            style={{ color: 'gold' }}
          />
        ) : (
          <FontAwesomeIcon
            className='card-rating'
            icon={emptyStar}
            style={{ color: 'gold' }}
          />
        )}
        {numReviews !== undefined ? ` z ${numReviews} opini` : null}
      </span>
    </div>
  )
}

export default Rating
