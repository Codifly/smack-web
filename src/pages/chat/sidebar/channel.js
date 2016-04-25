import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { sidebarItemStyle } from '../../../constants/styles';

@Radium
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
    this.props.onClickChannel(this.props.channel);
  }

  render () {
    const styles = sidebarItemStyle;
    const { channel, selected } = this.props;
    return (
      <li
        style={[ styles.container.base, styles.container.channel, selected && styles.container.selected ]}
        onClick={this.onClick}>
        <div>
          <div style={[ styles.icon, styles.channelIcon ]}></div>
        </div>
        <div style={styles.info}>
          <div style={styles.title}>{channel.get('name')}</div>
          <div style={styles.subtitle}>with {channel.get('onlineUsers')} people</div>
        </div>
      </li>
    );
  }

}
