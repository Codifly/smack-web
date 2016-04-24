import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { reduxForm } from 'redux-form';
import { sendMessageStyle } from '../../../constants/styles';

@reduxForm({
  fields: [ 'message', 'userId' ],
  form: 'messageForm',
  // Get the form state. Because we are working with an Immutable state,
  // we need to tell redux-form how to extract the 'form' part of the state.
  // reduxMountPoint is by default = 'form'
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint)
})
@Radium
export default class SendMessage extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
    submitting: PropTypes.bool.isRequired
  };

  render () {
    const styles = sendMessageStyle;
    const { fields: { message }, handleSubmit, style, submitting } = this.props;

    return (
      <div style={style}>
        <form style={styles.container} onSubmit={handleSubmit}>
          <input {...message} autoComplete='off' placeholder='Write something...' style={styles.input} type='text' />
          <button disabled={submitting} style={styles.button} type='submit'>Send</button>
        </form>
      </div>
    );
  }
}
