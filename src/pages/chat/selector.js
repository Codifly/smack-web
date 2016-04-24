import { createSelector } from 'reselect';
import { List } from 'immutable';
import {
  channelsEntitiesSelector, channelHasMessagesRelationsSelector, messagesEntitiesSelector, usersEntitiesSelector,
  userHasMessagesRelationsSelector, chatHasUsersRelationsSelector, chatHasChannelsRelationsSelector
} from '../../data/selector';

export const currentChannelIdSelector = (state) => state.getIn([ 'chat', 'currentChannelId' ]);
export const currentUserIdSelector = (state) => state.getIn([ 'chat', 'currentUserId' ]);
export const myUserIdSelector = (state) => state.getIn([ 'login', 'myUserId' ]);

// Select the current selected channel from the state.
const currentChannelSelector = createSelector(
  channelsEntitiesSelector,
  currentChannelIdSelector,
  (channelsById, channelId) => channelsById.get(channelId)
);

// Select the current selected user from the state.
const currentUserSelector = createSelector(
  usersEntitiesSelector,
  currentUserIdSelector,
  (usersById, userId) => usersById.get(userId)
);

// Select the current logged in user from the state.
const myUserSelector = createSelector(
  usersEntitiesSelector,
  myUserIdSelector,
  (usersById, userId) => usersById.get(userId)
);

// Select the messages of the current selected channel/user from the state.
const messagesSelector = createSelector(
  channelHasMessagesRelationsSelector,
  userHasMessagesRelationsSelector,
  messagesEntitiesSelector,
  usersEntitiesSelector,
  currentChannelIdSelector,
  currentUserIdSelector,
  (channelHasMessages, userHasMessages, messagesById, usersById, channelId, userId) => {
    const messageIds = (channelId ? channelHasMessages.get(channelId) : userHasMessages.get(userId)) || List();

    // Besides the message we also store the username of the user that send the message,
    // inside the message.
    return messageIds.map((messageId) => {
      const message = messagesById.get(messageId);
      const user = usersById.get(message.get('userId'));
      return message.set('username', user.get('username'));
    });
  }
);

// Select the user list from the state.
const usersSelector = createSelector(
  myUserIdSelector,
  usersEntitiesSelector,
  chatHasUsersRelationsSelector,
  userHasMessagesRelationsSelector,
  messagesEntitiesSelector,
  (myUserId, usersById, userIds, userHasMessages, messagesById) => (
    userIds
      // Filter out the current logged in user.
      .filter((id) => id !== myUserId)
      // Get the user and also store it's last message.
      .map((userId) => {
        const user = usersById.get(userId);
        const messageId = (userHasMessages.get(userId) || List()).last();
        const message = messagesById.get(messageId);
        return user.set('lastMessage', message);
      })
  )
);

// Select the channel list from the state.
const channelsSelector = createSelector(
  channelsEntitiesSelector,
  chatHasChannelsRelationsSelector,
  usersSelector,
  (channelsById, channelIds, users) => (
    channelIds.map((channelId) => {
      const channel = channelsById.get(channelId);
      // For simplicity the number of online users is the number of
      // users that are online in the channel, because there is only one channel.
      return channel.set('onlineUsers', users.count((user) => user.get('status') === 'online') + 1);
    })
  )
);

// Selector used to retrieve the needed data from the state.
// This selector is used in the 'smart' component.
export default createSelector(
  currentChannelSelector,
  currentUserSelector,
  myUserSelector,
  messagesSelector,
  channelsSelector,
  usersSelector,
  (currentChannel, currentUser, myUser, messages, channels, users) => ({
    channels,
    currentChannel,
    currentUser,
    messages,
    myUser,
    users
  })
);
