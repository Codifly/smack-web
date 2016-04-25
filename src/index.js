import React from 'react';
import { IndexRedirect, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import createStore from './createStore';
// import sockets from './data/sockets';

// The reducers in our chat application.
import { combineReducers } from 'redux-immutablejs';
// import chatReducer from './pages/chat/reducer';
// import loginReducer from './pages/login/reducer';
// import dataReducer from './data/reducer';
// import { reducer as formReducer } from 'redux-form';
import { routerReducer as routerReducer, syncHistoryWithStore } from 'react-router-redux';

// The pages in our chat application.
import Chat from './pages/chat';
import Login from './pages/login';
import Wrapper from './app/view';

// import { login } from './data/actions';

const socketURL = 'http://localhost:9001';
const options = {
  transports: [ 'websocket' ],
  'force new connection': true
};

// Create a socket for communication via websockets.
const socket = io(socketURL, options);

/**
 * The application routes.
 */
const routes = (
  <Route component={Wrapper}>
    <Route path='/'>
      <IndexRedirect to='/login' />
    </Route>
    <Route component={Login} path='/login' />
    {/* Add /chat route */}
    <Route component={Chat} path='/chat' />
    <Route path='*'>
      <IndexRedirect to='/login' />
    </Route>
  </Route>
);

/**
 * The application's main reducer.
 */
const reducer = combineReducers({
  // chat: chatReducer,
  // data: dataReducer,
  // form: formReducer,
  // login: loginReducer,
  router: routerReducer
});

/**
 * Bootstrap the application. Performs all necessary initializations.
 */

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

// Create redux store
const store = createStore(socket, hashHistory, reducer);

// Attach listeners on the socket, and dispatch the events to the store.
// sockets(socket, store);

// When initializing the chat app, try to login with the username from local storage.
// if (localStorage.username) {
//   store.dispatch(login({ username: localStorage.username }));
// }

// Create an enhanced history that syncs navigation events with the store.
const browserHistory = syncHistoryWithStore(hashHistory, store, { selectLocationState: (state) => state.get('router') });

// Render application
ReactDOM.render(
  <Provider key='provider' store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root'));
