import React from 'react';
import { Pagination, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (!isAdmin) {
    return (
      pages > 1 && (
        //is float left by default
        // <div className="float-left">
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            //x+1 being the page number

            <LinkContainer
              key={x + 1}
              to={
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
        // </div>
      )
    );
  } else {
    return (
      pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            //x+1 being the page number
            <LinkContainer key={x + 1} to={`/admin/productlist/${x + 1}`}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )
    );
  }
};

export default Paginate;
