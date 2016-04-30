/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Header from './header';
import Messages from './messages';
import Sidebar from './sidebar';
import selector from './selector';

import { chatStyle } from '../../constants/styles';

const channels = fromJS([
  { id: 'everyone', name: 'Global Smack', onlineUsers: 5 }
]);
const myUser = fromJS({ id: '4', status: 'online', username: 'Tony' });
const messages = fromJS([
  { id: '1', message: 'Hi, my name is Tony! How are you?', timestamp: 1461600939000, userId: '4', username: 'Tony' },
  { id: '2', message: 'Hi, I\'m Fred! I\'m doing fine!', timestamp: 1461601249000, userId: '2', username: 'Fred' },
  { id: '3', message: 'Let\'s get started and create a real chat app!', timestamp: 1461601349000, userId: '4', username: 'Tony' },
  { id: '4', message: 'Yeah! Kick it!', timestamp: 1461601549000, userId: '2', username: 'Fred' }
]);

/**
  * ### Exercise 6
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
  * In this exercise you will learn how to store data received from the
  * server in the application state and you can use it in your components.
  * First of all we want to show a real list of users in the sidebar.
  * 1) Similar to the 'login' event we want to listen to the 'users' event.
  *    After login the client receives a list of users. dispatch the action with
  *    type USERS_FETCH and with the 'data' (users) received. Define you action
  *    type in the actions.js file.
  * 2) 'Listen' to this action type in the data reducer and store the users in
  *    the application state. The structure of the data state should look like this:
  *    {
  *      entities: {
  *        users: {
  *          1: {
  *            id: '1',
  *            status: 'online',
  *            username: 'Bart'
  *          },
  *        }
  *      },
  *      relations: {
  *        chatHasUsers: [ '1' ]
  *      }
  *    }
  *    Use the Map and List datastructure of Immutable.js or fromJS to transform
  *    ordinairy JavaScript datastructures to Immutable.js datastructures.
  *    Use the module 'normalizr' to transform the data coming from the server.
  * 3) Use the module 'reselect' to compute derived data from our state,
  *    which allows Redux to store the minimal possible state.
  *    First, create a selector (in data/selector.js) that selects the user ids
  *    (chatHasUsers) from data state (which is an Immutable Map). Then create
  *    a selector (also in data/selector.js) for the user entities Map.
  *    Then we need to combine both selectors, using reselect's createSelector.
  *    Create a selector (in pages/chat/selector.js) which retrieves a List of users from the state.
  *    Create a users List by mapping over the id's and retrieving the user from
  *    the user entities Map.
  *    Lastly, export a new selector (in pages/chat/selector.js) which constructs
  *    an object { users: List(...) }.
  * 4) Connect the Chat component to our Redux store, using the react-redux connect
  *    decorator. Take a look at the connector of the Login component. Use the
  *    selector (mapStateToProps function) we just created in the connect
  *    decorator of our Chat component.
  * 5) Update the propTypes of the Chat component and make use of the users List
  *    retrieved from the Redux store. Remove the users dummy data.
  * Tips:
  * How can I normalize JSON data, coming from the server, in a consistant way? (see 2)
  *   https://github.com/gaearon/normalizr
  * How can I use reselect to compute derived data? (see 3)
  *   https://github.com/reactjs/reselect
  * How can I connect a selector to the Redux store? (see 4)
  *   https://github.com/reactjs/reselect#connecting-a-selector-to-the-redux-store
  */
@connect(selector)
@Radium
export default class Chat extends Component {

  static propTypes = {
    users: ImmutablePropTypes.list.isRequired
  };

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
    const { users } = this.props;
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
