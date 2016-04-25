/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable';
import Sidebar from './sidebar';
import { chatStyle } from '../../constants/styles';

const channels = fromJS([
  { id: 'everyone', name: 'Global Smack', onlineUsers: 5 }
]);
const users = fromJS([
  { id: '1', status: 'online', username: 'Bart' },
  { id: '2', status: 'online', username: 'Fred' },
  { id: '3', status: 'offline', username: 'Sofie' }
]);

/**
  * ### Exercise 2
  * Together we create a skeleton for our chat application, which exists out of
  * three main components:
  *  - Sidebar
  *    The sidebar on the left shows all conversations. It exists out of a list
  *    of channels (one channel 'everyone' for simplicity) and a list of users.
  *  - Header
  *    The header displays the current selected channel/user on the left.
  *    On the right you see the current logged in user. Here you have a button
  *    to logout.
  *  - Messages
  *    This component shows all messages in the conversation. This component
  *    has as child a SendMessage component to send a message to the selected
  *    user/channel.
  * +----------+------------------------+
  * | Sidebar  | Header                 |
  * |          |------------------------+
  * | Channels | Messages               |
  * |          |                        |
  * |  Users   |                        |
  * |          |                        |
  * |          |                        |
  * |          |                        |
  * |          |------------------------|
  * |          | (Send message)         |
  * +----------+------------------------+
  * Together:
  * 1) Setup routing, so we can navigate to the chat page. Route: /#/chat
  * 2) Create a chat page with the same structure as explained above.
  *
  * Your mission:
  * 3) Render the following data in the sidebar:
  *    const channels = [
  *      { id: 'everyone', name: 'Global Smack', onlineUsers: 5 }
  *    ];
  *    const users = [
  *      { id: '1', status: 'online', username: 'Bart' },
  *      { id: '2', status: 'online', username: 'Fred' },
  *      { id: '3', status: 'offline', username: 'Sofie' }
  *    ];
  * 4) Make the users selectable. When you click on the user, the username should
  *    become red (use Radium). Use setState and Function.prototype.bind() to
  *    accomplish this.
  *
  * Tips:
  * How can I render dynamic children? (see 3)
  *   https://facebook.github.io/react/docs/multiple-components.html
  * How do I know which user is clicked? Try out the *bind()* method! (see 4)
  *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  * How can I apply multiple styles to an element. (see 4)
  *   https://github.com/FormidableLabs/radium
  */
@Radium
export default class Chat extends Component {

  constructor (props) {
    super(props);
    // Set the initial state.
    this.state = { currentChannel: null, currentUser: null };
    // Bind the select functions so we can access 'this'.
    this.selectChannel = ::this.selectChannel;
    this.selectUser = ::this.selectUser;
  }

  selectChannel (channel) {
    this.setState({ currentChannel: channel, currentUser: null });
  }

  selectUser (user) {
    this.setState({ currentChannel: null, currentUser: user });
  }

  render () {
    const styles = chatStyle;
    const { currentChannel, currentUser } = this.state;

    return (
      <div style={styles.container}>
        <Sidebar
          channels={channels}
          currentChannel={currentChannel}
          currentUser={currentUser}
          style={styles.sidebar}
          users={users}
          onClickChannel={this.selectChannel}
          onClickUser={this.selectUser} />

        <div style={styles.chatContainer}>
          <div>Header</div>
          <div>Messages</div>
        </div>
      </div>
    );
  }

}

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
