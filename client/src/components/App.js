import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import Main from './Main';

const Header = styled.header`
  margin-bottom: 2rem;

  ${breakpoint('tablet')`
    margin-bottom: 4rem;
  `};
`;

const Footer = styled.footer`
  margin-top: 2rem;
  text-align: right;

  ${breakpoint('tablet')`
    margin-top: 4rem;
  `};
`;

const Title = styled.h1`
  margin-bottom: 0.5em;
`;

const Subtitle = styled.h2``;

const Wrap = styled.div`
  padding: 2.5rem 2rem;
  max-width: 120rem;
  margin: 0 auto;

  ${breakpoint('tablet')`
    padding: 4rem 2rem;
  `};

  ${breakpoint('desktop')`
    padding: 5rem;
  `};
`;

class App extends React.Component {
  render() {
    return (
      <Wrap>
        <Header>
          <Title>Lightpost</Title>
          <Subtitle>A tiny employee directory for Postlight.</Subtitle>
        </Header>
        <Main />
        <Footer>
          <h3>Made by Preston Richey</h3>
        </Footer>
      </Wrap>
    );
  }
}

export default App;
