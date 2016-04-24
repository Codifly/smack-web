
// Entities selectors
export const channelsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'channels' ]);
export const messagesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'messages' ]);
export const usersEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'users' ]);

// Relations selectors
export const channelHasMessagesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'channelHasMessages' ]);
export const chatHasChannelsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'chatHasChannels' ]);
export const chatHasUsersRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'chatHasUsers' ]);
export const userHasMessagesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'userHasMessages' ]);
