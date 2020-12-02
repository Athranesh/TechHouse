import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';
import { ORDER_LIST_RESET } from '../types/orderTypes';
const OrderListScreen = ({ history }) => {
  // const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orderList);

  const userLogin = useSelector((state) => state.userLogin);

  //Handling cleanup of users data
  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_LIST_RESET });
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
      dispatch(listOrders());
    }
  }, [dispatch, userLogin, history]);

  return (
    <>
      <h1>Orders</h1>
      {/* {message && <Message variant="success">{message}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER</th>
              <th>CUSTOMER EMAIL</th>
              <th>paid</th>
              <th>delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </td>
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
                  <LinkContainer to={`/admin/order/${order._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      Details
                      {/* <i className="fas fa-edit"></i> */}
                    </Button>
                  </LinkContainer>

                  {/* <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
