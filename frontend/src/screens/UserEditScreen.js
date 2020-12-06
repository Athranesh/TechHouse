import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { CLEAR_DETAILS } from '../types/userTypes';

import {
  getUserById,
  updateUserById,
  resetUpdate,
  clearDetailsError,
} from '../actions/userActions';

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;

  const [redirect, setRedirect] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const userDetails = useSelector((state) => state.userDetails);

  const { error, loading, userInfo: user, updated } = userDetails;

  useEffect(() => {
    if (!userLogin.userInfo) {
      setRedirect({
        pathname: '/login',
        state: { referrer: `/admin/user/${userId}/edit` },
      });
    } else if (userLogin.userInfo && !userLogin.userInfo.isAdmin) {
      setRedirect({
        pathname: '/',
      });
    } else {
      dispatch(getUserById(userId));
    }
    if (updated) setMessage('User updated');

    return () => {
      dispatch({ type: CLEAR_DETAILS });
      dispatch(resetUpdate());
      dispatch(clearDetailsError());
    };
  }, [userLogin, history, dispatch, updated, userId]);

  useEffect(() => {
    if (user && user._id === userId) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    } else if (user && user._id !== userId) {
      dispatch(getUserById(userId));
    }
  }, [user, userId, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserById(userId, { name, email, isAdmin }));
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </>
      );
    }
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        go back
      </Link>
      <FormContainer>
        {message && <Message variant="success">{message}</Message>}
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          renderScreen()
        )}

        {}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
