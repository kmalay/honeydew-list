import {
	FETCH_LISTS
} from '../actions/types';

const INITIAL_STATE = {
  lists: [],
  name: '',
  description: '',
  items: [],
  title: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case FETCH_LISTS:
      return { lists: action.payload };
		default:
			return state;
	}
};
