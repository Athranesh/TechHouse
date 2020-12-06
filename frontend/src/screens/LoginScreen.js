import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login, clearLoginError } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.state ? location.state.referrer : '/';

  const step = location.state ? location.state.step : null;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }

    return function cleanUp() {
      dispatch(clearLoginError());
    };
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
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

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?{' '}
              <Link
                to={
                  redirect
                    ? {
                        pathname: '/register',
                        state: {
                          referrer: redirect,
                        },
                      }
                    : '/register'
                }
              >
                Register
              </Link>
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <FormContainer>
      {step && redirect === 'shipping' && <CheckoutSteps step1 />}
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {renderScreen()}
    </FormContainer>
  );
};

export default LoginScreen;
