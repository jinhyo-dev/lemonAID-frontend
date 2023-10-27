import { Container, HeaderWrapper } from '../style/global.ts';
import Header from '../components/Header.tsx';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AuthProps } from '../interface/AuthProps.ts';
import React from 'react';

const Search: React.FC<AuthProps> = ({ authorized }) => {
  const { searchValue } = useParams();

  console.log(searchValue);

  return (
    <Container>
      <HeaderWrapper>
        <Header authorized={authorized} />
      </HeaderWrapper>

      <SearchValueContainer>
      </SearchValueContainer>
    </Container>
  );
};

const SearchValueContainer = styled.div`
`;

export default Search;