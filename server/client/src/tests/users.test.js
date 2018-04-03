// unit test for the authReducer
import user from '../reducers/authReducer';
import { FETCH_USER } from '../actions/types';

describe('Login reducer', () => {
  it('shoud handle FETCH_USER', () => {
    expect(
      user(undefined, {
        type: FETCH_USER
      })
    ).toEqual(false);
  });
});
