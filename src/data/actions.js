export const REQUEST_CHANNEL_MESSAGES = 'REQUEST_CHANNEL_MESSAGES';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const REQUEST_USER_MESSAGES = 'REQUEST_USER_MESSAGES';

export const CHANNEL_MESSAGES_FETCH = 'CHANNEL_MESSAGES_FETCH';
export const JOINED_CHAT = 'JOINED_CHAT';
export const LEFT_CHAT = 'LEFT_CHAT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RECEIVE_CHANNEL_MESSAGE = 'RECEIVE_CHANNEL_MESSAGE';
export const RECEIVE_USER_MESSAGE = 'RECEIVE_USER_MESSAGE';
export const SEND_USER_MESSAGE = 'SEND_USER_MESSAGE';
export const USER_MESSAGES_FETCH = 'USER_MESSAGES_FETCH';
export const USERS_FETCH = 'USERS_FETCH';

/**
 * Send a request to the server (via websockets) to join the chat.
 * @param {Object} params
 * @param {string} params.username
 */
export function login ({ username }) {
  return {
    event: 'joinChat',
    data: { username },
    meta: { remote: true },
    type: REQUEST_LOGIN
  };
}

/**
 * Send a request to the server (via websockets) to leave the chat.
 */
export function logout () {
  return {
    event: 'logout',
    data: {},
    meta: { remote: true },
    type: REQUEST_LOGOUT
  };
}

/**
 * Send a request to the server (via websockets) to receive the messages of
 * a channel.
 * @param {Object} params
 * @param {string} params.channelId
 */
export function fetchChannelMessages ({ channelId }) {
  return {
    event: 'channelMessages',
    data: { channelId },
    meta: { remote: true },
    type: REQUEST_CHANNEL_MESSAGES
  };
}

/**
 * Send a request to the server (via websockets) to receive the messages of
 * a user.
 * @param {Object} params
 * @param {string} params.channelId
 */
export function fetchUserMessages ({ userId }) {
  return {
    event: 'userMessages',
    data: { userId },
    meta: { remote: true },
    type: REQUEST_USER_MESSAGES
  };
}

/**
 * Send a request to the server (via websockets) to send a message to a channel.
 * @param {Object} params
 * @param {string} params.channelId
 * @param {string} params.message
 */
export function persistChannelMessage ({ channelId, message }) {
  return {
    event: 'channelMessage',
    data: { channelId, message },
    meta: { remote: true },
    type: REQUEST_MESSAGE
  };
}

/**
 * Send a request to the server (via websockets) to send a message to a user.
 * @param {Object} params
 * @param {string} params.message
 * @param {string} params.userId
 */
export function persistUserMessage ({ message, userId }) {
  return {
    event: 'userMessage',
    data: { message, userId },
    meta: { remote: true },
    type: REQUEST_MESSAGE
  };
}
