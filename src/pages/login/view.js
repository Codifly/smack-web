import React, { Component, PropTypes } from 'react';
import { submit } from './actions';

//styled-components
import styled from 'styled-components';
import { colors } from '../../constants/colors';

//mobx-react-form
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import { observer } from 'mobx-react';

const logo = require('./smackLogo.svg');

const fields = [{
  name: 'username',
  label: 'Username',
  type: 'text',
  placeholder: 'Your name',
  rules: 'required|string',
}];

const plugins = { dvr: validatorjs };

const hooks = {
  onSuccess(form) {
    submit(form.values());
    console.log(form.values());
  },
  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Error message');
  },
};

const form = new MobxReactForm({ fields }, { plugins, hooks });

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

@observer
export default class LoginForm extends Component {

  constructor (props) {
    super(props);
  }

  render () {

    return (
      <LoginDiv>
        <SmackForm onSubmit={form.onSubmit}>
          <LoginLogo src={logo} />
          <LoginInput {...form.$('username').bind()}/>
          <LoginButton type='submit'>Join</LoginButton>
        </SmackForm>
      </LoginDiv>
    );
  }
}