import React from 'react';
import { shallow } from 'enzyme';

import { ErrorBoundary } from './error-boundary.component';

describe('ErrorBoundary component', ()=>{
  let wrapper;
  let mockProps;

  beforeEach(()=>{

    wrapper = shallow(<ErrorBoundary />);
  })

  it('should render ErrorBoundary component', ()=>{
    expect(wrapper.debug()).toMatchSnapshot();
  })

  it('should display ErrorImageOverlay if there is an error', ()=>{
    wrapper.setState({ hasErrored: true })
    expect(wrapper.find('ErrorImageOverlay').exists()).toBe(true);
  });

});