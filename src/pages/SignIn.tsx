import Header from '../components/Header.tsx';
import styled from 'styled-components';
import SignInImage from '../assets/images/sign-in.png';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BiLogoFacebook } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { Container, HeaderWrapper } from '../style/global.ts';

const SignIn = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <MainTag>
        <ImageContainer>
          <img src={SignInImage} alt={'loading...'} />
        </ImageContainer>

        <FormContainer>
          <form>
            <div className={'title'}>Sign in</div>
            <div className={'sub-title'}>New to Lemonade? <span>Create an Account</span></div>

            <div className={'input-container'}>
              <div>Username or Email</div>
              <input placeholder={'e.g. lemonade123@gmail.com'} type={'text'} required={true} />
            </div>

            <div className={'input-container'} style={{ marginTop: '1rem' }}>
              <div>Password</div>
              <input placeholder={'e.g. lemonade1234!'} type={'password'} required={true} />
            </div>

            <div className={'input-container'}>
              <button>Sign in</button>
            </div>

            <div className={'remember-id'}>
              <input type='checkbox' id='check1' />
              <label htmlFor='check1'></label>
              <span>Remember me</span>
            </div>

            <div className={'divider'}>
              <div />
              or Social Media Log In
              <div />
            </div>

            <div className={'social-media-container'}>
              <div className={'naver'}>
                <SiNaver />
              </div>
              <div className={'kakao'}>
                <RiKakaoTalkFill />
              </div>
              <div className={'facebook'}>
                <BiLogoFacebook />
              </div>
              <div className={'google'}>
                <FcGoogle />
              </div>
            </div>
          </form>

        </FormContainer>
      </MainTag>
    </Container>
  );
};

const ImageContainer = styled.div`
  background: #FFFBD4;
  width: 42.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 729px;
  }
`;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
`;

const FormContainer = styled.div`
  background: #fff;
  width: 57.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > form {
    height: auto;
    width: 416px;

    * {
      font-family: 'Commissioner', sans-serif;
    }

    & > .title {
      font-size: 28px;
      font-weight: 700;
    }

    & > .sub-title {
      margin-top: 1rem;
      font-weight: 700;
      font-size: 14px;

      & > span {
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

    & > .remember-id {
      height: 17px;
      display: flex;
      align-items: center;
      color: #817C70;
      margin-top: 1rem;
      font-size: 13px;
      font-weight: 400;

      & > span {
        margin-left: .5rem;
      }

      input[type="checkbox"] {
        display: none;
      }

      input[type="checkbox"] + label {
        cursor: pointer;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #ACACAC;
        border-radius: 3px;
        position: relative;
      }

      input[id="check1"]:checked + label::after {
        content: '✓';
        font-size: 12px;
        color: #fff;
        background-color: #ACACAC;
        width: 16px;
        height: 16px;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
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

export default SignIn;