import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchResult from '../searchResult';
import SearchContainer from '../searchContainer';
import 'jest-enzyme';
import 'jest-styled-components';

describe('SearchContainer', ()=> {
  it('SearchContainer search init', ()=> {
    const searchContainer = mount(<SearchContainer />)
    const _textField = searchContainer.find('input');
    expect(_textField.getDOMNode().value).toEqual('');
    _textField.find('input').simulate('change', {target: {value: 'My new value'}});
    expect(_textField.getDOMNode().value).toEqual('My new value');
  });
});

describe('SearchResult', () => {
  it('SearchResult renders nothin', () => {
    const parentState = {
      searchPattern: ''
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('div').text()).toEqual('')
  })
})

describe('SearchResult', () => {
  it('SearchResult renders tips', () => {
    const parentState = {
      searchPattern: 'Line'
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('div').text()).toEqual('Searching...');
  })
})

describe('SearchResult', () => {
  it('SearchResult renders Nothin', () => {
    const parentState = {
      searchPattern: 'Line',
      total_count: 2,
      items: [
        {id: 1, owner: {avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg'}},
        {id: 2, owner: {avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg'}}
      ],
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('h3').text()).toEqual('Nothin');
  })
})

describe('SearchResult', () => {
  it('SearchResult renders More...', () => {
    const parentState = {
      searchPattern: 'Line',
      total_count: 5,
      items: [
        {id: 1, owner: {avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg'}},
        {id: 2, owner: {avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg'}}
      ],
    }
    const searchResult = mount(<SearchResult parentState={parentState} />)
    expect(searchResult.find('h3').text()).toEqual('More...');
  })
})
