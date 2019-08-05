import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from './sign-up.component';
import FormInput from '../form-input/form-input.component';

describe('SignUp component', () => {
  let wrapper;
  let mockSignUpStart;
  const mockDisplayName = 'Blah';
  const mockEmail = 'blah@blah.com';
  const mockPassword = '1234';
  const mockPasswordConfirm = '1234';


  beforeEach(() => {
    mockSignUpStart = jest.fn(userCredentials => console.log(userCredentials));

    const mockProps = {
      signUpStart: mockSignUpStart,
    }

    wrapper = shallow(<SignUp {...mockProps} />);
  });

  it('should render SignUp correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });


  it('should correctly set form inputs, via setState hook', () => {
    wrapper.find(FormInput).at(0).prop('onChange')({
      target: {
        value: mockDisplayName,
        name: 'displayName',
      }
    });
    wrapper.find(FormInput).at(1).prop('onChange')({
      target: {
        value: mockEmail,
        name: 'email',
      }
    });
    wrapper.find(FormInput).at(2).prop('onChange')({
      target: {
        value: mockPassword,
        name: 'password',
      }
    });
    wrapper.find(FormInput).at(3).prop('onChange')({
      target: {
        value: mockPasswordConfirm,
        name: 'confirmPassword',
      }
    });

    // make a fake event
    const fakeEvent = { preventDefault: () => {} };

    // submit the email sign in form
    wrapper.find('SignUpContainer').childAt(2).simulate('submit', fakeEvent);
    expect(mockSignUpStart).toHaveBeenCalled();
    expect(mockSignUpStart).toHaveBeenCalledWith({
      displayName: mockDisplayName,
      email: mockEmail,
      password: mockPassword,
    });
  });
});