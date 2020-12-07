import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/ProductActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

function HomeScreen({ match }) {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  const renderScreen = () => {
    if (!loading && !error && !products.length && keyword) {
      return <h6>No results found.</h6>;
    }

    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else {
      return (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      );
    }
  };

  return (
    <>
      <h1>Latest Products</h1>
      {renderScreen()}
    </>
  );
}

export default HomeScreen;
