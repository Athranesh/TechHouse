import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  getUserDetails,
  clearDetailsError,
  updateUserDetails,
  resetUpdate,
} from '../actions/userActions';

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        dispatch(getUserDetails());
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);

        if (updated) {
          dispatch(resetUpdate());
          setMessage('Profile Updated');
        }
      }
    }

    return function cleanUp() {
      dispatch(clearDetailsError());
    };
  }, [history, userInfo, dispatch, userLoginInfo, updated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const details = { name, email };

    if (password.length) {
      if (password === confirmPassword) {
        if (message) setMessage(null);

        details.password = password;
      } else {
        setMessage('Passwords do not match');
      }
    }
    dispatch(updateUserDetails(details));
  };

  const renderScreen = () => {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <>
          <Form
            onSubmit={submitHandler}
            // style={{ paddingTop: error || loading ? '0' : '63px' }}
          >
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
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
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
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
      <Col md={9}>My Orders</Col>
    </Row>
  );
};

export default ProfileScreen;
