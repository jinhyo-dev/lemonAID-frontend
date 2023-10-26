import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { BsCalendarEvent } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Sidebar from './Sidebar.tsx';
import Logo from '../assets/images/logo/Lemonaid-2.png';
import SearchBar from './SearchBar.tsx';
import { useCookies } from 'react-cookie';
import { IoLogOut } from 'react-icons/io5';
import { AuthProps } from '../interface/AuthProps.ts';

interface ActivePageProps {
  $currentPath?: string;
}

const Header: React.FC<AuthProps> = ({ authorized }) => {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleMyPage = () => {
    navigate(authorized ? '/my-page' : '/sign-in');
  };

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      removeCookie(import.meta.env.VITE_COOKIE_NAME);
      navigate('/');
    }
  };

  return (
    <StyledHeader>
      <HeaderContainer $currentPath={currentPath}>
        <div className={'title'} onClick={() => navigate('/')}>
          <img src={Logo} />
        </div>
        <nav>
          <div className={'span-container'}>
            <span className={'recruitment'}>
              Recruitment
                <div className={'hover-event'}>
                  <div onClick={() => navigate('/recruitment')}>Job Post</div>
                  <div onClick={() => navigate('/resume')}>Resume</div>
                </div>
            </span>
            <span onClick={() => navigate('/tours')} className={'tours'}>Tours</span>
            <span onClick={() => navigate('/parties-and-events')}
                  className={'parties-and-events'}>Parties & Events</span>
            <span>Community</span>
          </div>

          <div className={'icon-container'}>
            <button>
              <BsCalendarEvent className={'calendar'} />
            </button>
            <SearchBar />
            <button>
              <FaUser className={'profile'} onClick={handleMyPage} />
            </button>
            {
              authorized &&
              <button>
                <IoLogOut onClick={handleLogout} className={'logout'} />
              </button>
            }
          </div>

          <div className={'button-container'}>
            <button onClick={() => window.open('https://open.kakao.com/o/sYec9Pmf')}>
              Click to Chat
            </button>
          </div>
        </nav>
      </HeaderContainer>

      <MobileHeaderContainer>
        <div className={'title'} onClick={() => navigate('/')}>
          <img src={Logo} alt={'logo'}/>
        </div>
        <div className={'button-container'}>
          <button onClick={() => navigate('/sign-in')}>
            Click to Chat
          </button>
          <Sidebar />
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
    margin-right: auto;

    & > img {
      width: 185px;
    }
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
        position: relative;
        color: ${({ $currentPath }) => $currentPath === '/recruitment' || $currentPath === '/resume' ? '#FAE13E' : ''};

        &:hover > .hover-event {
          display: block;
        }

        & > .hover-event {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          width: 120px;
          height: 100px;
          font-size: 12px;
          box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
          background-color: #fff;

          & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50%;
            color: #000;
            cursor: pointer;
            transition: color 0.3s;

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
      width: 11rem;
      margin-left: 3rem;

      & > button {
        height: 40px;
        background: none;
        border: none;

        & > svg {
          cursor: pointer;
          margin-bottom: -0.2rem;
          font-size: 1.3rem;
          color: #0000008A;
        }

        & > .profile {
          color: ${({ $currentPath }) => $currentPath === '/my-page' ? '#FAE13E' : ''};
        }

        & > .calendar {
          font-size: 1.4rem;
          color: ${({ $currentPath }) => $currentPath === 'calendar' ? '#FAE13E' : ''};
        }

        & > .logout {
          font-size: 1.6rem;
        }
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
    cursor: pointer;
    margin-right: auto;

    & > img {
      width: 185px;
    }
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

`;

export default Header;