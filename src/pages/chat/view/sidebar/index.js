import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Channel from './channel';
import User from './user';
import { sidebarStyle } from '../../../../constants/styles';

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
