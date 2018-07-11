import {
	SHOW_SNACKBAR,
  CLOSE_SNACKBAR,
	SHOW_UPDATE_SNACKBAR
} from '../actions/types';

const INITIAL_STATE = {
	snackBarOpen: false,
	snackBarMessage: '',
	snackBarAutoHideDuration: 4000,
	updateSnackbarOpen: false
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case SHOW_SNACKBAR:
			const { message } = action.payload;
			return { ...state, snackBarMessage: message, snackBarOpen: true };
		case CLOSE_SNACKBAR:
			return { ...state, ...INITIAL_STATE };
		case SHOW_UPDATE_SNACKBAR:
			return { ...state, updateSnackbarOpen: true };
    default:
      return state;
	}
}
