import React from 'react';
import { mount } from 'enzyme';
import SearchContainer from '../searchContainer';
import { getGithubRepo } from '../../../utils/apis';
import searchResult from '../../../testUtils/fakeSearchResult.json';

import 'jest-enzyme';
import 'jest-styled-components';
import 'babel-polyfill';

jest.mock('../../../utils/apis', () => ({
  getGithubRepo: jest.fn(() => Promise.resolve()),
}));

describe('SearchContainer', () => {
  let makeSubject, genSearchPattern;
  beforeEach(() => {
    jest.resetModules();
    makeSubject = () => mount(<SearchContainer />);
    genSearchPattern = (pattern) => pattern;
  });

  it('SearchContainer render', () => {
    const subject = makeSubject();
    expect(subject.find('input')).toBeDefined();
    expect(subject.find('button')).toBeDefined();
  });

  it('SearchContainer search init', () => {
    const subject = makeSubject();
    const searchPattern = 'line';
    expect(subject.find('input').getDOMNode().value).toEqual('');
    subject.find('input').simulate('change', { target: { value: searchPattern } });
    expect(subject.find('input').getDOMNode().value).toEqual(genSearchPattern(searchPattern));
  });

  it('Search Button Click', () => {
    const subject = makeSubject();
    const searchPattern = 'line';
    subject.find('input').simulate('change', { target: { value: searchPattern } });
    subject.find('button').simulate('click');
    expect(subject.state().page).toEqual(1);
    expect(subject.state().isButtonDisabled).toEqual(false);
  });

  it.only('SearchContainer loadData', async () => {
    getGithubRepo.mockReturnValueOnce(Promise.resolve(searchResult));
    const subject = makeSubject();
    await subject.instance().loadData();

    expect(subject.state().page).toEqual(1);
  });

  it('Search handleScroll Function', async () => {
    const subject = makeSubject();
    subject.instance().handleScroll();
    expect(subject.state().page).toEqual(1);
  });
});
