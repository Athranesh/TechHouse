import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { updateProduct, getProduct } from '../actions/ProductActions';

import { PRODUCT_RESET } from '../types/productTypes';

import axios from 'axios';

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;

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

  const { error: detailsError, loading: detailsLoading, product } = useSelector(
    (state) => state.productDetails
  );

  const { error: updateError, loading: updateLoading, success } = useSelector(
    (state) => state.updateProduct
  );

  //Security check
  useEffect(() => {
    if (
      !userLogin.userInfo ||
      (userLogin.userInfo && !userLogin.userInfo.isAdmin)
    ) {
      history.push('/login');
    }
  }, [dispatch, userLogin, history]);

  //Fetching data
  useEffect(() => {
    if (!product || (product && product._id !== productId)) {
      dispatch(getProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCount(product.countInStock);
      setDescription(product.description);
    }
  }, [product, productId, history, dispatch]);

  //Success and redirect check

  useEffect(() => {
    if (success) {
      history.push('/admin/productlist');
      dispatch({ type: PRODUCT_RESET });
    }
  }, [success, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append('image', file);

    setFormData(formData);

    setImage(file.name);
  };

  const submitHandlerWithImage = async () => {
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
        countInStock: count,
      };

      dispatch(updateProduct(productId, productData));
    } catch (detailsError) {
      setMessage('Please choose an image file');

      setUploading(false);
    }
  };
  const submitHandlerWithoutImage = () => {
    const productData = {
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock: count,
    };

    dispatch(updateProduct(productId, productData));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (message) setMessage(null);

    if (formData) {
      submitHandlerWithImage();
    } else {
      submitHandlerWithoutImage();
    }
  };

  const renderScreen = () => {
    if (detailsLoading || updateLoading) {
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
              Update product
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
        <h1>Update Product</h1>
        {detailsError ||
          (updateError && (
            <Message variant="danger">
              {detailsError ? detailsError : updateError}
            </Message>
          ))}
        {message && <Message variant="danger">{message}</Message>}
        {renderScreen()}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
