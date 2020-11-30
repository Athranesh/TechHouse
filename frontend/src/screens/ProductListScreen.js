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
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from '../types/productTypes';

const ProductListScreen = ({ history, location }) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  const userLogin = useSelector((state) => state.userLogin);

  const { success: deleteSuccess } = useSelector(
    (state) => state.deleteProduct
  );

  const { success: createSuccess } = useSelector(
    (state) => state.createProduct
  );

  const { success: updateSuccess } = useSelector(
    (state) => state.updateProduct
  );

  useEffect(() => {
    if (deleteSuccess) {
      setMessage('Product deleted');
      dispatch(listProducts());
    } else if (createSuccess) {
      setMessage('Product created');
      dispatch({ type: CREATE_PRODUCT_RESET });
    } else if (updateSuccess) {
      setMessage('Product updated');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    return () => {
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch, deleteSuccess, createSuccess, updateSuccess]);

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

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>

          <Col className="text-right p-0">
            <LinkContainer
              to={`/admin/createproduct`}
              className="my-3 justify-content-end"
            >
              <Button>Create Product</Button>
            </LinkContainer>
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
