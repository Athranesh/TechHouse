import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_RESET,
  PRODUCT_LIST_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from '../types/productTypes';

export const productListReducer = (
  state = { loading: false, products: [], error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { loading: false, products: [], error: null };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { loading: false, product: null, error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { loading: true, product: null };
    case PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_RESET:
      return { loading: false, product: null, error: null };

    default:
      return state;
  }
};

export const deleteProductReducer = (
  state = {
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true, error: null, success: false };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, error: null, success: true };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DELETE_PRODUCT_RESET:
      return { loading: false, error: null, success: false };

    default:
      return state;
  }
};

export const createProductReducer = (
  state = {
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true, error: null, success: false };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const updateProductReducer = (
  state = {
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true, error: null, success: false };
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, error: null, success: true };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case UPDATE_PRODUCT_RESET:
      return { loading: false, error: null, success: false };

    default:
      return state;
  }
};
export const createReviewReducer = (
  state = {
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true, error: null, success: false };
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, error: null, success: true };
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload, success: false };
    case CREATE_REVIEW_RESET:
      return { loading: false, error: null, success: false };

    default:
      return state;
  }
};
