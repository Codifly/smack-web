import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Channel from './channel';
import User from './user';

import styled, { css } from 'styled-components';
import { colors } from '../../../../constants/colors';

const SidebarList = styled.ul`
  bottom: 0;
  margin: 0;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  top: 80px;
  width: 280px;
`;

const SidebarSearch = styled.div`
  background-color: ${colors.darkPurple};
  color: ${colors.white};
  fontSize: 20px;
  height: 80px;
  padding: 28px 20px;
  width: 280px;
`;

export default class Sidebar extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    currentChannel: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.map,
    users: ImmutablePropTypes.list.isRequired,
    onClickChannel: PropTypes.func.isRequired,
    onClickUser: PropTypes.func.isRequired
  };

  render () {
    const {
      channels, currentChannel, currentUser, users,
      onClickChannel, onClickUser
    } = this.props;

    return (
      <div>
        <SidebarSearch>
          Conversations
        </SidebarSearch>
        <SidebarList>
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
        </SidebarList>
      </div>
    );
  }

}
