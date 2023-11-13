import styled from 'styled-components';
import React, { FormEvent, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsCalendarEvent } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthProps } from '../interface/AuthProps.ts';
import { IoLogOut } from 'react-icons/io5';
import { useCookies } from 'react-cookie';

interface Props {
  $isOpen: boolean;
  $isClicked: boolean;
  $currentPath: string;
  $authorized: boolean;
}

const Sidebar: React.FC<AuthProps> = ({ authorized }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      removeCookie(import.meta.env.VITE_COOKIE_NAME);
      navigate('/');
    }
  };

  const handleMyPage = () => {
    navigate(authorized ? '/my-page' : '/sign-in');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?value=${searchValue}`);
    setIsOpen(false);
  };

  return (
    <StyledSidebar>
      {isOpen ? <AiOutlineClose onClick={() => setIsOpen(!isOpen)} /> :
        <AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />}

      <SidebarContainer $isOpen={isOpen} $isClicked={isClicked} $currentPath={currentPath} $authorized={authorized}>
        {
          isOpen &&
          <>
            <form className={'search-bar'} onSubmit={handleSubmit}>
              <input type={'text'} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
              <AiOutlineSearch />
            </form>

            <div className={'icon-container'}>
              <BsCalendarEvent className={'calendar'} />
              <FaUser className={'profile'} onClick={handleMyPage} />
              {authorized && <IoLogOut onClick={handleLogout} className={'logout'} />}
            </div>

            <div className={'text-container'}>
              <div onClick={() => setIsClicked(!isClicked)} className={'recruitment'}>Recruitment</div>
              <div className={'clicked-nav'}>
                <div className={'job-post'} onClick={() => navigate('/recruitment')}>Job Posts</div>
                <div className={'resume'} onClick={() => navigate('/resume')}>Resume</div>
              </div>
              <div className={'tours'} onClick={() => navigate('/tours')}>Tours</div>
              <div className={'event'} onClick={() => navigate('/parties-and-events')}>Parties & Events</div>
              <div>Community</div>
            </div>
          </>
        }
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

    @media (max-width: 500px) {
      font-size: 23px;
      margin-bottom: -.6rem;
    }
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

  * {
    font-family: 'KoPubWorldDotumBold', sans-serif;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  @media (max-width: 500px) {
    height: calc(100vh - 60px);
    top: 60px;
  }

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

    @media (max-width: 500px) {
      width: 80%;
    }

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
    width: ${({ $authorized }) => $authorized ? '160px' : '90px'};
    height: 33px;
    display: flex;
    justify-content: space-between;

    & > svg {
      color: #0000008A;
      font-size: 33px;

      @media (max-width: 500px) {
        font-size: 25px;
      }
    }

    & > .profile {
      color: ${({ $currentPath }) => ['/my-page', '/sign-in', '/sign-up'].includes($currentPath) ? '#FAE13E' : ''};
    }

    & > .logout {
      font-size: 42px;
      margin-top: -.3rem;

      @media (max-width: 500px) {
        font-size: 33px;
        margin-top: -.28rem;
      }
    }
  }

  & > .text-container {
    margin: 3.5rem auto 0;
    text-align: center;

    & > .recruitment {
      color: ${({ $currentPath }) => ['/recruitment', '/resume'].includes($currentPath) ? '#FAE13E' : ''};
    }

    & > .tours {
      color: ${({ $currentPath }) => $currentPath === '/tours' ? '#FAE13E' : ''};
    }

    & > .event {
      color: ${({ $currentPath }) => $currentPath === '/parties-and-events' ? '#FAE13E' : ''};
    }

    @media (max-width: 500px) {
      margin: 2.5rem auto 0;
    }

    & > div {
      margin-top: 3rem;
      font-size: 20px;

      @media (max-width: 500px) {
        font-size: 16px;
        margin-top: 2rem;
      }
    }

    & > .clicked-nav {
      margin-top: 1rem;
      text-align: center;
      font-size: 16px;
      display: ${({ $isClicked }) => $isClicked ? 'block' : 'none'};

      @media (max-width: 500px) {
        font-size: 13px;
      }

      & > div {
        margin-top: 1rem;
      }

      & > .job-post {
        color: ${({ $currentPath }) => $currentPath === '/recruitment' ? '#FAE13E' : ''};
      }

      & > .resume {
        color: ${({ $currentPath }) => $currentPath === '/resume' ? '#FAE13E' : ''};
      }
    }
  }
`;

export default Sidebar;