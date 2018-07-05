import { combineReducers } from 'redux';
import HeaderReducer from './HeaderReducer';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import Honeydew from './Honeydew';

const rootReducer = combineReducers({
  header: HeaderReducer,
  alert: AlertReducer,
  auth: AuthReducer,
  honeydew: Honeydew
});

export default rootReducer;
