import { fromJS, List, Map } from 'immutable';
import * as actions from './actions';
import { normalize, Schema, arrayOf } from 'normalizr';

// Schemas used to normalize the data recieved from the server.
const messageSchema = new Schema('messages');
const userSchema = new Schema('users');

function addChannelMessage (state, channelId, messageId) {
  const messages = state.getIn([ 'relations', 'channelHasMessages', channelId ]) || List();
  return state.setIn([ 'relations', 'channelHasMessages', channelId ], messages.push(messageId));
}

function addUserMessage (state, userId, messageId) {
  const messages = state.getIn([ 'relations', 'userHasMessages', userId ]) || List();
  return state.setIn([ 'relations', 'userHasMessages', userId ], messages.push(messageId));
}

function addUser (state, userId) {
  const userIds = state.getIn([ 'relations', 'chatHasUsers' ]);
  if (userIds.contains(userId)) {
    return state;
  }
  // Add userId to the front of the list.
  return state.setIn([ 'relations', 'chatHasUsers' ], userIds.unshift(userId));
}

const channelEveryone = { id: 'everyone', name: 'Global Smack' };

export default (state = fromJS({
  entities: { channels: { [channelEveryone.id]: channelEveryone }, users: {}, messages: {} },
  relations: { chatHasChannels: [ channelEveryone.id ], chatHasUsers: [], channelHasMessages: {}, userHasMessages: {} }
}), action) => {
  switch (action.type) {
    case actions.JOINED_CHAT: // action.data = { id, status, username }
    case actions.LEFT_CHAT: {
      const user = action.data;
      return addUser(state, user.id)
       .mergeIn([ 'entities', 'users', user.id ], Map(user));
    }
    case actions.LOGIN_SUCCESS: { // action.data = { id, status, username }
      const user = action.data;
      return state.mergeIn([ 'entities', 'users', user.id ], Map(user));
    }
    case actions.RECEIVE_CHANNEL_MESSAGE: { // action.data =  { channelId, message: { id, message, timestamp, userId } }
      const { channelId, message } = action.data;
      return addChannelMessage(state, channelId, message.id)
        .mergeIn([ 'entities', 'messages', message.id ], Map(message));
    }
    case actions.RECEIVE_USER_MESSAGE: { // action.data =  { id, message, timestamp, userId }
      const message = action.data;
      return addUserMessage(state, message.userId, message.id)
        .mergeIn([ 'entities', 'messages', message.id ], Map(message));
    }
    case actions.SEND_USER_MESSAGE: { // action.data =  { message: { id, message, timestamp, userId }, userId }
      const { message, userId } = action.data;
      return addUserMessage(state, userId, message.id)
        .mergeIn([ 'entities', 'messages', message.id ], Map(message));
    }
    case actions.CHANNEL_MESSAGES_FETCH: { // action.data = { channelId, messages }
      const { channelId, messages } = action.data;
      const { entities: { messages: messageEntities }, result: messageResult } = normalize(messages, arrayOf(messageSchema));
      return state
        .mergeIn([ 'entities', 'messages' ], messageEntities)
        .setIn([ 'relations', 'channelHasMessages', channelId ], List(messageResult));
    }
    case actions.USER_MESSAGES_FETCH: { // action.data = { messages, userId }
      const { messages, userId } = action.data;
      const { entities: { messages: messageEntities }, result: messageResult } = normalize(messages, arrayOf(messageSchema));
      return state
        .mergeIn([ 'entities', 'messages' ], messageEntities)
        .setIn([ 'relations', 'userHasMessages', userId ], List(messageResult));
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
