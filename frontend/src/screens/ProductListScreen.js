import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProductById } from '../actions/ProductActions';
import {
  PRODUCT_LIST_RESET,
  DELETE_PRODUCT_RESET,
} from '../types/productTypes';
const ProductListScreen = ({ history, match }) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  const userLogin = useSelector((state) => state.userLogin);

  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteProduct
  );

  // const { success: deleteSuccess } = useSelector(
  //   (state) => state.deleteProduct
  // );

  //Handling cleanup of products data
  useEffect(() => {
    return () => {
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      setMessage('Product deleted');
      dispatch(listProducts());
    }
  }, [dispatch, deleteSuccess]);

  //Handing initial load
  useEffect(() => {
    if (
      !userLogin.userInfo ||
      (userLogin.userInfo && !userLogin.userInfo.isAdmin)
    ) {
      history.push('/login');
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userLogin, history]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProductById(id));
  };
  const createProductHandler = () => {};

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i>Create Product
            </Button>
          </Col>
        </Col>
      </Row>

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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(product._id)}
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

export default ProductListScreen;
