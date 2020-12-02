import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  CLEAR_ORDER_DETAILS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
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
  state = { loading: false, order: null, error: false },
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
        error: null,
        order: action.payload,
      };

    case GET_ORDER_FAIL:
      return {
        loading: false,
        order: null,
        error: action.payload,
      };

    case CLEAR_ORDER_DETAILS:
      return {
        loading: false,
        order: null,
        error: false,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListReducer = (
  state = { orders: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
        orders: [],
      };

    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        orders: [],
      };
    case ORDER_LIST_RESET:
      return { orders: [], loading: false, error: null };

    default:
      return state;
  }
};

export const orderDeliveredReducer = (
  state = { success: false, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVERED_RESET:
      return { success: false, loading: false, error: null };

    default:
      return state;
  }
};
