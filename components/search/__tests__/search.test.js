import React from 'react';
import { mount } from 'enzyme';
import SearchResult from '../searchResult';
import 'jest-enzyme';
import 'jest-styled-components';
import 'babel-polyfill';

describe('Search', () => {
  describe('SnapShop', ()=>{
    let makeSubject;

    beforeEach(() => {
      jest.resetModules();
      makeSubject = parentState => {
        const props = {
          ...parentState,
        };
        return mount(<SearchResult {...props} />);
      };
    })

    it('should render as snapshot', () => {
      const subject = makeSubject({
        parentState: {
          items: [
            { id: 1, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } },
            { id: 2, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } }
          ],
        }
      });
      expect(subject.debug()).toMatchSnapshot();
    });
  });

  describe('Render Behavior', () => {
    let makeSubject;

    beforeEach(() => {
      jest.resetModules();
      makeSubject = parentState => {
        const props = {
          ...parentState,
        };
        return mount(<SearchResult {...props} />);
      };
    });
    it('should render string', () => {
      const subject = makeSubject({
        parentState: {
          items: [],
        }
      });
      expect(subject.find('div').text()).toEqual('Searching...');
    });
    it('should render more', () => {
      const subject = makeSubject({
        parentState: {
          items: [
            { id: 1, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } },
            { id: 2, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } }
          ],
          total_count: 10
        }
      });
      expect(subject.find('h3').text()).toEqual('More...');
    });
    it('should render Nothin', () => {
      const subject = makeSubject({
        parentState: {
          items: [
            { id: 1, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } },
            { id: 2, owner: { avatar_url: 'https://c1.staticflickr.com/5/4865/45542182465_b4e6ba4ed5_m.jpg' } }
          ],
          total_count: 2
        }
      });
      expect(subject.find('h3').text()).toEqual('Nothin');
    });

  });
})
