import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../types/orderTypes';

export const orderCreateReducer = (
  state = { loading: false, order: null, success: false },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOrderReducer = (
  state = { loading: false, order: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        loading: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case GET_ORDER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
