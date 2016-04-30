import { createSelector } from 'reselect';
import { usersEntitiesSelector, chatHasUsersRelationsSelector } from '../../data/selector';

export const myUserIdSelector = (state) => state.getIn([ 'login', 'myUserId' ]);

// Select the user list from the state.
const usersSelector = createSelector(
  usersEntitiesSelector,
  chatHasUsersRelationsSelector,
  myUserIdSelector,
  (usersById, userIds, myUserId) => (
    userIds
      // Filter myself.
      .filter((id) => id !== myUserId)
      // Get the user by id.
      .map((id) => usersById.get(id))
  )
);

// Selector used to retrieve the needed data from the state.
// This selector is used in the 'smart' component.
export default createSelector(
  usersSelector,
  (users) => ({
    users
  })
);
