import { fromJS, List } from 'immutable';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as actions from './actions';

const userSchema = new Schema('users');

/**
  * data
  * -> entities
  *   -> users
  * -> relations
  *   -> chatHasUsers
  * -> username
  */
export default (state = fromJS({
  entities: { users: {} },
  relations: { chatHasUsers: [] }
}), action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS: { // action.data = { id, status, username }
      return state.set('username', action.data.username);
    }
    case actions.USERS_FETCH: // action.data = [{ id, username, status }]
      const users = action.data;
      const { entities: { users: userEntities }, result: userResult } = normalize(users, arrayOf(userSchema));
      return state
       .mergeIn([ 'entities', 'users' ], userEntities)
       .setIn([ 'relations', 'chatHasUsers' ], List(userResult));
    default:
      return state;
  }
};
