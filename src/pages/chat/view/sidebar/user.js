import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styled, { css } from 'styled-components';
import { colors } from '../../../../constants/colors';

const SidebarItemContainer = styled.li`
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
  cursor: pointer;
  display: flex;
  height: 80px;
  list-style-type: none;
  padding: 20px;
  backgroundColor: ${colors.lightGrey};
  borderLeft: 2px solid ${colors.lightGrey};
  
  ${props => props.select === "true" && css`
    border-left: 2px solid ${colors.darkPurple};
  `}
`;

const SidebarItemIcon = styled.div`
  align-items: center;
  border: solid 1px ${colors.grey};
  border-radius: 50%;
  display: flex;
  flex: 0 0 40px;
  height: 40px;
  justify-content: center;
  margin-right: 20px;
  width: 40px;
  color: ${colors.darkPurple};
  font-size: 26px;
`;

const SidebarItemInfo = styled.div`
   width: 180px;
`;

const SidebarItemTime = styled.div`
  color: ${colors.silver};
  float: right;
  font-size: 12px;
  margin-top: 6px;
`;

const SidebarItemTitle = styled.div`
  align-items: center;
  color: ${colors.darkGrey};
  display: flex;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarItemStatus = styled.div`
  border-radius: 50%;
  height: 6px;
  margin-left: 7px;
  width: 6px;

  ${props => props.status === "offline" && css`
    background-color: ${colors.silver};
  `}

  ${props => props.status === "online" && css`
    background-color: ${colors.green};
  `}
`;

const SidebarItemSubtitle = styled.div`
  color: ${colors.silver};
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default class User extends Component {

  static propTypes = {
    selected: PropTypes.bool.isRequired,
    user: ImmutablePropTypes.map.isRequired,
    onClickUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  formatDate (unix) {
    const pad = (n) => n < 10 ? `0${n}` : n;
    const d = new Date(unix);
    return `${d.getHours()}:${pad(d.getMinutes())}`;
  }

  onClick (e) {
    e.preventDefault();
    this.props.onClickUser(this.props.user.get('id'));
  }

  render () {
    const { selected, user } = this.props;
    const lastMessage = user.get('lastMessage');

    return (
      <SidebarItemContainer select={selected && 'true'} onClick={this.onClick}>
        <div>
          <SidebarItemIcon>{user.get('username').charAt(0).toUpperCase()}</SidebarItemIcon>
        </div>
        <SidebarItemInfo>
          <SidebarItemTime>{lastMessage && this.formatDate(lastMessage.get('timestamp'))}</SidebarItemTime>
          <SidebarItemTitle>
            {user.get('username')}
            <SidebarItemStatus status={user.get('status') === 'online' ? 'online' : 'offline' } >&nbsp;</SidebarItemStatus>
          </SidebarItemTitle>

          <SidebarItemSubtitle>{lastMessage && lastMessage.get('message')}</SidebarItemSubtitle>
        </SidebarItemInfo>
      </SidebarItemContainer>
    );
  }

}
