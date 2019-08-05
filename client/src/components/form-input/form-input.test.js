import React from 'react';
import { shallow } from 'enzyme';

import { FormInput } from './form-input.component';

describe('FormInput component', ()=>{
  let wrapper;
  let mockProps;
  let mockHandleChange;

  beforeEach(()=>{
    mockHandleChange = jest.fn();
    mockProps = {
      handleChange: mockHandleChange,
      label: 'email',
      value: 'test@gmail.com',
    }
    wrapper = shallow(<FormInput {...mockProps} />);
  })

  it('should render FormInput', ()=> {
    expect(wrapper.debug()).toMatchSnapshot();
  })

  it('should call handleChange when input changes', ()=>{
    wrapper.find('FormInputContainer').simulate('change');
    expect(mockProps.handleChange).toHaveBeenCalled();
  });

  it('should render FormInputLabel component for non-null label prop val', ()=>{
    // this is shorthand for the below commented-out line
    expect(wrapper.exists('FormInputLabel')).toBe(true);
    // expect(wrapper.find('FormInputLabel').exists()).toBe(true);
  });

  it('should not render FormInputLabel component if there is no label', ()=>{
    const newMockProps = {
      handleChange: mockHandleChange,
      label: '',
      value: 'test@gmail.com',
    };
    const newWrapper = shallow(<FormInput {...newMockProps} />);
    expect(newWrapper.exists('FormInputLabel')).toBe(false);
  });
})