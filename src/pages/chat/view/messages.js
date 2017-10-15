import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Message from './message';
import SendMessage from './sendMessage';

import styled from 'styled-components';
import { colors } from '../../../constants/colors';

const MessagesUl = styled.ul`
  bottom: 80px;
  left: 280px;
  margin: 0;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  right: 0;
  top: 80px;
`;
/*
const SendMessage = styled.div`
  background-color: ${colors.lightGrey};
  border-top: 1px solid ${colors.grey};
  bottom: 0;
  height: 80px;
  left: 280px;
  padding: 20px;
  position: absolute;
  right: 0;
`;
*/

export default class Messages extends Component {

  static propTypes = {
    messages: ImmutablePropTypes.list.isRequired,
    myUser: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    onSendMessage: PropTypes.func.isRequired
  };

  // If we are at the top of the chat, you should scroll down to the bottom.
  componentWillUpdate () {
    const node = this.list;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }

  componentDidUpdate () {
    if (this.shouldScrollBottom) {
      const node = this.list;
      node.scrollTop = node.scrollHeight;
    }
  }

  render () {
    const { messages, myUser, style, onSendMessage } = this.props;
    const myUserId = myUser.get('id');

    /* eslint no-return-assign: 0 */
    return (
      <div style={style}>
        <MessagesUl ref={(c) => this.list = c}>
          {messages.map((message) => (
            <Message isMyMessage={myUserId === message.get('userId')} key={message.get('id')} message={message} />)
          )}
        </MessagesUl>
        <SendMessage
          onSubmit={onSendMessage} />
      </div>
    );
  }

}
