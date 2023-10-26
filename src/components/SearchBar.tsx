import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  return (
    <StyledSearchBar>
      <button onClick={() => setIsOpen(true)}>
        <IoSearch />
      </button>

      <SearchBarContainer $isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <form className={'input-container'} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
          <IoSearch className={'search'} />
          <input type={'text'} placeholder={'Search something...'}
                 onChange={e => setSearchValue(e.target.value)} value={searchValue} />
        </form>
      </SearchBarContainer>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  & > button {
    background: none;
    height: 40px;
    cursor: pointer;
    border: none;

    & > svg {
      font-size: 1.5rem;
      margin-bottom: -0.2rem;
      color: #0000008A;
    }
  }
`;

const SearchBarContainer = styled.div<{ $isOpen: boolean; }>`
  position: absolute;
  z-index: 12;
  transition: all .3s;
  background-color: rgba(0, 0, 0, .2);
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;

  & > .input-container {
    margin: 110px auto auto;
    width: 42rem;
    height: 4.5rem;
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0 50px 100px -12px;

    & > svg {
      font-size: 35px;
      margin-left: 1.5rem;
      color: #FAE13E;
    }

    & > input {
      margin-left: 1rem;
      width: calc(100% - 5rem);
      margin-right: 1.5rem;
      height: 90%;
      font-size: 25px;
      border: none;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #ddd;
      }
    }
  }
`;

export default SearchBar;