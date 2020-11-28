import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { USER_LIST_RESET, DELETE_USER_RESET } from '../types/userTypes';
const UserListScreen = ({ history }) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.userList);

  const userLogin = useSelector((state) => state.userLogin);

  const { success: deleteSuccess } = useSelector((state) => state.deleteUser);

  //Handling cleanup of users data
  useEffect(() => {
    return () => {
      dispatch({ type: DELETE_USER_RESET });
      dispatch({ type: USER_LIST_RESET });
    };
  }, [dispatch]);

  //Handing initial load
  useEffect(() => {
    if (
      !userLogin.userInfo ||
      (userLogin.userInfo && !userLogin.userInfo.isAdmin)
    ) {
      history.push('/login');
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, userLogin, history]);

  //Handling user deletion
  useEffect(() => {
    if (deleteSuccess) {
      setMessage('User deleted');
      dispatch(listUsers());
    }
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure? This action is  irreversible!')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {message && <Message variant="success">{message}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
