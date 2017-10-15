import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styled, { css } from 'styled-components';
import { colors } from '../../../constants/colors';

const MessageContainerBase = styled.li`
  list-style-type: none;
  padding: 10px 20px 10px 20px;

  ${props => props.mine && css`
    text-align: right;
  `}
`;

const MessageBase = styled.div`
  background-color: ${colors.lightGrey};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  display: inline-block;
  margin-top: 16px;
  padding: 20px;

  ${props => props.mine && css`
    background-color: ${colors.darkPurple};
    border-top-left-radius: 20px;
    border-top-right-radius: 0;
    color: ${colors.white};
  `}
`;

const MessageHeader = styled.div`
  font-Size: 12px;
`;

const MessageIcon = styled.div`
  align-Items: center;
  border: solid 1px ${colors.grey};
  border-Radius: 50%;
  color: ${colors.darkPurple};
  display: flex;
  flex: 0 0 20px;
  font-Size: 13px;
  height: 20px;
  justify-Content: center;
  width: 20px;
`;

const MessageIconContainer = styled.div`
    display: inline-block;
`;

const MessageTimeStamp = styled.div`
    color: ${colors.silver};
    display: inline-block;
    margin-Right: 13px;
`;

const MessageUsername = styled.div`
    color: ${colors.darkPurple};
    display: inline-block;
    margin-Left: 13px;
    margin-Right: 5px;
`;

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
    const { isMyMessage, message } = this.props;
    const username = message.get('username');

    const icon = (
      <MessageIconContainer>
        <MessageIcon>{username.charAt(0).toUpperCase()}</MessageIcon>
      </MessageIconContainer>
    );

    if (isMyMessage) {
      return (
        <MessageContainerBase mine>
          <MessageHeader>
            <MessageUsername>{username}</MessageUsername>
            <MessageTimeStamp>at {this.formatDate(message.get('timestamp'))}</MessageTimeStamp>
            {icon}
          </MessageHeader>
          <MessageBase mine>
            {message.get('message')}
          </MessageBase>
        </MessageContainerBase>
      );
    } else if (!isMyMessage) {
      return (
        <MessageContainerBase>
          <MessageHeader>
            {icon}
            <MessageUsername>{username}</MessageUsername>
            <MessageTimeStamp>at {this.formatDate(message.get('timestamp'))}</MessageTimeStamp>
          </MessageHeader>
          <MessageBase>
            {message.get('message')}
          </MessageBase>
        </MessageContainerBase>
      );
    }
  }

}
