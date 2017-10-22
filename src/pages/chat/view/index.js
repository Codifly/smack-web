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

import styled, { css } from 'styled-components';
import { colors } from '../../../constants/colors';

const SidebarStyled = styled(Sidebar)`
  width: 280px;
`;
const ContainerStyled = styled.div`
  display: flex;
`;
const ChatContainerStyled = styled.div`
  width: 100%;
`;
const MessagesStyled = styled(Messages)`
width: 100%;
`;

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
    const { channels, currentChannel, currentUser, logout, messages, myUser, selectChannel, selectUser, sendMessage, users } = this.props;

    if (!myUser) {
      // User is not authenticated.
      return <div></div>;
    }

    return (
      <ContainerStyled>
        <Sidebar
          channels={channels}
          currentChannel={currentChannel}
          currentUser={currentUser}
          users={users}
          onClickChannel={selectChannel}
          onClickUser={selectUser} />
        <ChatContainerStyled>
          <Header
            currentChannel={currentChannel}
            currentUser={currentUser}
            logout={logout}
            myUser={myUser} />
          <Messages
            messages={messages}
            myUser={myUser}
            onSendMessage={sendMessage} />
        </ChatContainerStyled>
      </ContainerStyled>
    );
  }

}
