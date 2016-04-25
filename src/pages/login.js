/* eslint-disable no-return-assign */
/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { loginStyle } from '../constants/styles';

const logo = require('./smackLogo.svg');

export default class Login extends Component {

  constructor (props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.submit = ::this.submit;
    this.state = { username: '' };
  }

  handleChange (e) {
    this.setState({ username: e.target.value });
  }

  submit (e) {
    e.preventDefault();
    console.warn('Hello ', this.usernameInput.value, '!');
  }

  render () {
    const styles = loginStyle;
    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={this.submit}>
          <img src={logo} style={styles.logo} />
          <input
            autoComplete='off'
            placeholder='Your name'
            ref={(c) => this.usernameInput = c}
            style={styles.input}
            type='text'
            onChange={this.handleChange}/>
          {this.state.username && <div>Hello {this.state.username}!</div>}
          <button style={styles.button} type='submit'>Join</button>
        </form>
      </div>
    );
  }
}
