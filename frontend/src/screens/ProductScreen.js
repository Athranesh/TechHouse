import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/ProductActions';
import { getUserDetails } from '../actions/userActions';
import { USER_DETAILS_RESET } from '../types/userTypes';

function ProductScreen({ history, match }) {
  const itemId = match.params.id;

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin.userInfo);
  const userDetailsInfo = useSelector((state) => state.userDetails.userInfo);
  const productDetails = useSelector((state) => state.productDetails.product);

  console.log(productDetails);

  // const renderReviewBtn = () => {
  if (userDetailsInfo) {
    userDetailsInfo.orders.forEach((order) => {
      console.log(order);
      order.orderItems.forEach((item) => {
        const purchasedItemId = item.product;

        if (purchasedItemId === itemId) {
          //If productDetails.reviews contains a review from this user, disable button
          //If productDetails.reviews does not contain a review from this user and product is delivered, enable button
          //If productDetails.reviews does not contain a review from this user but product is not delivered, ask them to wait
        }
      });
    });
  }
  // };

  useEffect(() => {
    //Prevents double loading and extra rerender
    if (userLogin) {
      if (userLogin && !userDetailsInfo) {
        dispatch(getUserDetails());
        dispatch(getProduct(itemId));
      }
    } else {
      dispatch(getProduct(itemId));
    }
  }, [dispatch, itemId, userLogin, userDetailsInfo]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${itemId}?qty=${qty}`);

    // history.push(`/cart/${itemId}/${qty}`);
  };

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const userInfo = useSelector((state) => state.userInfo);

  const renderScreen = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (product) {
      return (
        <Row>
          <Col lg={6}>
            <Image src={product.image} alt={product.name} fluid />
            {/*fluid stops items from going out of their containers*/}
          </Col>
          <Col lg={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {/*
                          Array(number) creates an [empty * number], spreading it creates an array of undefined items, as many as the number is. Example:[...Array(5)] gives an array of 5 undefineds. Using .key() returns their indeces, so we end up with an array of [0,1,2,3,4]
                           */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock <= 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {renderScreen()}
    </>
  );
}

export default ProductScreen;
