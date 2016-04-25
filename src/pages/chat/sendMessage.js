import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { sendMessageStyle } from '../../constants/styles';

@Radium
export default class SendMessage extends Component {

  static propTypes = {
    style: PropTypes.object
  };

  render () {
    const styles = sendMessageStyle;
    const { style } = this.props;

    return (
      <div style={style}>
        <form style={styles.container}>
          <input autoComplete='off' placeholder='Write something...' style={styles.input} type='text' />
          <button style={styles.button} type='submit'>Send</button>
        </form>
      </div>
    );
  }
}
