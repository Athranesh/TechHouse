import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { createProduct } from '../actions/ProductActions';

import axios from 'axios';

const ProductCreateScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState('');
  const [formData, setFormData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, success } = useSelector(
    (state) => state.createProduct
  );
  useEffect(() => {
    if (
      !userLogin.userInfo ||
      (userLogin.userInfo && !userLogin.userInfo.isAdmin)
    ) {
      history.push('/login');
    }
  }, [dispatch, userLogin, history]);

  useEffect(() => {
    if (success) {
      history.push('/admin/productlist');
    }
  }, [success, history, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append('image', file);

    setFormData(formData);

    setImage(file.name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (message) setMessage(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      setUploading(true);

      const { data } = await axios.post('/api/upload', formData, config);

      setUploading(false);

      const uploadedImage = data;

      const productData = {
        name,
        price,
        image: uploadedImage,
        brand,
        category,
        description,
        count,
      };

      dispatch(createProduct(productData));
    } catch (error) {
      setMessage('Please choose an image file');

      setUploading(false);
    }
  };

  const renderScreen = () => {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="product-name">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Username"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>brand</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter product brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter product category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Image url or upload an image"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Product price</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="in-stock">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter count in stock"
                value={count}
                onChange={(e) => {
                  setCount(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter product description"
                required
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Create product
            </Button>
          </Form>
        </>
      );
    }
  };

  return (
    <>
      <LinkContainer to="/admin/productlist">
        <Button type="submit" variant="secondary">
          Back
        </Button>
      </LinkContainer>
      <FormContainer>
        <h1>Register Product</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {renderScreen()}
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
