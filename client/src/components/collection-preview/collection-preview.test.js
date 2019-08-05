import React from 'react';
import { shallow } from 'enzyme';

import { CollectionPreview } from './collection-preview.component';

describe('CollectionPreview componnet testing', ()=>{
  let wrapper;
  let mockHistory;
  const mockTitle = 'blah';
  const mockItems = [{id:0}, {id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}];
  const mockMatch = { path: 'mockPath' };
  const mockRouteName = 'mockRouteName';

  beforeEach(()=>{
    mockHistory = {
      push: jest.fn(),
    }
    const mockProps = {
      title: mockTitle,
      items: mockItems,
      match: mockMatch,
      history: mockHistory,
      routeName: mockRouteName,
    };
    wrapper = shallow(<CollectionPreview {...mockProps }/>);
  });

  it('component should snapshot should match', ()=>{
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('when clicking title container, correctly navigate to collection route', () => {
    wrapper.find('TitleContainer').simulate('click');
    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.path}/${mockRouteName}`);
  });

  it('TitleContainer text should be set and uppercased', () => {
    const titleText = wrapper.find('TitleContainer').text();
    expect(titleText).toBe(mockTitle.toUpperCase());
  });

  it('PreviewContainer should limit to 4 items to preview', () => {
    expect(wrapper.find('PreviewContainer').children().length).toBe(4);
  });

})