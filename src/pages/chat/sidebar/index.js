/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Channel from './channel';
import User from './user';
import { sidebarStyle } from '../../../constants/styles';

@Radium
export default class Sidebar extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    currentChannel: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.map,
    style: PropTypes.object.isRequired,
    users: ImmutablePropTypes.list.isRequired,
    onClickChannel: PropTypes.func.isRequired,
    onClickUser: PropTypes.func.isRequired
  };

  onClickChannel (channel, e) {
    e.preventDefault();
    // Call the callback of the stateful parent component (Chat).
    this.props.onClickChannel(channel);
  }

  onClickUser (user, e) {
    e.preventDefault();
    // Call the callback of the stateful parent component (Chat).
    this.props.onClickUser(user);
  }

  render () {
    const styles = sidebarStyle;
    const {
      channels, currentChannel, currentUser, style, users,
      onClickChannel, onClickUser
    } = this.props;

    return (
      <div style={style}>
        <div style={styles.search}>
          Conversations
        </div>
        <ul style={styles.list}>
          {channels.map((channel) => (
            <Channel
              channel={channel}
              key={channel.get('id')}
              selected={(currentChannel && currentChannel.get('id')) === channel.get('id')}
              onClickChannel={onClickChannel} />
          ))}
          {users.map((user) => (
            <User
              key={user.get('id')}
              selected={(currentUser && currentUser.get('id')) === user.get('id')}
              user={user}
              onClickUser={onClickUser} />
          ))}
        </ul>
      </div>
    );
  }
}

/**
  * ### Exercise 4
  * 'Less is more': keep components easy to understand by keeping them small.
  * 1) Create a folder 'chat' in the 'pages' folder. Create a folder sidebar in
  *    the 'chat' folder. Move the sidebar.js file to the 'sidebar' folder and
  *    rename the file to index.js. Move the chat.js file to the 'chat' folder and
  *    rename the file to index.js. Fix all linting error, i.e. fix the paths.
  * 2) Create a new component Channel in a new file 'channel.js' in the 'sidebar'
  *    folder.
  *    The Channel component is responsible for displaying a channel, i.e.,
  *    displaying a channel icon, channel name, number of online users in that
  *    channel, and a selected status (selected or not).
  *
  *    The Channel component should receive the following properties:
  *      channel: Object
  *      selected: bool
  *      onClickChannel: func(selectedChannel)
  *
  *    Move the JSX and the function this.onClickChannel to the Channel component.
  *    The Channel component (the 'leaf' in 'tree') is now responsible for
  *    preventing the default behaviour of an on click event and to call the callbacks
  *    that is passed as property.
  * 3) Now do the same for a User.
  *    The User component is responsible for displaying a user, i.e.,
  *    displaying a user icon (first letter of the username), username, online/offline
  *    status, and a selected status (selected or not).
  *
  *    The User component should receive the following properties:
  *      selected: bool
  *      user: Object
  *      onClickUser: func(selectedUser)
  *
  * Let's get in touch with Immutable.js.
  *   'Immutable data cannot be changed once created, leading to much simpler
  *    application development, no defensive copying, and enabling advanced
  *    memoization and change detection techniques with simple logic.
  *    Persistent data presents a mutative API which does not update the data
  *    in-place, but instead always yields new updated data.
  *
  *    Immutable.js provides many Persistent Immutable data structures including:
  *    List, Stack, Map, OrderedMap, Set, OrderedSet and Record.' -- Immutable.js
  *
  *    Docs: https://facebook.github.io/immutable-js/docs/#/
  *
  * 4) Use fromJS to create immutable datastructures like Map (≈ Object) and List
  *    (≈ Array) from ordinary JavaScript datastructures like Object and Array.
  *    Use fromJS to translate the channels and users array into Lists of Maps.
  *    Update the propTypes by using react-immutable-proptypes.
  *    Use "import ImmutablePropTypes from 'react-immutable-proptypes';",
  *    'ImmutablePropTypes.list.isRequired' and 'ImmutablePropTypes.map'.
  *    Use Immutable datastructures where needed. You can access a propery of a Map
  *    like this "user.get('username')". You can use map in the same way as on
  *    an ordinary Array.
  *
  * Bonus:
  *   Create a Messages component which displays the messages of a channel or user.
  */
