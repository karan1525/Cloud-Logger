import { UPLOAD_FILE } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case UPLOAD_FILE:
      return action.payload;
    default:
      return state;
  }
}
