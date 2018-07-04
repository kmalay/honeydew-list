import {
  SET_APPBAR_TITLE
} from '../actions/types';

const INITIAL_STATE = {
  title: 'Honeydew'
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_APPBAR_TITLE:
      const { title } = action.payload;
      return { ...state, title };
    default:
      return state;
  }
}
