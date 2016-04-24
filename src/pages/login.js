/* eslint-disable no-return-assign */
/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { loginStyle } from '../constants/styles';

const logo = require('./smackLogo.svg');

/**
  * ### Exercise 1
  * 1) Get rid of the lint error 'Component should use es6 class instead of createClass'.
  * 2) Create a login form with a field to enter your username:
  *     - Create a form component inside the root div component.
  *     - Create an input component to enter your username.
  *     - Create a button component to submit the form.
  * 3) Print the content of the input field to the console when the form is submitted
  *    (without reloading the page!).
  * 4) Render 'Hello <username>!' underneed the input field when entering your username.
  *    (without reloading the page!) In other words: echo the username.
  *
  * Tips:
  * How do references work? (see 3)
  *   https://facebook.github.io/react/docs/more-about-refs.html
  * How can I update the state of my component? (see 4)
  *   https://facebook.github.io/react/docs/forms.html
  *   https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  * Override the default constructor to bind a function.
  */
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
