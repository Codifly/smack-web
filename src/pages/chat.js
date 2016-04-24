/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import Radium from 'radium';
import { chatStyle, sidebarStyle, sidebarItemStyle } from '../constants/styles';

const channels = [
  { id: 'everyone', name: 'Global Smack', onlineUsers: 5 }
];
const users = [
  { id: '1', status: 'online', username: 'Bart' },
  { id: '2', status: 'online', username: 'Fred' },
  { id: '3', status: 'offline', username: 'Sofie' }
];

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
  }

  onClickChannel (channel, e) {
    e.preventDefault();
    // Set state will trigger a rerender. The channel will become selected...
    this.setState({ currentChannel: channel, currentUser: null });
  }

  onClickUser (user, e) {
    e.preventDefault();
    // Set state will trigger a rerender. The user will become selected...
    this.setState({ currentChannel: null, currentUser: user });
  }

  render () {
    const styles = chatStyle;
    const { currentChannel, currentUser } = this.state;

    return (
      <div style={styles.container}>
        <div style={sidebarStyle.sidebar}>
          <div style={sidebarStyle.search}>
            Conversations
          </div>
          <ul style={sidebarStyle.list}>
            {channels.map((channel) => {
              const selected = currentChannel === channel;
              return (
                <li
                  key={channel.id}
                  style={[
                    sidebarItemStyle.container.base,
                    sidebarItemStyle.container.channel,
                    selected && { color: 'red' }
                  ]}
                  onClick={this.onClickChannel.bind(this, channel)}>
                  {channel.name}
                </li>
              );
            })}
            {users.map((user) => {
              const selected = currentUser === user;
              return (
                <li
                  key={user.id}
                  style={[
                    sidebarItemStyle.container.base,
                    sidebarItemStyle.container.user,
                    selected && { color: 'red' }
                  ]}
                  onClick={this.onClickUser.bind(this, user)}>
                  {user.username}
                </li>
              );
            })}
          </ul>
        </div>
        <div style={styles.chatContainer}>
          <div>Header</div>
          <div>Messages</div>
        </div>
      </div>
    );
  }

}
