import {
	SHOW_SNACKBAR,
  CLOSE_SNACKBAR
} from '../actions/types';

const INITIAL_STATE = {
	snackBarOpen: false,
	snackBarMessage: '',
	snackBarAutoHideDuration: 4000
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case SHOW_SNACKBAR:
			const { message } = action.payload;
			return { ...state, snackBarMessage: message, snackBarOpen: true };
		case CLOSE_SNACKBAR:
			return { ...state, ...INITIAL_STATE };
    default:
      return state;
	}
}
