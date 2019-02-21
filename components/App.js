import React, { Component } from 'react';
import styled from 'styled-components';

import { createGlobalStyle } from "styled-components";
import SearchContainer from './search/searchContainer';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  width: 100vw;
  position: relative;
`;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
          <GlobalStyle />
          <SearchContainer />
        </Container>
    );
  }
}

export default App;
