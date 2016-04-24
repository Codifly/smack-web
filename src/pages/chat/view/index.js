import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push } from 'react-router-redux';
import Header from './header';
import Messages from './messages';
import Sidebar from './sidebar';
import * as actions from '../actions';
import selector from '../selector';
import { chatStyle } from '../../../constants/styles';

@connect(selector, (dispatch) => ({
  logout: bindActionCreators(actions.logout, dispatch),
  updatePath: bindActionCreators(push, dispatch),
  selectChannel: bindActionCreators(actions.selectChannel, dispatch),
  selectUser: bindActionCreators(actions.selectUser, dispatch),
  sendMessage: bindActionCreators(actions.sendMessage, dispatch)
}))
export default class Chat extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    currentChannel: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.map,
    logout: PropTypes.func.isRequired,
    messages: ImmutablePropTypes.list.isRequired,
    myUser: ImmutablePropTypes.map,
    selectChannel: PropTypes.func.isRequired,
    selectUser: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    updatePath: PropTypes.func.isRequired,
    users: ImmutablePropTypes.list.isRequired
  };

  // Check if the user is authenticated.
  componentWillMount () {
    if (!this.props.myUser) {
      this.props.updatePath('/login');
    }
  }

  render () {
    const styles = chatStyle;
    const { channels, currentChannel, currentUser, logout, messages, myUser, selectChannel, selectUser, sendMessage, users } = this.props;

    if (!myUser) {
      // User is not authenticated.
      return <div></div>;
    }

    return (
      <div style={styles.container}>
        <Sidebar
          channels={channels}
          currentChannel={currentChannel}
          currentUser={currentUser}
          style={styles.sidebar}
          users={users}
          onClickChannel={selectChannel}
          onClickUser={selectUser} />
        <div style={styles.chatContainer}>
          <Header
            currentChannel={currentChannel}
            currentUser={currentUser}
            logout={logout}
            myUser={myUser} />
          <Messages
            messages={messages}
            myUser={myUser}
            style={styles.messages}
            onSendMessage={sendMessage} />
          </div>
      </div>
    );
  }

}
