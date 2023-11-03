import { Container, HeaderWrapper } from '../style/global.ts';
import Header from '../components/Header.tsx';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdLocationPin, MdOutlineWork } from 'react-icons/md';
import axiosInstance from '../utils/AxiosInstance.ts';
import React, { useEffect, useState } from 'react';
import { MyPageProps } from '../interface/MyPageProps.ts';
import LoadingModal from '../components/LoadingModal.tsx';
import { AuthProps } from '../interface/AuthProps.ts';
import DefaultProfile from '../assets/images/logo/Lemonaid-1.png';

const MyPage: React.FC<AuthProps> = ({ authorized, permission }) => {
  const [info, setInfo] = useState<MyPageProps>({
    amateur: 0,
    birthday: '',
    email: '',
    first_name: '',
    gender: undefined,
    image_path: '',
    is_admin: 0,
    last_name: '',
    manners: 0,
    nationality: '',
    occupation: '',
    phone_number: '',
    plan: 0,
    resume: '',
    video_messenger: '',
    video_messenger_id: '',
    visa_code: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  // const [editTagOpen, setEditTagOpen] = useState<boolean>(false);

  const getMyInfo = () => {
    axiosInstance.get('/user/me')
      .then(res => {
        if (res.data.status === 200) {
          setInfo({
            ...res.data.data,
            image_path: res.data.data.image_path ? import.meta.env.VITE_API_URL + res.data.data.image_path : DefaultProfile,
          });
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <Container>
      <LoadingModal isOpen={loading} />
      <HeaderWrapper>
        <Header authorized={authorized} permission={permission} />
      </HeaderWrapper>

      {!loading &&
        <MainTag>
          <TopContainer $open={false}>
            <div className={'container'}>
              <LazyLoadImage
                alt={'Profile'}
                src={info.image_path}
                className={'lazy-load-image'}
              />

              <div className={'user-info'}>
                <div className={'title'}>{info.first_name} {info.last_name}</div>

                <div className={'info-container'}>
                  <div><MdLocationPin /> {info.nationality}</div>
                  <div><MdOutlineWork /> {info.occupation ?? 'Out of work'}</div>
                  <button className={'edit-button'}>Edit Profile</button>
                </div>
              </div>

              <div className={'button-container'}>
                <button className={'edit-button'} onClick={() => alert('Edit profile feature is not yet enabled.')}>Edit
                  Profile
                </button>
              </div>
            </div>

            <EditContainer $open={false}>
              <div className={'vertical'}>
                <div className={'row'}>
                </div>
                <div className={'row'}></div>
                <div className={'row'}></div>
              </div>

              <div className={'vertical'}>
                <div className={'row'}></div>
                <div className={'row'}></div>
                <div className={'row'}></div>
              </div>

              <div className={'vertical'}>
                <div className={'row'}></div>
                <div className={'row'}></div>
                <div className={'row'}></div>
              </div>
            </EditContainer>
          </TopContainer>
        </MainTag>
      }
    </Container>
  );
};

export default MyPage;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);

  @media (max-width: 500px) {
    height: calc(100vh - 60px);
  }
`;

const TopContainer = styled.div<{ $open: boolean }>`
  width: 100%;
  height: 100%;
  min-width: 1030px;
  background: #F8FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 750px) {
    width: 100%;
    min-width: 0;
  }

  & .edit-button {
    font-size: 16px;
    font-weight: 400;
    font-family: 'KoPubWorldDotumLight', 'sans-serif';
    background: #FAE13E;
    border: none;
    width: 136px;
    height: 40px;
    border-radius: 8px;
    color: #000;

    @media (max-width: 750px) {
      margin: 20px auto 0;
    }
  }

  & > .container {
    display: flex;
    align-items: center;
    text-align: center;
    height: auto;
    width: auto;
    transition: margin-bottom .25s;
    margin-bottom: ${({ $open }) => $open ? '45vh' : '0'};

    @media (max-width: 750px) {
      width: auto;
      margin: auto;
    }

    @media (max-width: 750px) {
      display: block;
    }

    & > .lazy-load-image {
      width: 226px;
      height: 226px;
      object-fit: scale-down;

      @media (max-width: 750px) {
        margin: auto;
        width: 177px;
        height: 177px;
      }
    }

    & > .user-info {
      height: 10rem;
      margin-left: 3.5rem;

      @media (max-width: 750px) {
        height: 13rem;
        margin: 2rem auto 0;
      }

      & > .title {
        font-weight: 400;
        font-size: 28px;
        line-height: 35px;
        font-family: 'Tenada', cursive;

        @media (max-width: 750px) {
          text-align: center;
        }
      }

      & > .info-container {
        margin-top: 1.7rem;

        @media (max-width: 750px) {
          text-align: center;
        }

        & > div {
          line-height: 24.46px;
          font-weight: 400;
          font-family: 'KoPubWorldDotumLight', 'sans-serif';
          font-size: 20px;
          color: #8B8985;
          margin-top: .7rem;

          & > svg {
            margin-bottom: -0.15rem;
            margin-right: .3rem;
          }
        }

        & > button {
          @media (min-width: 751px) {
            display: none;
          }
        }

        @media (max-width: 750px) {
          margin-top: 1rem;
          & > div {
            font-size: 16px;

            & > svg {
              margin-bottom: -.2rem;
              margin-right: .3rem;
            }
          }
        }
      }
    }

    & > .button-container {
      height: 10.5rem;
      margin-left: 3.5rem;

      @media (max-width: 750px) {
        display: none;
      }
    }
  }
`;

const EditContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $open }) => $open ? '15vh' : '200vh'});
  transition: transform 0.25s;
  width: 1030px;
  height: 40vh;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 50px;
  visibility: ${({ $open }) => $open ? 'visible' : 'hidden'};
  display: flex;

  & > .vertical {
    width: 33.3333%;
    background: #faaa;

    & > .row {
      margin: auto;
      width: 90%;
      height: 33.333%;
      background: #f00;
    }
  }
`;
