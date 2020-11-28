import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const userDetails = useSelector((state) => state.userDetails);

  const { error, loading, userInfo: user, updated } = userDetails;

  useEffect(() => {
    if (
      !userLogin.userInfo ||
      (userLogin.userInfo && !userLogin.userInfo.isAdmin)
    ) {
      history.push('/login');
    }

    if (updated) setMessage('User updated');

    return () => {
      dispatch({ type: CLEAR_DETAILS });
      dispatch(resetUpdate());
      dispatch(clearDetailsError());
    };
  }, [userLogin, history, dispatch, updated]);

  useEffect(() => {
    if (!user || !user.name || user._id !== userId) {
      dispatch(getUserById(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
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

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3"></Link>
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
