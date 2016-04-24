import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { messageStyle } from '../../../constants/styles';

@Radium
export default class Message extends Component {

  static propTypes = {
    isMyMessage: PropTypes.bool.isRequired,
    message: ImmutablePropTypes.map.isRequired
  };

  formatDate (unix) {
    const pad = (n) => n < 10 ? `0${n}` : n;
    const d = new Date(unix);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes())}`;
  }

  render () {
    const styles = messageStyle;
    const { isMyMessage, message } = this.props;
    const username = message.get('username');

    const icon = (
      <div style={styles.iconContainer}>
        <div style={styles.icon}>{username.charAt(0).toUpperCase()}</div>
      </div>
    );

    return (
      <li style={[ styles.container.base, isMyMessage && styles.container.mine ]}>
        <div style={styles.header}>
          {!isMyMessage && icon}
          <div style={styles.username}>{username}</div>
          <div style={styles.timestamp}>at {this.formatDate(message.get('timestamp'))}</div>
          {isMyMessage && icon}
        </div>
        <div style={[ styles.message.base, isMyMessage && styles.message.mine ]}>
          {message.get('message')}
        </div>
      </li>
    );
  }

}
