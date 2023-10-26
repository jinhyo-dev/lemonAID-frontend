import styled from 'styled-components';

export const ImageContainer = styled.div`
  background: #FFFBD4;
  width: 42.5%;
  height: 100%;
  
  @media (max-width: 750px) {
    display: none;
  }
`;

export const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
`;

export const FormContainer = styled.div`
  background: #fff;
  width: 57.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 750px) {
    width: 100%;
  }

  & > form {
    height: auto;
    width: 416px;

    * {
      font-family: 'KoPubWorldDotumBold', sans-serif;
    }

    & > .title {
      font-size: 28px;
      font-weight: 700;
    }

    & > .sub-title {
      margin-top: 1rem;
      font-size: 14px;

      & > span {
        cursor: pointer;
        margin-left: .2rem;
        color: #5BCFCF;
      }
    }

    & > .input-container {
      width: 100%;
      height: auto;
      margin-top: 2rem;

      & > div {
        font-size: 16px;
        font-weight: 500;
      }

      & > input {
        width: 100%;
        margin-top: .5rem;
        height: 50px;
        box-sizing: border-box;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 13px;
        border-radius: 10px;
        border: 1px solid #D4D4D4;
        transition: all .1s;

        &:focus {
          border: none;
          outline: 2px solid #F7C324;
        }
      }

      & > button {
        width: 100%;
        height: 55px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: 500;
        background: #FAE13E;
        color: #000;
        border: none;
        transition: background-color .2s;

        &:hover {
          background: #e1cc38;
        }
      }
    }

    & > .divider {
      margin-top: 2.5rem;
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #817C70;
      font-size: 13px;
      font-weight: 400;


      & > div {
        width: 128px;
        border-bottom: 1px solid #817C70;
      }
    }

    & > .social-media-container {
      width: 240px;
      height: 50px;
      margin: 1rem auto 0;
      display: flex;
      justify-content: space-between;

      & > div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .2s;

        &:hover {
          transform: translateY(-3px);
        }
      }

      & > .naver {
        background-color: #03c75a;
        color: #fff;
        font-size: 1rem;
      }

      & > .kakao {
        background-color: #fee500;
        color: #624a3d;
        font-size: 1.6rem;
      }

      & > .facebook {
        background-color: #1877f2;
        color: #fff;
        font-size: 1.8rem;

        & svg {
          margin-top: .15rem;
        }
      }

      & > .google {
        border: 1px solid #D4D4D4;
        color: #fff;
        font-size: 1.5rem;
      }
    }
  }
`;