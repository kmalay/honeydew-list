// import axios from 'axios';
import {
  CLOSE_SNACKBAR,
  SET_APPBAR_TITLE,
  SHOW_SNACKBAR
} from './types';

export const closeSnackbar = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SNACKBAR
    });
  }
};

export const setAppBarTitle = (title, showBackBtn) => {
  return (dispatch) => {
    dispatch({
      type: SET_APPBAR_TITLE,
      payload: { title, showBackBtn }
    });
  };
};

export const showSnackbar = (message) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_SNACKBAR,
      payload: { message }
    });
  };
};
