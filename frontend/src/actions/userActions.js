import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_LOGIN_ERROR,
  CLEAR_REGISTER_ERROR,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_DETAILS_ERROR,
  CLEAR_DETAILS,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_RESET,
  USER_DETAILS_UPDATE_FAIL,
} from '../types/userTypes';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');

  return {
    type: USER_LOGOUT,
  };
};

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
  };
};
export const clearRegisterError = () => {
  return {
    type: CLEAR_REGISTER_ERROR,
  };
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch(login(email, password));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });

  try {
    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('api/users/profile', config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearDetailsError = () => {
  return {
    type: CLEAR_DETAILS_ERROR,
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const resetUpdate = () => {
  return {
    type: USER_DETAILS_UPDATE_RESET,
  };
};

export const updateUserDetails = (details) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });

  try {
    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put('/api/users/profile', details, config);

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: data,
    });

    //It is important for the app to update the login info as well, for example to change the navbar user's name.
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
