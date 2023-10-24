import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { BsCalendarEvent } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar.tsx';

interface ActivePageProps {
  $currentPath?: string;
  $mouseHover: boolean;
}

const Header: React.FC = () => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <StyledHeader>
      <HeaderContainer $currentPath={currentPath} $mouseHover={isMouseOver}>
        <div className={'title'} onClick={() => navigate('/')}>LEMON AID</div>
        <nav>
          <div className={'span-container'}>
            <span className={'recruitment'} onMouseOver={() => setIsMouseOver(true)}>
              Recruitment
              {
                isMouseOver &&
                <div className={'hover-event'} onMouseOut={() => setIsMouseOver(false)}>
                  <div onClick={() => navigate('/recruitment')}>Job Post</div>
                  <div onClick={() => navigate('/resume')}>Resume</div>
                </div>
              }
            </span>
            <span onClick={() => navigate('/tours')} className={'tours'}>Tours</span>
            <span onClick={() => navigate('/parties-and-events')}
                  className={'parties-and-events'}>Parties & Events</span>
            <span>Community</span>
          </div>

          <div className={'icon-container'}>
            <IoSearch className={'search'}/>
            <BsCalendarEvent className={'calendar'} />
            <FaUser className={'profile'} onClick={() => navigate('/my-page')} />
          </div>

          <div className={'button-container'}>
            <button onClick={() => navigate('/sign-in')}>
              Click to Chat
            </button>
          </div>
        </nav>
      </HeaderContainer>

      <MobileHeaderContainer>
        <div className={'title'} onClick={() => navigate('/')}>LEMON AID</div>
        <div className={'button-container'}>
          <button onClick={() => navigate('/sign-in')}>
            Click to Chat
          </button>
          <Sidebar/>
        </div>
      </MobileHeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  min-width: 1360px;
  height: 80px;
  position: fixed;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  
  @media (max-width: 750px) {
    min-width: 0;
  }
`;

const HeaderContainer = styled.div<ActivePageProps>`
  @media (max-width: 750px) {
    display: none;  
  }
  
  width: 80%;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .title {
    cursor: pointer;
    margin-top: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
    margin-right: auto;
    font-family: 'Tenada', sans-serif;
    color: #FAE13E;
    font-size: 32px;
    font-weight: 700;
  }

  & > nav {
    margin-left: auto;
    width: auto;
    height: 100%;
    display: flex;

    & > * {
      height: 100%;
    }

    & > .span-container {
      height: 100%;
      width: 31rem;

      * {
        font-size: 16px;
        cursor: pointer;
      }

      & > .recruitment {
        color: ${({ $currentPath }) => $currentPath === '/recruitment' || $currentPath === '/resume' ? '#FAE13E' : ''};

        & > .hover-event {
          display: block;
          margin: 12rem auto 0;
          width: 119px;
          height: 106px;
          box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
          position: absolute;
          background-color: #fff;

          & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50%;
            color: #000;              
            
            &:hover {
              color: #FAE13E;
            }
          }
        }
      }

      & > .tours {
        color: ${({ $currentPath }) => $currentPath === '/tours' ? '#FAE13E' : ''};
      }

      & > .parties-and-events {
        color: ${({ $currentPath }) => $currentPath === '/parties-and-events' ? '#FAE13E' : ''};
      }
    }

    & > .icon-container {
      width: 8rem;
      margin-left: 3rem;

      & > svg {
        cursor: pointer;

        &:first-child {
          font-size: 1.5rem;
        }

        margin-bottom: -0.2rem;
        font-size: 1.3rem;
        color: #0000008A;

        &:last-child {
          font-size: 1.2rem;
        }
      }

      & > .profile {
        color: ${({ $currentPath }) => $currentPath === '/my-page' ? '#FAE13E' : ''};
      }

      & > .calendar {
        color: ${({ $currentPath }) => $currentPath === 'calendar' ? '#FAE13E' : ''};
      }
    }

    & > .button-container {
      margin-left: 2rem;

      & > button {
        justify-content: center;
        width: 136px;
        background: #FAE13E;
        color: #000;
        height: 40px;
        font-size: 16px;
        font-weight: 400;
        border: none;
        border-radius: 8px;
      }
    }

    * {
      font-family: 'KoPubWorldDotumBold', sans-serif;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const MobileHeaderContainer = styled.div`
  @media (min-width: 751px) {
    display: none;
  }

  width: 90%;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .title {
    margin-top: 10px;
    cursor: pointer;
    margin-right: auto;
    font-family: 'Tenada', sans-serif;
    color: #FAE13E;
    font-size: 32px;
    font-weight: 700;
  }

  & > .button-container {
    margin-left: auto;
    display: flex;
    
    & > button {
      justify-content: center;
      width: 136px;
      background: #FAE13E;
      color: #000;
      height: 40px;
      font-size: 16px;
      font-weight: 400;
      border: none;
      border-radius: 8px;
    }
  }

`

export default Header;