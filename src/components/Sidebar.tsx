import styled from 'styled-components';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsCalendarEvent } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

interface Props {
  $isOpen: boolean;
  $isClicked: boolean;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <StyledSidebar>
      {isOpen ? <AiOutlineClose onClick={() => setIsOpen(!isOpen)} /> :
        <AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />}

      <SidebarContainer $isOpen={isOpen} $isClicked={isClicked}>
        <form className={'search-bar'}>
          <input type={'text'} />
          <AiOutlineSearch />
        </form>

        <div className={'icon-container'}>
          <BsCalendarEvent className={'calendar'} />
          <FaUser className={'profile'} />
        </div>

        <div className={'text-container'}>
          <div onClick={() => setIsClicked(!isClicked)}>Recruitment</div>
          {
            // isClicked &&
            <div className={'clicked-nav'}>
              <div>Job Posts</div>
              <div>Resume</div>
            </div>
          }
          <div>Tours</div>
          <div>Parties & Events</div>
          <div>Community</div>
        </div>
      </SidebarContainer>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  & > svg {
    margin-left: 1rem;
    border: none;
    margin-bottom: -1.4rem;
    font-size: 35px;
  }
`;

const SidebarContainer = styled.div<Props>`
  position: absolute;
  z-index: 1;
  transition: all .5s;
  background-color: #fff;
  margin-left: ${({ $isOpen }) => $isOpen ? '0' : '100vw'};
  width: ${({ $isOpen }) => $isOpen ? '100%' : '0'};
  height: calc(100vh - 80px);
  top: 80px;
  left: 0;
  overflow: hidden;

  & > .search-bar {
    margin: 4rem auto 0;
    width: 410px;
    background: #F8FAFB;
    height: 45px;
    border-radius: 10px;
    border: solid 1px #FAE13E;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    opacity: 1;

    & > input {
      width: 90%;
      background-color: #F8FAFB;
      height: 90%;
      border: none;
      -webkit-appearance: none;
      text-align: left;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      overflow: auto;
      font-size: 18px;

      &:focus {
        outline: none;
      }
    }

    & > svg {
      font-size: 28px;
      color: #666;
    }
  }

  & > .icon-container {
    margin: 3.5rem auto 0;
    width: 90px;
    height: 33px;
    display: flex;
    justify-content: space-between;

    & > svg {
      color: #0000008A;
      font-size: 33px;
    }
  }

  & > .text-container {
    margin: 3.5rem auto 0;
    text-align: center;

    & > div {
      margin-top: 3rem;
      font-size: 20px;
    }

    & > .clicked-nav {
      margin-top: 1rem;
      text-align: center;
      font-size: 16px;
      display: ${({ $isClicked }) => $isClicked ? 'block' : 'none'};
      
      & > div {
        margin-top: 1rem;
      }
    }
  }
`;

export default Sidebar;