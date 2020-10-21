import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/ProductActions';

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const renderScreen = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    } else if (error) {
      return <h3>{error}</h3>;
    } else {
      return (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
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
