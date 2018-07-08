import {
	FETCH_LISTS,
	FETCH_LIST,
	RESET,
	TOGGLE_ITEM_COMPLETED
} from '../actions/types';

const INITIAL_STATE = {
  lists: [],
  name: '',
  description: '',
  items: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case FETCH_LISTS:
      return { lists: action.payload };
		case FETCH_LIST:
			return {
				name: action.payload.name,
				description: action.payload.description,
				items: action.payload.items || INITIAL_STATE.items
			};
		case RESET:
			const { name, description, items } = INITIAL_STATE;
			return { name, description, items };
		case TOGGLE_ITEM_COMPLETED:
      return { ...state };
		default:
			return state;
	}
};
