import { Map } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../data/actions';

/**
  * login
  * -> myUserId The id of the user that is logged in.
  */
export default (state = Map(), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const user = action.data;
      // Store username in locale storage.
      localStorage.username = user.username;
      return state.set('myUserId', user.id);
    case LOGOUT_SUCCESS:
      // Remove username from locale storage.
      Reflect.deleteProperty(localStorage, 'username');
      return state.delete('myUserId');
    default:
      return state;
  }
};
