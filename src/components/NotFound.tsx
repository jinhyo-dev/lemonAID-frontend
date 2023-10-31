import { Container, HeaderWrapper } from '../style/global.ts';
import Header from './Header.tsx';
import { AuthProps } from '../interface/AuthProps.ts';
import React from 'react';
import styled from 'styled-components';
import Image from '../assets/images/logo/Lemonaid-3.png'

const NotFound: React.FC<AuthProps> = ({ authorized, permission }) => {
  return (
    <Container>
      <HeaderWrapper>
        <Header authorized={authorized} permission={permission} />
      </HeaderWrapper>

      <NotFoundContainer>
        <div>
          <img src={Image} alt={'Not Found'}/>
          <div>404 Not Found</div>
        </div>

      </NotFoundContainer>
    </Container>
  );
};

const NotFoundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > div {
    width: auto;
    height: auto;
    text-align: center;
    
    & > img {
      width: 18rem;
    }
    
    & > div {
      font-size: 4.5rem;
      margin-top: 4rem;
      font-family: 'Tenada', cursive;
      color: #FAE13E;
    }
  }
`

export default NotFound;