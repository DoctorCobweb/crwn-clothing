import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SweetAlert from 'sweetalert2-react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  signUpStart
} from '../../redux/user/user.actions';

import { selectUserError } from '../../redux/user/user.selector';

import {
  SignUpContainer,
  SignUpTitle 
} from './sign-up.styles.jsx';

const SignUp = (props) => {
  const { signUpStart } = props
  const [ userCredentials, setUserCredentials ] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  });

  const { displayName, email, password, confirmPassword, error } = userCredentials;


  // here is how useEffect can be made to work like componentWillReceiveProps lifecycle method.
  // but here we're specifically only listening for the userError prop which get sets
  // when theres an error during signup process
  useEffect(() => {
    if (props.userError) {
      setUserCredentials({ ...userCredentials, error: props.userError.message });
    }
  }, [props.userError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart({ displayName, email, password })
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
        {
          error ? (
            <SweetAlert
              show={error}
              type="warning"
              title="Error"
              text={error}
              onConfirm={() => setUserCredentials({ ...userCredentials, error: ''})}
            />
          ) : (
            null
          )
        }
      </form>
    </SignUpContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  userError: selectUserError,
})

const mapDispatchToProps = dispatch => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);