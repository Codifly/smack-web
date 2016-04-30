import { createSelector } from 'reselect';
import { usersEntitiesSelector, chatHasUsersRelationsSelector } from '../../data/selector';

// Select the user list from the state.
const usersSelector = createSelector(
  usersEntitiesSelector,
  chatHasUsersRelationsSelector,
  (usersById, userIds) => userIds.map((id) => usersById.get(id))
);

// Selector used to retrieve the needed data from the state.
// This selector is used in the 'smart' component.
export default createSelector(
  usersSelector,
  (users) => ({
    users
  })
);
