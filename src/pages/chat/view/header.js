import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { headerStyle, sidebarItemStyle } from '../../../constants/styles';

const logoutIcon = require('./logoutIcon.svg');

@Radium
export default class Header extends Component {

  static propTypes = {
    currentChannel: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.map,
    logout: PropTypes.func.isRequired,
    myUser: ImmutablePropTypes.map.isRequired
  }

  constructor (props) {
    super(props);
    this.onLogoutClick = ::this.onLogoutClick;
  }

  onLogoutClick (e) {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    const styles = headerStyle;
    const { currentChannel, currentUser, myUser } = this.props;

    return (
      <div style={styles.container}>
        <div>
          {currentChannel && <div style={[ sidebarItemStyle.icon, sidebarItemStyle.channelIcon ]}></div>}
          {currentUser && <div style={[ sidebarItemStyle.icon, sidebarItemStyle.letterIcon ]}>{currentUser.get('username').charAt(0).toUpperCase()}</div>}
        </div>
        <div style={styles.title}>{currentChannel ? currentChannel.get('name') : currentUser.get('username')}</div>
        <div style={styles.right}>
          <span style={styles.username}>{myUser.get('username')}</span>
          <button onClick={this.onLogoutClick}><img alt='Logout' src={logoutIcon} title='Logout'/></button>
        </div>
      </div>
    );
  }

}
