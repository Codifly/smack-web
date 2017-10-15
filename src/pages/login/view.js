import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { submit } from './actions';
//loginstyle
import styled from 'styled-components';
import { colors } from '../../constants/colors';

const logo = require('./smackLogo.svg');

const LoginDiv = styled.div`
align-items: center;
background-color: ${colors.darkPurple};
display: flex;
height: 100%;
justify-content: center;
position: absolute;
width: 100%;
`;

const SmackForm = styled.form`
height: 250px;
width: 212px;
`;

const LoginLogo = styled.img`
margin-bottom: 29px;
`;

const LoginInput = styled.input`
background-color: ${colors.white};
border: solid 1px ${colors.grey};
border-radius: 6px;
box-shadow: inset 0 1px 3px 0 ${colors.lightGrey};
color: ${colors.silver};
font-family: 'Rubik-Italic';
font-size: 16px;
height: 40px;
margin-bottom: 11px;
text-align: center;
width: 212px;
`;

const LoginButton = styled.button`
background-color: ${colors.darkPurple};
border: solid 1px ${colors.lightGrey};
border-radius: 6px;
color: ${colors.white};
font-family: 'Rubik-Light';
height: 40px;
width: 212px;
`;

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
    const { fields: { username }, handleSubmit, submitting } = this.props;

    return (
      <LoginDiv>
        <SmackForm onSubmit={handleSubmit(this.submit)}>
          <LoginLogo src={logo} />
          <LoginInput {...username} autoComplete='off' placeholder='Your name' type='text' />
          <LoginButton disabled={submitting} type='submit'>Join</LoginButton>
        </SmackForm>
      </LoginDiv>
    );
  }
}