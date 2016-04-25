/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Channel from './channel';
import User from './user';
import { sidebarStyle } from '../../../constants/styles';

/**
  * ### Exercise 3
  * Your mission: "Separate the different concerns of your app however you please
  * simply by building new components." -- React docs
  * 1) We almost implemented the sidebar and we can already see that the Chat
  *    component is becoming big. Let's seperate the concerns. From now on the
  *    Sidebar component should be responsible for displaying the channels/users
  *    and selecting a channel/user.
  *    Move the data (channels/users arrays) and the JSX to a new file
  *    called 'sidebar.js'. Create a new component Sidebar that renders the
  *    channels and users, and that can select a channel/user.
  * 2) Let's KISS! The Chat component should become a stateful (smart) component,
  *    and have all the data necessary to render a sidebar and the chat conversation.
  *    Grab the channel/user data and pass it to the sidebar as properties. Move the
  *    channels/users arrays back to the Chat component.
  * 3) Validate the Sidebar properties to ensure the component receives the properties
  *    it expected. Use ES6 syntax: static propTypes = { ... };
  * 4) Make the Chat component responsible for keeping track of the currentChannel/
  *    currentUser (store them in the state).
  *    The Sidebar component is now responsible to handle the click events on the
  *    users/channels. When clicking on a user/channel, we use event.preventDefault(),
  *    to prevent the default browser behaviour. Afterwards we call the
  *    onClickChannel/onClickUser callback with the channel/user that was clicked.
  *    Create two functions in the Chat component: selectChannel/selectUser, which
  *    are the callbacks passed to the Sidebar component. These calllbacks will
  *    manipulate the state of the Chat component and will trigger a rerender
  *    of the Sidebar component.
  *
  *    The properties the Sidebar component should receive:
  *      channels: [Object]
  *      currentChannel: Object (optional)
  *      currentUser: Object (optional)
  *      style: Object
  *      users: [Object]
  *      onClickChannel: func(selectedChannel)
  *      onClickUser: func(selectedUser)
  *
  *   Note: use the bind method in the Chat constructor to prevent that new
  *   functions are created in the Chat render. bind also allows you to access
  *   'this', like 'this.setState' for example.
  * 5) Bonus
  *    Use destructuring assignment syntax to destructure the Sidebar props.
  *    Use the '::' bind operator instead of func.bind(...) in the Chat constructor.
  *
  * Tips:
  * How do I access a property? (see 1)
  * How should I use bind? (see 4)
  *   http://facebook.github.io/react/docs/reusable-components.html#es6-classes
  * How can I validate the properties of a component? (see 3)
  *   http://facebook.github.io/react/docs/reusable-components.html#prop-validation
  * How does destructuring work in ES6?
  *   https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  * How does bind work in ES7?
  *   https://github.com/zenparsing/es-function-bind
  */
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
