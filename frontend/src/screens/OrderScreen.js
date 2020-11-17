import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderData = useSelector((state) => state.getOrder);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, order } = orderData;

  if (order) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);

    order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)));
  }

  useEffect(() => {
    //Access prohibited in case no user is logged in
    if (!userInfo) {
      history.push('/');
    } else {
      //Loading added below to prevent another request when loading is in progress. Error added because, in case it is not added, if there is an error, there will be an infinite rerender.
      if (
        (!order && !loading && !error) ||
        (order && order._id !== match.params.id)
      ) {
        dispatch(getOrderById(match.params.id));
      }
    }
  }, [error, history, userInfo, loading, order, dispatch, match.params.id]);

  const renderScreen = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (order) {
      return (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>

                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress &&
                      order.shippingAddress.address},{' '}
                    {order.shippingAddress && order.shippingAddress.city},
                    {order.shippingAddress && order.shippingAddress.postalCode}
                  </p>
                  {order.isDeilvered ? (
                    <Message variant="success">
                      Deilvered at {order.deilveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Deilvered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: {order.paymentMethod}</strong>
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items:</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Your order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={5}>
                              {item.qty} x ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={order.orderItems === 0}
                    >
                      Pay
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
  };

  return <>{renderScreen()}</>;
};

export default OrderScreen;
