import React from 'react';
import { shallow } from 'enzyme';

import { CollectionPage } from './collection.component';

describe('CollectionPage component', () => {
  let wrapper;
  let mockTitle;
  let mockItems;

  beforeEach(() => {
    mockTitle = 'BlahTitle';
    mockItems = [{id:0},{id:1},{id:2},{id:3},{id:4}];
    const mockProps = {
      collection: {
        title: mockTitle,
        items: mockItems,
      }
    }
    wrapper = shallow(<CollectionPage {...mockProps} />);
  });

  it('should render CollectionPage', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render all the collection items', () => {
    expect(wrapper.find('CollectionItemsContainer').children().length).toBe(mockItems.length);
  });

  it('should render collection title properly', () => {
    expect(wrapper.find('CollectionTitle').text()).toBe(mockTitle.toUpperCase());
  });

});