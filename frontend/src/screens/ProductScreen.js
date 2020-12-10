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
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, createReview } from '../actions/ProductActions';
import { CREATE_REVIEW_RESET, PRODUCT_RESET } from '../types/productTypes';

function ProductScreen({ history, match }) {
  const itemId = match.params.id;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const productDetails = useSelector((state) => state.productDetails.product);

  const {
    success: createReviewSuccess,
    error: createReviewError,
  } = useSelector((state) => state.createReview);

  useEffect(() => {
    if (createReviewSuccess) {
      setComment('');
      setRating(0);
      dispatch({ type: CREATE_REVIEW_RESET });
    }

    dispatch(getProduct(itemId));

    return () => dispatch({ type: PRODUCT_RESET });
  }, [dispatch, itemId, createReviewSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const renderReviewSection = () => {
    return (
      product && (
        <Row className="my-3">
          <Col md={6}>
            <h2>Reviews</h2>
            {!product.reviews.length && (
              <Message>This product has not been reviewed yet</Message>
            )}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                {createReviewError && (
                  <Message variant="danger">{createReviewError}</Message>
                )}
                {userLoginInfo ? (
                  renderReviewForm()
                ) : (
                  <p>
                    <Link
                      to={{
                        pathname: '/login',
                        state: {
                          referrer: `product/${itemId}`,
                        },
                      }}
                    >
                      Sign in
                    </Link>{' '}
                    to write a review
                  </p>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )
    );
  };

  const renderReviewForm = () => {
    const alreadyReviewed = !!product.reviews.find(
      (review) => review.user === userLoginInfo._id
    );

    if (alreadyReviewed) return <p>You have already reviewed this product.</p>;

    const { userHasPurchased, userHasReceived } = productDetails;

    if (userHasPurchased && !userHasReceived) {
      return (
        <Message variant="success">
          You may post a review once you have received this product.
        </Message>
      );
    } else if (userHasPurchased && !userHasReceived) {
      return (
        <Message variant="success">
          You may post a review once you have received this product.
        </Message>
      );
    } else if (!userHasPurchased && !userHasReceived) {
      return <p>Purchase the product and post a review!</p>;
    } else if (userHasPurchased && userHasReceived) {
      return (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select ...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excelent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              required
              as="textarea"
              row="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      );
    }
  };

  const addToCartHandler = () => {
    history.push(`/cart/${itemId}?qty=${qty}`);
  };

  const { product, error } = useSelector((state) => state.productDetails);

  const renderScreen = () => {
    if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (product) {
      return (
        <Row>
          <Col lg={6}>
            <Image src={product.image} alt={product.name} fluid />
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
      {renderReviewSection()}
    </>
  );
}

export default ProductScreen;
