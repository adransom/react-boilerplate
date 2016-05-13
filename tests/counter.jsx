import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Counter from 'scripts/components/counter';

describe('<Counter />', () => {
  let wrapper;

  beforeEach(() =>  {
    wrapper = shallow(<Counter />);
  });

  describe('counter', () => {
    it('sets initial counter to 0', () => {
      expect(wrapper.state('counter')).to.equal(0);
    });

    it('increases counter state when button clicked', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.state('counter')).to.equal(1);

      wrapper.find('button').simulate('click');
      expect(wrapper.state('counter')).to.equal(2);
    });
  });

  describe('emotion', () => {
    it('sets initial emotion to :(', () => {
      expect(wrapper.state('emotion')).to.equal(':(');
    });

    it('sets :) emotion when counter is > 0', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.state('emotion')).to.equal(':)');
    });

    it('sets :D emotion when counter is > 9', () => {
      wrapper.setState({ counter: 9 });
      wrapper.find('button').simulate('click');
      expect(wrapper.state('emotion')).to.equal(':D');
    });
  });

});
