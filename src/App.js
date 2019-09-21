import React from 'react';
import styled from 'styled-components';

import Interact from './Interact';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  color: var(--color-blue);
  font-size: 4rem;
  font-weight: bold;
  margin: 2em auto;

  @media screen and (max-width: 600px) {
    margin: 1em auto;
  }
`;

function App() {
  return (
    <StyledApp>
      <Header> ARITH-JS </Header>
      <Interact /> 
    </StyledApp>
  );
}

export default App;
