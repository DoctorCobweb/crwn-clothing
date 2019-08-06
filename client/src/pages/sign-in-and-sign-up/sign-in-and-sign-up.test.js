import React from 'react';
import { shallow } from 'enzyme';

import { SignInAndSignUpPage } from './sign-in-and-sign-up.component';

describe('SignInAndSignUpPage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignInAndSignUpPage />);
  })

  it('should render component', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  })
});