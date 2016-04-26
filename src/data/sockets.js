import { push } from 'react-router-redux';
import { LOGIN_SUCCESS } from './actions';

export default (socket, { dispatch }) => { // (socket, store)
  // I'm succesfully logged in!
  socket.on('login', (data) => { // { id, status, username }
    dispatch({ data, type: LOGIN_SUCCESS });
    dispatch(push('/chat'));
  });
};
