import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
} from '../types/productTypes';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/products/admin/${id}`, config);

    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      '/api/products/admin/',
      productData,
      config
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (id, productData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const token = getState().userLogin.userInfo.token;

    const config = {
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/admin/${id}`,
      productData,
      config
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
