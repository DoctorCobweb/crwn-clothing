import React from 'react';
import { shallow } from 'enzyme';

import { CustomButton } from './custom-button.component';

describe('CustomButton component', () => {
  it('should render CustomButton', () => {
    expect(shallow(<CustomButton />).debug()).toMatchSnapshot();
  });
});