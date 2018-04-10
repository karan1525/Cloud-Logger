import { combineReducers } from 'redux';
import authReducer from './authReducer';
import filesReducer from './filesReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
  auth: authReducer,
  files: filesReducer
});
