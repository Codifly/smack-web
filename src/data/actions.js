export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
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
