import styled from "styled-components";
import {FaUser} from "react-icons/fa";
import {BsCalendarEvent} from "react-icons/bs";
import {IoSearch} from "react-icons/io5";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <div className={'title'}>LEMONADE</div>
        <nav>
          <div className={'span-container'}>
            <span>Recruitment</span>
            <span>Tours</span>
            <span>Parties & Events</span>
            <span>Community</span>
          </div>

          <div className={'icon-container'}>
            <IoSearch/>
            <BsCalendarEvent/>
            <FaUser/>
          </div>

          <div className={'button-container'}>
            <button>
              Click to Chat
            </button>
          </div>
        </nav>
      </HeaderContainer>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  position: fixed;
  top: 0;
  z-index: 1;
`

const HeaderContainer = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .title {
    margin-right: auto;
    font-family: 'Inter', sans-serif;
    color: #FAE13E;
    font-size: 32px;
    font-weight: 700;
  }

  & > nav {
    margin-left: auto;
    width: 50rem;
    height: 100%;
    display: flex;

    & > * {
      height: 100%;
    }

    & > .span-container {
      height: 100%;
      width: 38rem;

      * {
        font-size: 16px;
      }
    }

    & > .icon-container {
      width: 8rem;
      margin-left: 3rem;

      & > svg {
        &:first-child {
          font-size: 1.5rem;
        }

        margin-bottom: -0.2rem;
        font-size: 1.3rem;
        color: #dadada;

        &:last-child {
          font-size: 1.2rem;
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
      font-family: 'Commissioner', sans-serif;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`

export default Header