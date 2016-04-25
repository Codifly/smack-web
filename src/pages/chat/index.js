/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable';
import Header from './header';
import Messages from './messages';
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
const myUser = fromJS({ id: '4', status: 'online', username: 'Tony' });
const messages = fromJS([
  { id: '1', message: 'Hi, my name is Tony! How are you?', timestamp: 1461600939000, userId: '4', username: 'Tony' },
  { id: '2', message: 'Hi, I\'m Fred! I\'m doing fine!', timestamp: 1461601249000, userId: '2', username: 'Fred' },
  { id: '3', message: 'Let\'s get started and create a real chat app!', timestamp: 1461601349000, userId: '4', username: 'Tony' },
  { id: '4', message: 'Yeah! Kick it!', timestamp: 1461601549000, userId: '2', username: 'Fred' }
]);

/**
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
  */
@Radium
export default class Chat extends Component {

  constructor (props) {
    super(props);
    // Set the initial state.
    this.state = { currentChannel: channels.get(0), currentUser: null };
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
          <Header
            currentChannel={currentChannel}
            currentUser={currentUser}
            myUser={myUser} />
          <Messages
            messages={messages}
            myUser={myUser}
            style={styles.messages} />
          </div>
      </div>
    );
  }

}
