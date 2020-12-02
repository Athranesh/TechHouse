import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, deliverOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  CLEAR_ORDER_DETAILS,
  ORDER_DELIVERED_RESET,
} from '../types/orderTypes';

const AdminOrderScreen = ({ history, match }) => {
  const orderId = match.params.id;

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderData = useSelector((state) => state.getOrder);

  const {
    success: deliverSuccess,
    error: deliverError,
    loading: deliverLoading,
  } = useSelector((state) => state.orderDelivered);

  const { loading, error, order } = orderData;

  if (order) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);

    order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)));
  }

  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (
      !userLogin.userInfo ||
      (userLogin.userInfo && !userLogin.userInfo.isAdmin)
    ) {
      history.push('/login');
    } else {
      dispatch(getOrderById(orderId));
    }
  }, [userLogin, history, orderId, dispatch]);

  //A separated useEffect for a state cleanup once user leaves this page
  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_ORDER_DETAILS });
    };
  }, [dispatch]);

  useEffect(() => {
    if (deliverSuccess) {
      setMessage('Order updated');
    }
    return () => {
      dispatch({ type: ORDER_DELIVERED_RESET });
    };
  }, [dispatch, deliverSuccess]);

  const setDeliveredHandler = () => {
    dispatch(deliverOrder(orderId));
    dispatch(getOrderById(orderId));
  };

  const renderScreen = () => {
    if (loading || deliverLoading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (deliverError) {
      return <Message variant="danger">{deliverError}</Message>;
    } else if (order) {
      return (
        <>
          {message && <Message variant="success">{message}</Message>}
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
                  {order.isDelivered ? (
                    <Message variant="success">
                      Deilvered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Deilvered</Message>
                  )}
                  <Button
                    onClick={setDeliveredHandler}
                    disabled={!order.isPaid || order.isDelivered}
                  >
                    Set as delivered
                  </Button>
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

                  {/* <Button
                      type="button"
                      className="btn-block"
                      disabled={order.orderItems === 0}
                    >
                      Pay
                    </Button> */}
                  {order && !order.isPaid && <ListGroup.Item></ListGroup.Item>}
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

export default AdminOrderScreen;
