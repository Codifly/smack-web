import { reset } from 'redux-form';
import * as actions from '../../data/actions';
import { currentChannelIdSelector, currentUserIdSelector } from './selector';

export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const SELECT_USER = 'SELECT_USER';

/**
 * Select a user in the sidebar.
 * @param {string} userId The id of the user to select.
 */
export function selectUser (userId) {
  return (dispatch) => {
    dispatch({ type: SELECT_USER, userId });
    dispatch(actions.fetchUserMessages({ userId }));
  };
}

/**
 * Select a channel in the sidebar.
 * @param {string} channelId The id of the channel to select.
 */
export function selectChannel (channelId) {
  return (dispatch) => {
    dispatch({ type: SELECT_CHANNEL, channelId });
    dispatch(actions.fetchChannelMessages({ channelId }));
  };
}

/**
 * Logout, destroy the user session, stored in local storage.
 */
export function logout () {
  return actions.logout();
}

/**
 * Send a message to the current selected user or channel.
 * @param {Object} fields Object with values of redux-form.
 * @param {string} fields.message The text messsage to send.
 */
export function sendMessage ({ message }) {
  return (dispatch, getState) => {
    const state = getState();
    const channelId = currentChannelIdSelector(state);
    const userId = currentUserIdSelector(state);

    if (channelId) {
      // Send a message to the selected channel.
      dispatch(actions.persistChannelMessage({ channelId, message }));
    } else {
      // Send a message to the selected user.
      dispatch(actions.persistUserMessage({ message, userId }));
    }

    // Reset the message form.
    dispatch(reset('messageForm'));
  };
}
