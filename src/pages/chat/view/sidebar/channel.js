import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styled, { css } from 'styled-components';
import { colors } from '../../../../constants/colors';

const channelIcon = require('../../../../constants/channelIcon.svg');

const SidebarItemContainer = styled.li`
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
  cursor: pointer;
  display: flex;
  height: 80px;
  list-style-type: none;
  padding: 20px;
  backgroundColor: ${colors.white};
  borderLeft: 2px solid ${colors.white};
  
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
  background-image: url(${channelIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
`;

const SidebarItemInfo = styled.div`
   width: 180px;
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

const SidebarItemSubtitle = styled.div`
  color: ${colors.silver};
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default class Channel extends Component {

  static propTypes = {
    channel: ImmutablePropTypes.map.isRequired,
    selected: PropTypes.bool.isRequired,
    onClickChannel: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick (e) {
    e.preventDefault();
    this.props.onClickChannel(this.props.channel.get('id'));
  }

  render () {
    const { channel, selected } = this.props;
    return (
      <SidebarItemContainer select={selected && 'true'} onClick={this.onClick}>
        <div>
          <SidebarItemIcon></SidebarItemIcon>
        </div>
        <SidebarItemInfo>
          <SidebarItemTitle>{channel.get('name')}</SidebarItemTitle>
          <SidebarItemSubtitle>with {channel.get('onlineUsers')} people</SidebarItemSubtitle>
        </SidebarItemInfo>
      </SidebarItemContainer>
    );
  }

}
