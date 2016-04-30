import { Map } from 'immutable';
import { LOGIN_SUCCESS } from '../../data/actions';

/**
  * login
  * -> myUserId The id of the user that is logged in.
  */
export default (state = Map(), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const user = action.data;
      return state.set('myUserId', user.id);
    default:
      return state;
  }
};
