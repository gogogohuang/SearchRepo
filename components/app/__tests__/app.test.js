import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import 'jest-enzyme';
import 'jest-styled-components';
import 'babel-polyfill';

describe('App', () => {
  let makeSubject;

  beforeEach(() => {
    jest.resetModules();
    makeSubject = () => shallow(<App />)
  })
  it('should render as snapshot', () => {
    const subject = makeSubject();
    expect(subject.debug()).toMatchSnapshot();
  });
})
