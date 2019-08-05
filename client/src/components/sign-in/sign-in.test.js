import React from 'react';
import { shallow } from 'enzyme';

import { SignIn } from './sign-in.component';
import { CustomButton } from '../custom-button/custom-button.component'; 
import FormInput from '../form-input/form-input.component';

describe('SignIn component', () => {
  let wrapper;
  let emailSignInStart;
  let googleSignInStart;
  let mockEmail;
  let mockPassword;

  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, 'useState');
  // useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    mockEmail = 'mock@mock.com';
    mockPassword = '1234';
    emailSignInStart = jest.fn();
    googleSignInStart = jest.fn();

    const mockProps = {
      emailSignInStart,
      googleSignInStart,
    };

    wrapper = shallow(<SignIn {...mockProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SignIn component', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call googleSignInStart when submit button clicked', () => {
    wrapper.find(CustomButton).at(1).simulate('click');
    expect(googleSignInStart).toHaveBeenCalled();
  });

  it('should set email value, via setState hook', () => {
    wrapper.find(FormInput).at(0).prop('handleChange')({
      target: {
        value: mockEmail,
        name: 'email',
      }
    });
    expect(wrapper.find(FormInput).at(0).prop('value')).toEqual(mockEmail);
  });

  it('should set password value, via setState hook', () => {
    wrapper.find(FormInput).at(1).prop('handleChange')({
      target: {
        value: mockPassword,
        name: 'password',
      }
    });
    expect(wrapper.find(FormInput).at(1).prop('value')).toEqual(mockPassword);
  });

  it('should call emailSignInStart when submit button clicked', () => {

    // set the value of email form input to mockEmail
    wrapper.find(FormInput).at(0).prop('handleChange')({
      target: {
        value: mockEmail,
        name: 'email',
      }
    });
    
    // set the value of password form input to mockPassword 
    wrapper.find(FormInput).at(1).prop('handleChange')({
      target: {
        value: mockPassword,
        name: 'password',
      }
    });

    // make a fake event
    const fakeEvent = { preventDefault: () => {} };

    // submit the email sign in form
    wrapper.find('SignInContainer').childAt(2).simulate('submit', fakeEvent);
    expect(emailSignInStart).toHaveBeenCalledWith(mockEmail, mockPassword);
  });

});