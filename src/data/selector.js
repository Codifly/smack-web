
// Entities selectors
export const usersEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'users' ]);

// Relations selectors
export const chatHasUsersRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'chatHasUsers' ]);
