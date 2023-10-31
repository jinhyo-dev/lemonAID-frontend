import Header from '../components/Header.tsx';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BiLogoFacebook } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { Container, HeaderWrapper } from '../style/global.ts';
import { useNavigate } from 'react-router-dom';
import { FormContainer, ImageContainer, MainTag } from '../style/SignIn.ts';
import React, { FormEvent, useState } from 'react';
import { SignInProps } from '../interface/SignInProps.ts';
import axiosInstance from '../utils/AxiosInstance.ts';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { AuthProps } from '../interface/AuthProps.ts';

const SignIn: React.FC<AuthProps> = ({ authorized, permission }) => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies();
  const [loginData, setLoginData] = useState<SignInProps>({
    email: '', password: '',
  });


  const handleLoginData = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setLoginData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = (e: FormEvent) => {
    e.preventDefault();
    axiosInstance.post('/auth/login', JSON.stringify(loginData))
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          setCookies(import.meta.env.VITE_COOKIE_NAME, res.data.session, {
            sameSite: 'none',
            secure: true,
            path: '/',
          });

          toast.success('Success !', {
            duration: 1000,
            style: {
              backgroundColor: '#fff',
              width: '16rem',
              fontSize: '20px',
            },
          });

          navigate('/');
        } else {
          toast.error(res.data.message, {
            duration: 3000,
            style: {
              backgroundColor: '#ff4a4a',
              width: '16rem',
              fontSize: '20px',
              color: '#fff',
            },
          });
        }
      })
      .catch(err => {
        toast.error(err.response.data.message, {
          duration: 1000,
          style: {
            backgroundColor: '#ff4a4a',
            width: '16rem',
            fontSize: '20px',
            color: '#fff',
          },
        });
      });
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header authorized={authorized} permission={permission} />
      </HeaderWrapper>

      <MainTag>
        <ImageContainer />

        <FormContainer onSubmit={login}>
          <form>
            <div className={'title'}>Sign in</div>
            <div className={'sub-title'}>
              New to Lemonade?
              <span onClick={() => navigate('/sign-up')}>Create an Account</span>
            </div>

            <div className={'input-container'}>
              <div>Username or Email</div>
              <input placeholder={'e.g. lemonade123@gmail.com'} type={'text'} required={true} value={loginData.email}
                     onChange={handleLoginData} name={'email'} />
            </div>

            <div className={'input-container'} style={{ marginTop: '1rem' }}>
              <div>Password</div>
              <input placeholder={'e.g. lemonade1234!'} type={'password'} required={true} value={loginData.password}
                     onChange={handleLoginData} name={'password'} />
            </div>

            <div className={'input-container'}>
              <button>Sign in</button>
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

export default SignIn;