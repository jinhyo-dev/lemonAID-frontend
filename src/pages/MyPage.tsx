import { Container, HeaderWrapper } from '../style/global.ts';
import Header from '../components/Header.tsx';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdLocationPin, MdOutlineFlightTakeoff, MdOutlineWork } from 'react-icons/md';

const MyPage = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainTag>
        <TopContainer>
          <LazyLoadImage
            alt={'Profile'}
            height={'226px'}
            src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}
            width={'226px'}
            className={'lazy-load-image'}
            style={{ marginLeft: '361px' }}
          />

          <div className={'user-info'}>
            <div className={'title'}>First Middle Last</div>

            <div className={'info-container'}>
              <div><MdLocationPin /> California, USA</div>
              <div><MdOutlineFlightTakeoff /> Republic of Korea</div>
              <div><MdOutlineWork /> Graphic Designer</div>
            </div>
          </div>

          <div className={'button-container'}>
            <button>Edit Profile</button>
          </div>
        </TopContainer>

        <BottomContainer>
          <div className={'information'}>Information</div>

          <div className={'information-container'}>
            <div className={'box'}>
              <div>
                <LazyLoadImage
                  alt={'Profile'}
                  height={'58px'}
                  src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}
                  width={'58px'}
                  className={'lazy-load-image'}
                />
                Perfect
              </div>
              <div>Manners</div>
            </div>

            <div className={'box'}>
              <div>
                <LazyLoadImage
                  alt={'Profile'}
                  height={'58px'}
                  src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}
                  width={'58px'}
                  className={'lazy-load-image'}
                />
                Amateur
              </div>
              <div>Level</div>
            </div>
          </div>

        </BottomContainer>

      </MainTag>
    </Container>
  );
};

export default MyPage;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  overflow-y: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 45%;
  background: #F8FAFB;
  display: flex;
  align-items: center;

  & > .user-info {
    height: 10rem;
    margin-left: 3.5rem;

    & > .title {
      font-weight: 400;
      font-size: 28px;
      line-height: 35px;
      font-family: 'Black Ops One', cursive;
    }

    & > .info-container {
      margin-top: 1.7rem;

      & > div {
        line-height: 24.46px;
        font-weight: 400;
        font-family: 'Commissioner', 'sans-serif';
        font-size: 20px;
        color: #8B8985;
        margin-top: .7rem;

        & > svg {
          margin-bottom: -0.15rem;
          margin-right: .3rem;
        }
      }
    }
  }

  & > .button-container {
    height: 10.5rem;
    margin-left: 3.5rem;

    & > button {
      font-size: 16px;
      font-weight: 400;
      font-family: 'Commissioner', 'sans-serif';
      background: #FAE13E;
      border: none;
      width: 136px;
      height: 40px;
      border-radius: 8px;
    }
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 50%;

  * {
    font-family: 'Commissioner', 'sans-serif';
  }

  & > .information {
    margin-left: 361px;
    margin-top: 3rem;
    font-weight: 600;
    font-size: 25px;
    line-height: 30.58px;
  }

  & > .information-container {
    width: calc(100% - 722px);
    display: flex;
    height: auto;
    padding-left: 361px;
    padding-right: 361px;
    margin-top: 2rem;

    & > .box {
      width: 306px;
      height: 154px;
      border-radius: 10px;
      border: 1px solid #D9D9D9;
      margin-left: 1.5rem;

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
        }

        &:last-child {
          font-weight: 400;
          font-size: 20px;
          width: 65%;
          margin: 1rem auto;
          color: #878787;
        }
      }
    }
  }
`;