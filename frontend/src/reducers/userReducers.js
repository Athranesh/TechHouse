import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  CLEAR_LOGIN_ERROR,
  CLEAR_REGISTER_ERROR,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_DETAILS_ERROR,
  CLEAR_DETAILS,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_RESET,
  USER_DETAILS_UPDATE_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
} from '../types/userTypes';

export const userLoginReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: null, error: null };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case USER_LOGIN_FAIL:
      return { loading: false, userInfo: null, error: action.payload };
    case USER_LOGOUT:
      return { loading: false, userInfo: null, error: null };

    case CLEAR_LOGIN_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, userInfo: null, error: null };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };

    case USER_REGISTER_FAIL:
      return { loading: false, userInfo: null, error: action.payload };

    case CLEAR_REGISTER_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = {
    loading: false,
    userInfo: null,
    error: null,
    updated: false,
    updateError: null,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        loading: false,
        userInfo: null,
        error: null,
        updated: false,
        updateError: null,
      };
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: null,
        updated: false,
      };
    case USER_DETAILS_UPDATE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: null,
        updated: true,
      };
    case USER_DETAILS_UPDATE_RESET:
      return {
        ...state,
        loading: false,
        updated: false,
      };
    case USER_DETAILS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        updated: true,
        error: action.payload,
      };

    case USER_DETAILS_FAIL:
      return { loading: false, userInfo: null, error: action.payload };
    case CLEAR_DETAILS_ERROR:
      return { ...state, error: null };

    case CLEAR_DETAILS:
      return {
        loading: false,
        userInfo: null,
        error: null,
        updated: false,
        updateError: null,
      };

    default:
      return state;
  }
};

export const deleteUserReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true, success: false, error: null };

    case DELETE_USER_SUCCESS:
      return { loading: false, success: true, error: null };

    case DELETE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case DELETE_USER_RESET:
      return { loading: false, success: false, error: null };

    default:
      return state;
  }
};
