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
