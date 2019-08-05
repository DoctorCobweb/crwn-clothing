import React from 'react';
import { shallow } from 'enzyme';

import { CollectionsOverview } from './collections-overview.component';

describe('CollectionsOverview component', () => {
  let wrapper;
  let mockProps;

  beforeEach(()=> {
    mockProps = {
      collections: [
        {
          id: 0,
        },
        {
          id: 1,
        },
        {
          id: 2,
        }
      ]
    };
    wrapper = shallow(<CollectionsOverview {...mockProps} />)
  });

  it('should render CollectionsOverviewContainer componnet', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render all the CollectionPreview components', () => {
    expect(wrapper.find('CollectionsOverviewContainer').children().length).toBe(mockProps.collections.length)
  });

});