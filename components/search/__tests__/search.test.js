import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchResult from '../searchResult';
import SearchContainer from '../searchContainer';
import 'jest-enzyme';
import 'jest-styled-components';
import 'babel-polyfill';

describe('SearchContainer', () => {

  const searchContainer = mount(<SearchContainer />);
  const searchPattern = 'LineBot';
  const _textField = searchContainer.find('input');
  const _searchButton = searchContainer.find('button');


  it('SearchContainer render', () => {
    expect(_textField).toBeDefined();
    expect(_searchButton).toBeDefined();
  });

  it('SearchContainer search init', () => {
    expect(_textField.getDOMNode().value).toEqual('');
    _textField.simulate('change', { target: { value: searchPattern } });
    expect(_textField.getDOMNode().value).toEqual(searchPattern);
  });

  it('Search Button Click', async () => {
    _textField.simulate('change', { target: { value: searchPattern } });
    _searchButton.simulate('click');
    expect(searchContainer.state().page).toEqual(1);
    expect(searchContainer.state().isButtonDisabled).toEqual(false);
  });

  it('Search Button Click', async () => {
    _textField.simulate('change', { target: { value: searchPattern } });
    _searchButton.simulate('click');
    expect(searchContainer.state().page).toEqual(1);
    expect(searchContainer.state().isButtonDisabled).toEqual(false);
  });

  it('Search handleScroll Function', () => {
    searchContainer.instance().handleScroll();
    expect(searchContainer.state().page).toEqual(2);
  });
});

describe('SearchResult', () => {
  it('SearchResult renders nothin', () => {
    const parentState = {
      searchPattern: ''
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('div').text()).toEqual('')
  });
  it('SearchResult renders tips', () => {
    const parentState = {
      searchPattern: 'Line'
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('div').text()).toEqual('Searching...');
  });
  it('SearchResult renders Nothin', () => {
    const parentState = {
      searchPattern: 'Line',
      total_count: 2,
      items: [
        { id: 1, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } },
        { id: 2, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } }
      ],
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('h3').text()).toEqual('Nothin');
  });
  it('SearchResult renders More...', () => {
    const parentState = {
      searchPattern: 'Line',
      total_count: 5,
      items: [
        { id: 1, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } },
        { id: 2, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } }
      ],
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('h3').text()).toEqual('More...');
  });
})

