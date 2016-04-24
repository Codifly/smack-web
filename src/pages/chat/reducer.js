import { Map } from 'immutable';
import { LOGIN_SUCCESS } from '../../data/actions';
import * as actions from './actions';

/**
  * chat
  * -> currentChannelId The id of the channel that is selected in the left sidebar.
  * -> currentUserId The id of the user that is selected in the left sidebar.
  * -> myUserId The id of the user that is logged in.
  */
export default (state = Map({ currentChannelId: 'everyone' }), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Store the user id of the user that is logged in.
      return state.set('myUserId', action.data.id);
    case actions.SELECT_CHANNEL:
      // Select the channel, deselect the user.
      return state
        .set('currentChannelId', action.channelId)
        .delete('currentUserId');
    case actions.SELECT_USER:
      // Select the user, deselect the channel.
      return state
        .set('currentUserId', action.userId)
        .delete('currentChannelId');
    default:
      return state;
  }
};
