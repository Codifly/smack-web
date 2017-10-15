import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import styled from 'styled-components';
import { colors } from '../../../constants/colors';

const SendMessageDiv = styled.div`
  background-color: ${colors.lightGrey};
  border-top: 1px solid ${colors.grey};
  bottom: 0;
  height: 80px;
  left: 280px;
  padding: 20px;
  position: absolute;
  right: 0;
`;

const SendMessageForm = styled.form`
  display: flex;
  font-size: 16px;
`;

const SendMessageInput = styled.input`
  border-radius: 6px;
  color: ${colors.darkGrey};
  width: 100%;
  height: 40px;
  display: inline-block;
  padding: 10px 70px 10px 18px;
`;

const SendMessageButton = styled.button`
  color: ${colors.darkPurple};
  height: 40px;
  margin-left: -70px;
  padding: 0 16px 0 16px;
  position: absolute;
`;

@reduxForm({
  fields: [ 'message', 'userId' ],
  form: 'messageForm',
  // Get the form state. Because we are working with an Immutable state,
  // we need to tell redux-form how to extract the 'form' part of the state.
  // reduxMountPoint is by default = 'form'
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint)
})
export default class SendMessage extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
    submitting: PropTypes.bool.isRequired
  };

  render () {
    const { fields: { message }, handleSubmit, style, submitting } = this.props;

    return (
      <SendMessageDiv>
        <SendMessageForm onSubmit={handleSubmit}>
          <SendMessageInput {...message} autoComplete='off' placeholder='Write something...' type='text' />
          <SendMessageButton disabled={submitting} type='submit'>Send</SendMessageButton>
        </SendMessageForm>
      </SendMessageDiv>
    );
  }
}
