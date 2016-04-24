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

/**
  * ### Exercise 2
  * Together we create a skeleton for our chat application, which exists out of
  * three main components:
  *  - Sidebar
  *    The sidebar on the left shows all conversations. It exists out of a list
  *    of channels (one channel 'everyone' for simplicity) and a list of users.
  *  - Header
  *    The header displays the current selected channel/user on the left.
  *    On the right you see the current logged in user. Here you have a button
  *    to logout.
  *  - Messages
  *    This component shows all messages in the conversation. This component
  *    has as child a SendMessage component to send a message to the selected
  *    user/channel.
  * +----------+------------------------+
  * | Sidebar  | Header                 |
  * |          |------------------------+
  * | Channels | Messages               |
  * |          |                        |
  * |  Users   |                        |
  * |          |                        |
  * |          |                        |
  * |          |                        |
  * |          |------------------------|
  * |          | (Send message)         |
  * +----------+------------------------+
  * Together:
  * 1) Setup routing, so we can navigate to the chat page. Route: /#/chat
  * 2) Create a chat page with the same structure as explained above.
  *
  * Your mission:
  * 3) Render the following data in the sidebar:
  *    const channels = [
  *      { id: 'everyone', name: 'Global Smack', onlineUsers: 5 }
  *    ];
  *    const users = [
  *      { id: '1', status: 'online', username: 'Bart' },
  *      { id: '2', status: 'online', username: 'Fred' },
  *      { id: '3', status: 'offline', username: 'Sofie' }
  *    ];
  * 4) Make the users selectable. When you click on the user, the username should
  *    become red (use Radium). Use setState and Function.prototype.bind() to
  *    accomplish this.
  *
  * Tips:
  * How can I render dynamic children? (see 3)
  *   https://facebook.github.io/react/docs/multiple-components.html
  * How do I know which user is clicked? Try out the *bind()* method! (see 4)
  *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  * How can I apply multiple styles to an element. (see 4)
  *   https://github.com/FormidableLabs/radium
  */
