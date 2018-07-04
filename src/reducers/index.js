import { combineReducers } from 'redux';
import HeaderReducer from './HeaderReducer';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  header: HeaderReducer,
  alert: AlertReducer,
  auth: AuthReducer
});

export default rootReducer;
