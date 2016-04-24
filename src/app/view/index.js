import React, { Component, PropTypes } from 'react';

// Require application-global stylesheets
require('./reset.css');
require('./fonts.css');
require('./global.css');

/**
 * Wrapper component, containing the DOM tree of the entire application.
 */
class Application extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div style={{ fontFamily: 'Rubik-Regular', position: 'fixed', width: '100%', height: '100%' }}>
        {this.props.children}
      </div>
    );
  }

}

export default Application;
