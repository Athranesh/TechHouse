import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from './Message';
import { listTopProducts } from '../actions/ProductActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { topProducts, error, loading } = useSelector(
    (state) => state.topProductList
  );

  useEffect(() => {
    if (!topProducts && !loading) {
      dispatch(listTopProducts());
    }
  }, [dispatch, topProducts, loading]);

  if (!topProducts) return <></>;

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
          <Carousel.Caption className="carousel-caption">
            <h2>
              {product.name} {product.price}
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
