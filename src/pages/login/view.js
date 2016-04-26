/* eslint-disable no-return-assign */
/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginStyle } from '../../constants/styles';
import * as actions from './actions';

const logo = require('./smackLogo.svg');

/**
  * ### Exercise 5
  * Let's get started with Redux as state container! The goal of this exercise
  * is to login and navigate to the chat page. We therefore comminicate with the
  * server via websockets.
  * 1) First, create a new folder 'login' and move the login.js file to this
  *    folder and rename it to view.js. Now create file for the actions, called
  *    actions.js. Create an action creator called 'submit', which receives an
  *    Object with a username.
  *
  *    The are two kinds of actions: GUI actions and data actions. The first kind
  *    of actions are triggered by user interactions. A GUI action can trigger
  *    multiple data actions, for example when we click on a user, we fetch his
  *    profile and we fetch his chat messages. Triggering a data action will
  *    update the data store with new data, e.g. when receiving a new message.
  *
  *    Note: update the path in the src/index.js file and move the smackLogo.svg.
  *
  * 2) Connect the Login component to the Redux store. Trigger the submit action
  *    when submitting the login form. In other words: dispatch the action created
  *    by the submit action creator. For now, the created action won't update the store.
  *    Use a dummy action type like: 'LOGIN_ACTION'.
  *    Check your console, you should now see that the 'LOGIN_ACTION' is logged
  *    when submitting the login form.
  *    Note: don't forget to define your propTypes!
  * 3) Create a file 'actions.js' under src/data and create an action creator
  *    called 'login'. Also define an action type REQUEST_LOGIN.
  *    Export your action types if you want to use them elsewhere (e.g., in the data reducer).
  *    The action creator should communicate with the socket.io server via redux middleware.
  *    Let's take a look at how the redux middleware, called remoteActionMiddleware,
  *    is implemented in createStore.js.
  *    The 'login' action creator should return the following action:
  *    {
  *      event: 'joinChat',
  *      data: { username },
  *      meta: { remote: true },
  *      type: REQUEST_LOGIN
  *    }
  *    This event is emitted to the server like socket.emit(event, data).
  *    We use meta.remote to indicate thate the remoteActionMiddleware should
  *    react and not only dispatch the action to the redux store but also dispatch
  *    it to the server.
  * 4) When initializing the application we want to listen to some interesting
  *    events (emitted via websockets). Create a file called 'sockets.js'
  *    in the data folder. Export a function which takes a socket and a store
  *    (which has a dispatch function!) as arguments. This function is responsible
  *    for attaching listeners to the socket. When a event is received, we dispatch
  *    an action and update the state of our application. E.g., when we receive an
  *    event 'joinedChat', we add the current logged in user to our application state.
  *    The server will emit the 'joinedChat' event with { id, status, username },
  *    when the client is logged in.
  *    Listen to the 'joinedChat' event and dispatch two actions:
  *      - { data: { id, status, username }, type: LOGIN_SUCCESS }
  *      - @@router/LOCATION_CHANGE (use action create of react-router-redux)
  *    The second action is used to navigate to the chat page. Use an action creator
  *    of react-router-redux to navigate. react-router-redux will keep react-router
  *    in sync with our redux store.
  *    Enable the following line in the src/index.js file: sockets(socket, store).
  *    Fix the lint errors.
  * 5) Create a file data/reducer.js, and create a data reducer that listens to
  *    all kind of actions, but only prints the action to the console if the action
  *    is of type LOGIN_SUCCESS. Use an empty Immutable Map as initial state.
  *    Return a new state, where state.toJS().username = 'My username after i logged in',
  *    when the reducer receives an action of type LOGIN_SUCCESS.
  *    We already use a router reducer. Now add our data reducer to the combined
  *    reducer in src/index.js.
  *    Login and check your console. The state should be updated and should look
  *    like { data: { username: ... }, router: { ... } }. Note that we transform
  *    the Immutable datastructures to plain JavaScript before logging them to the
  *    console. This makes it easier to read.
  *
  * Tips:
  * How do I use react-redux connect? (see 2)
  *   https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
  * How can I dispatch an action to the store? (see 3)
  *   http://redux.js.org/docs/api/bindActionCreators.html
  * How do I receive events using Socket.io? (see 4)
  *   http://socket.io/docs/#sending-and-receiving-events
  * How do I navigate between pages using react-router-redux? (see 4)
  *   https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward
  * How do I create a reducer? (see 5)
  *   http://redux.js.org/docs/basics/Reducers.html
  * How does a combined reducer work? (see 5)
  *   http://redux.js.org/docs/api/combineReducers.html
  */
@connect(null, (dispatch) => ({
  submit: bindActionCreators(actions.submit, dispatch)
}))
export default class Login extends Component {

  static propTypes = {
    submit: PropTypes.func.isRequired
  };

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
    this.props.submit({ username: this.usernameInput.value });
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
