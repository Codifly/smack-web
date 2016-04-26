import { Map } from 'immutable';
import * as actions from './actions';

/**
  * data
  * -> username
  */
export default (state = Map(), action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS: { // action.data = { id, status, username }
      console.warn('LOGIN_SUCCESS', action);
      return state.set('username', action.data.username);
    }
    default:
      return state;
  }
};
