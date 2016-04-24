import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

/**
  * Middleware used for communication via websockets.
  */
function remoteActionMiddleware (socket) {
  return (store) => (next) => (action) => {
    if (action.meta && action.meta.remote) {
      socket.emit(action.event, action.data);
    }
    return next(action);
  };
}

/**
 * Creates a Redux store that holds the complete state tree of this app.
 * @param {object} theHistory The history used during redux store synchronization.
 * @param {function(state, action: object)} reducers A reducing function that
 * returns the next state tree, given the current state tree and an action to handle.
 * @param [initialState] The initial state tree of this app.
 * @return A redux store.
 */
export default function (socket, theHistory, reducers, initialState) {
  const middleware = [];
  // Install react-router-redux's router middleware
  middleware.push(routerMiddleware(theHistory));
  // Install thunk middleware
  middleware.push(thunkMiddleware);
  // Install remote action middleware, for communication via websockets.
  middleware.push(remoteActionMiddleware(socket));
  // Install logging middleware when not in production
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
      // Collapse by default to preserve space in the console
      collapsed: true,
      // Convert Immutable state to plain JavaScript object, before logging.
      stateTransformer: (state) => state.toJS()
    }));
  }

  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  return newCreateStore(reducers, initialState);
}
