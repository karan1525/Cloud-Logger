import axios from 'axios';
import { FETCH_USER, FETCH_FILES, UPLOAD_FILE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchFiles = () => async dispatch => {
  const res = await axios.get('/api/files');

  dispatch({ type: FETCH_FILES, payload: res.data });
};

export const uploadFile = (file) => async dispatch => {
  const res = await axios.post('/api/files', file);
    
  dispatch({ type: UPLOAD_FILE, payload: res.data });
}
