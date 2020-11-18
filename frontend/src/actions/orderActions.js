import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../types/orderTypes';

import { CLEAR_DETAILS } from '../types/userTypes';

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post('/api/orders', orderData, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({});
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });

    //Resetting user profile data after a new order is created
    dispatch({
      type: CLEAR_DETAILS,
    });
  } catch (error) {
    //A customized error message below
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Request failed',
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //A customized error message below
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Request failed',
    });
  }
};
