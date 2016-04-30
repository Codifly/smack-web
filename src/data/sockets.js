import { push } from 'react-router-redux';
import { LOGIN_SUCCESS, USERS_FETCH } from './actions';

export default (socket, { dispatch }) => { // (socket, store)
  // I'm succesfully logged in!
  socket.on('login', (data) => { // { id, status, username }
    dispatch({ data, type: LOGIN_SUCCESS });
    dispatch(push('/chat'));
  });

  // I received a list of users that are in the chat.
  socket.on('users', (data) => { // [{ id, username, status }]
    dispatch({ data, type: USERS_FETCH });
  });
};
