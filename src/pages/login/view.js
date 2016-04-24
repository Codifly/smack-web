import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { submit } from './actions';
import { loginStyle } from '../../constants/styles';

const logo = require('./smackLogo.svg');

@reduxForm({
  form: 'login',
  fields: [ 'username' ],
    // Get the form state. // TODO: fix this bug
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint)
})
export default class LoginForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
    this.submit = ::this.submit;
  }

  submit (values, dispatch) {
    dispatch(submit(values));
  }

  render () {
    const styles = loginStyle;
    const { fields: { username }, handleSubmit, submitting } = this.props;

    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit(this.submit)}>
          <img src={logo} style={styles.logo} />
          <input {...username} autoComplete='off' placeholder='Your name' style={styles.input} type='text' />
          <button disabled={submitting} style={styles.button} type='submit'>Join</button>
        </form>
      </div>
    );
  }
}
