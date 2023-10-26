import { Container, HeaderWrapper } from '../style/global.ts';
import Header from '../components/Header.tsx';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Search = () => {
  const {searchValue} = useParams()

  console.log(searchValue)

  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <SearchValueContainer>
      </SearchValueContainer>
    </Container>
  );
};

const SearchValueContainer = styled.div`
`;

export default Search;