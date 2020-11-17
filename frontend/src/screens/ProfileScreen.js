import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

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

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, userInfo, updated } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const userLoginInfo = userLogin.userInfo;

  useEffect(() => {
    if (!userLoginInfo) {
      //Redirecting to homepage if the user is not logged in
      history.push('/login');
    } else {
      if (!userInfo) {
        if (!loading) {
          dispatch(getUserDetails());
        }
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);

        if (updated) {
          dispatch(resetUpdate());
          if (!error) {
            setMessage('Profile Updated');
          } else {
            setMessage(error);
          }
        }
      }
    }

    return function cleanUp() {
      dispatch(clearDetailsError());
    };
  }, [history, userInfo, dispatch, userLoginInfo, updated, error, loading]);

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
      return userInfo.orders.map((order) => {
        return (
          <ListGroup.Item key={order._id}>
            <Link to={`/order/${order._id}`}>{order._id}</Link>
          </ListGroup.Item>
        );
      });
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
            <Message
              variant={message === 'Profile Updated' ? 'success' : 'danger'}
            >
              {message}
            </Message>
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
