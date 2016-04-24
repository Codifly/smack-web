import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Message from './message';
import SendMessage from './sendMessage';
import { messagesStyle } from '../../../constants/styles';

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
    const styles = messagesStyle;
    const { messages, myUser, style, onSendMessage } = this.props;
    const myUserId = myUser.get('id');

    /* eslint no-return-assign: 0 */
    return (
      <div style={style}>
        <ul ref={(c) => this.list = c} style={styles.messages}>
          {messages.map((message) => (
            <Message isMyMessage={myUserId === message.get('userId')} key={message.get('id')} message={message} />)
          )}
        </ul>
        <SendMessage
          style={styles.sendMessage}
          onSubmit={onSendMessage} />
      </div>
    );
  }

}
