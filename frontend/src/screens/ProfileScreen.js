import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { LinkContainer } from 'react-router-bootstrap';

import {
  getUserDetails,
  clearDetailsError,
  updateUserDetails,
  resetUpdate,
} from '../actions/userActions';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { error, loading, userInfo, updated } = useSelector(
    (state) => state.userDetails
  );

  if (userInfo) {
    if (!name && userInfo.name) setName(userInfo.name);
    if (!email && userInfo.email) setEmail(userInfo.email);
  }

  if (updated && !error) {
    if (!message) setMessage('Profile updated');
  }

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    if (!userLoginInfo) {
      history.push('/login');
    } else {
      dispatch(getUserDetails());
    }

    return function cleanUp() {
      dispatch(clearDetailsError());
      dispatch(resetUpdate());
    };
  }, [dispatch, history, userLoginInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password.length && confirmPassword.length) {
      if (password === confirmPassword) {
        //Creating new details object
        const details = { name, email, password };

        //Adding new password to details object
        if (newPassword.length) {
          if (message) setMessage(null);
          details.newPassword = newPassword;
        }

        dispatch(updateUserDetails(details));

        setNewPassword('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage('Current passwords do not match');
      }
    } else {
      setMessage('Please enter and confirm your current password');
    }
  };

  const renderOrderLinks = () => {
    if (userInfo && userInfo.orders.length) {
      return (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {userInfo.orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  };

  const renderScreen = () => {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="new-password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Current Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirm-password">
              <Form.Label>Confirm Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Current Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </>
      );
    }
  };

  return (
    <>
      {' '}
      <h2>User Profile</h2>
      <Row>
        <Col md={3} style={{ marginBottom: 30 }}>
          {error && <Message variant="danger">{error}</Message>}
          {message && (
            <Message variant={!error ? 'success' : 'danger'}>{message}</Message>
          )}
          {renderScreen()}
        </Col>
        <Col md={9}>
          <h6>My Orders</h6>
          <ListGroup>{renderOrderLinks()}</ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
