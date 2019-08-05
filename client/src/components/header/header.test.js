import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './header.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


describe('Header component', () => {
  let wrapper;
  let mockCurrentUser;
  let mockSignOutStart;
  let mockHidden;

  beforeEach(() => {
    mockSignOutStart = jest.fn();
    mockHidden = true;
    mockCurrentUser = {
      uid: '123',
    };

    const mockProps = {
      currentUser: mockCurrentUser,
      signOutStart: mockSignOutStart,
      hidden: mockHidden,
    }

    wrapper = shallow(<Header {...mockProps}/>);
  });

  it('should render Header component', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  describe('if currentUser is present', () => {
    it('should render sign out link', () => {
      expect(wrapper.find('OptionLink').at(2).text()).toBe('SIGN OUT');
    });

    it('should call signOutStart when SIGN OUT link is clicked', () => {
      wrapper.find('OptionLink').at(2).simulate('click');
      expect(mockSignOutStart).toHaveBeenCalled();
    });
  })

  describe('if currentUser is null', () => {
    it('should render sign in link', () => {
      const newMockProps = {
        currentUser: null,
        signOutStart: mockSignOutStart,
        hidden: true,
      };
      const newWrapper = shallow(<Header {...newMockProps}/>);
      expect(newWrapper.find('OptionLink').at(2).text()).toBe('SIGN IN');
    });
  });

  describe('if hidden is true', () => {
    it('should not render CartDropdown', () => {
      expect(wrapper.exists(CartDropdown)).toBe(false);
    });
  });

  describe('if hidden is false', () => {
      const newMockProps = {
        currentUser: null,
        signOutStart: mockSignOutStart,
        hidden: false,
      };
      const newWrapper = shallow(<Header {...newMockProps}/>)
    it('should render CartDropdown', () => {
      expect(newWrapper.exists(CartDropdown)).toBe(true);
    });
  });
});