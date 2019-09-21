import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import CodeFlask from 'codeflask';
import { tokenize, parse, interpret, compile } from './arith/arith';

const StyledInteract = styled.div`
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  width: 662px;
  
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Header = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid var(--color-gray-light);
  font-size: 1.1rem;
  color: var(--color-blue);
`;

const StyledExpr = styled.div`
  width: 50%;
  height: 400px;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  border-radius: 0.8rem;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 250px;
  }
`;

const StyledDisplay = styled.div`
  width: 42.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 300px;
  }
`;

const StyledShow = styled.div`
  width: 100%;
  height: 48%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  border-radius: 0.8rem;
`;

const StyledEditor = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || "80%"};
`;

const Button = styled.button`
  cursor: pointer;
  font-weight: bold;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid var(--color-blue);
  color: var(--color-blue);
  border-radius: 3px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Editor = ({ id, height }) => {
  return (
    <StyledEditor id={id} height={height} >
    </StyledEditor>
  );
}


const Interact = () => {
  const exprEl = useRef(null);
  const evalEl = useRef(null);
  const compEl = useRef(null);

  const [hasEditors, setHasEditors] = useState(false);

  useEffect(() => {
    if (!hasEditors) { 

      exprEl.current = new CodeFlask('#expr', { 
        language: 'js' 
      });
      exprEl.current.addLanguage('arithjs', {
        'number': /[0-9]+/,
        'operator': /[*-+/]/,
        'punctuation': /[()]/
      });
      exprEl.current.updateLanguage('arithjs');


      evalEl.current = new CodeFlask('#eval', { 
        language: 'js', 
        readonly: true
      });


      compEl.current = new CodeFlask('#comp', { 
        language: 'js', 
        readonly: true
      });

      setHasEditors(true);
    }

  }, [hasEditors]);

  const runClick = () => {
    const code = exprEl.current.getCode().trim();
    if (!code) return;
    const parsedCode = parse(tokenize(code));
    evalEl.current.updateCode(`${interpret(parsedCode)}`);  // converts to a string
    compEl.current.updateCode(compile(parsedCode));
  }


  return (
    <StyledInteract>

      <StyledExpr>
        <Header> an arith-js expression </Header>
        <Editor id="expr" height="70%" />
        <Button onClick={runClick}>RUN</Button>
      </StyledExpr>

      <StyledDisplay>
        <StyledShow>
          <Header> evaluated value </Header>
          <Editor id="eval"  />
        </StyledShow>
        
        <StyledShow>
          <Header> compiled js expression </Header>
          <Editor id="comp"  />
        </StyledShow>
      </StyledDisplay>

    </StyledInteract>
  );
};

export default Interact;