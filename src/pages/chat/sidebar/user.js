import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { sidebarItemStyle } from '../../../constants/styles';

@Radium
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
    this.props.onClickUser(this.props.user);
  }

  render () {
    const styles = sidebarItemStyle;
    const { selected, user } = this.props;

    return (
      <li
        style={[ styles.container.base, styles.container.user, selected && styles.container.selected ]}
        onClick={this.onClick}>
        <div>
          <div style={[ styles.icon, styles.letterIcon ]}>{user.get('username').charAt(0).toUpperCase()}</div>
        </div>
        <div style={styles.info}>
          <div style={[ styles.title, styles.username ]}>
            {user.get('username')}
            <div style={[ styles.status.base, user.get('status') === 'online' ? styles.status.online : styles.status.offline ]}>&nbsp;</div>
          </div>
        </div>
      </li>
    );
  }

}
