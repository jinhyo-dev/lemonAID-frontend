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

  const getMyInfo = () => {
    axiosInstance.get('/user/me')
      .then(res => {
        if (res.data.status === 200) {
          setInfo({
            ...res.data.data,
            image_path: import.meta.env.VITE_API_URL + res.data.data.image_path,
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
      <MainTag>
        <TopContainer>
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
              <button className={'edit-button'}>Edit Profile</button>
            </div>
          </div>
        </TopContainer>

        {/*<BottomContainer>*/}
        {/*  <div className={'information'}>Information</div>*/}

        {/*  <div className={'information-container'}>*/}
        {/*    <div className={'box'}>*/}
        {/*      <div>*/}
        {/*        <LazyLoadImage*/}
        {/*          alt={'Profile'}*/}
        {/*          height={'58px'}*/}
        {/*          src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}*/}
        {/*          width={'58px'}*/}
        {/*          className={'lazy-load-image'}*/}
        {/*        />*/}
        {/*        Perfect*/}
        {/*      </div>*/}
        {/*      <div>Manners</div>*/}
        {/*    </div>*/}

        {/*    <div className={'box'}>*/}
        {/*      <div>*/}
        {/*        <LazyLoadImage*/}
        {/*          alt={'Profile'}*/}
        {/*          height={'58px'}*/}
        {/*          src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}*/}
        {/*          width={'58px'}*/}
        {/*          className={'lazy-load-image'}*/}
        {/*        />*/}
        {/*        Amateur*/}
        {/*      </div>*/}
        {/*      <div>Level</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*</BottomContainer>*/}

      </MainTag>
    </Container>
  );
};

export default MyPage;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  overflow-y: hidden;

  @media (max-width: 500px) {
    height: calc(100vh - 60px);
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1030px;
  background: #F8FAFB;
  display: flex;
  align-items: center;
  justify-content: center;

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
    height: auto;
    width: auto;

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

/*
const BottomContainer = styled.div`
  width: 100%;
  height: 50%;

  * {
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
  }

  @media (max-width: 750px) {
    padding-left: 5%;
    padding-right: 5%;
  }

  & > .information {
    margin-left: 361px;
    margin-top: 3rem;
    font-weight: 600;
    font-size: 25px;
    line-height: 30.58px;

    @media (max-width: 750px) {
      margin-left: 0;
    }
  }

  & > .information-container {
    width: 722px;
    display: flex;
    height: auto;
    padding-left: 361px;
    padding-right: 361px;
    margin-top: 2rem;

    @media (max-width: 750px) {
      padding-left: 0;
      padding-right: 0;
      width: auto;
    }

    & > .box {
      width: 306px;
      height: 154px;
      border-radius: 10px;
      border: 1px solid #D9D9D9;
      margin-left: 1.5rem;

      @media (max-width: 750px) {
        width: 43%;
      }

      &:first-child {
        margin-left: 0;
      }

      & > div {

        &:first-child {
          font-weight: 500;
          font-size: 32px;
          width: 65%;
          margin: 1.3rem auto;
          height: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          @media (max-width: 750px) {
            width: 85%;
            font-size: 28px;
          }
        }

        &:last-child {
          font-weight: 400;
          font-size: 20px;
          width: 65%;
          margin: 1rem auto;
          color: #878787;

          @media (max-width: 750px) {
            width: 85%;
          }
        }
      }
    }
  }
`;*/
