import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, offset, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => {
          return (
            <LinkContainer
              key={x + 1}
              to={
                isAdmin
                  ? `/admin/products/page/${x + 1}`
                  : keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              <Pagination.Item active={x === offset}>{x + 1}</Pagination.Item>
            </LinkContainer>
          )
        })}
      </Pagination>
    )
  )
}

export default Paginate
