import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../types/userTypes';

export const userLoginReducer = (
  state = { loading: false, userLogin: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userLogin: null, error: null };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userLogin: action.payLoad, error: null };
    case USER_LOGIN_FAIL:
      return { loading: false, userLogin: null, error: action.payLoad };
    case USER_LOGOUT:
      return { loading: false, userLogin: null, error: null };

    default:
      return state;
  }
};
