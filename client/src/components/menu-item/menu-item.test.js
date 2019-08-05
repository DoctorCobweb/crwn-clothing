import React from 'react';
import { shallow } from 'enzyme';

import { MenuItem } from './menu-item.component';

describe('MenuItem component', () => {
  let wrapper;
  let mockProps;
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    mockProps = {
      title: 'mockTitle',
      imageUrl: 'https://example.com/image1',
      size: 'mockSize',
      linkUrl: 'mockLinkUrl',
      match: {
        url: 'https://exmaple.com/',
      },
      history: {
        push: mockPush,
      },
    };

    wrapper = shallow(<MenuItem {...mockProps} />);
  });

  it('should render component', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should correctly call history.push() when MenuItemContainer is clicked', () => {
    wrapper.find('MenuItemContainer').simulate('click');
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(`${mockProps.match.url}${mockProps.linkUrl}`);
  });

  it('should have correctly set imageUrl prop on BackgroundImageContainer', () => {
    expect(wrapper.find('BackgroundImageContainer').prop('imageUrl')).toBe(mockProps.imageUrl);
  });

  it('should pass size to MenuItemContainer as the prop size', () => {
    expect(wrapper.find('MenuItemContainer').prop('size')).toBe(mockProps.size);
  });

  it('should correctly set ContentTitle text', () => {
    expect(wrapper.find('ContentTitle').text()).toBe(mockProps.title.toUpperCase());
  });

  it('should correct set ContentSubtitle text', () => {
    expect(wrapper.find('ContentSubtitle').text()).toBe('SHOP NOW');
  });
});