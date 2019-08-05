import React from 'react';
import { shallow } from 'enzyme';

import { Directory } from './directory.component';

describe('Directory component', () => {
  let wrapper;
  let mockProps;

  beforeEach(()=>{
    mockProps = {
      sections: [{id:0}, {id:1}, {id:2}, {id:3}]
    }
    wrapper = shallow(<Directory {...mockProps} />);
  })

  it('should render Directory component', ()=>{
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render all the sections', ()=>{
    expect(wrapper.find('DirectoryMenuContainer').children().length).toBe(mockProps.sections.length);
  })
});