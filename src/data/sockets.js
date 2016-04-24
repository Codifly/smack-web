import { push } from 'react-router-redux';
import {
  fetchUserMessages,
  CHANNEL_MESSAGES_FETCH, JOINED_CHAT, LEFT_CHAT, LOGIN_SUCCESS,
  LOGOUT_SUCCESS, RECEIVE_CHANNEL_MESSAGE, RECEIVE_USER_MESSAGE,
  SEND_USER_MESSAGE, USER_MESSAGES_FETCH, USERS_FETCH
} from './actions';

export default (socket, { dispatch }) => { // (socket, store)
  // Someone joined the chat.
  socket.on('joinedChat', (data) => { // { id, status, username }
    dispatch({ data, type: JOINED_CHAT });
  });

  // I'm succesfully logged in!
  socket.on('login', (data) => { // { id, status, username }
    dispatch({ data, type: LOGIN_SUCCESS });
    dispatch(push('/chat'));
  });

  socket.on('logout', () => {
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(push('/login'));
  });

  socket.on('leftChat', (data) => { // { id, status, username }
    dispatch({ data, type: LEFT_CHAT });
  });

  // I received some messages of a chat channel.
  socket.on('channelMessages', (data) => { // { messages, userId }
    dispatch({ data, type: CHANNEL_MESSAGES_FETCH });
  });

  socket.on('userMessages', (data) => { // { messages, userId }
    dispatch({ data, type: USER_MESSAGES_FETCH });
  });

  // I received a message from a user.
  socket.on('receiveUserMessage', (data) => { // { id, message, timestamp, userId }
    dispatch({ data, type: RECEIVE_USER_MESSAGE });
  });

  // A new message was received on a channel
  socket.on('receiveChannelMessage', (data) => { // { channelId, message: { id, message, timestamp, userId } }
    dispatch({ data, type: RECEIVE_CHANNEL_MESSAGE });
  });

  // A message was succesfully send to a user.
  socket.on('sendUserMessage', (data) => { // { message: { id, message, timestamp, userId }, userId }
    dispatch({ data, type: SEND_USER_MESSAGE });
  });

  // I received a list of users that are in the chat.
  socket.on('users', (data) => { // [{ id, username, status }]
    dispatch({ data, type: USERS_FETCH });
    // Fetch messages of each user.
    data.forEach(({ id }) => dispatch(fetchUserMessages({ userId: id })));
  });
};
