import { Container } from '../style/global.ts';
import Header from '../components/Header.tsx';
import styled from 'styled-components';
import React from 'react';
import { AuthProps } from '../interface/AuthProps.ts';

const Service: React.FC<AuthProps> = ({ authorized }) => {
  return (
    <Container>
      <Header authorized={authorized} />
      <MainTag>
        <div className={'title'}>
          <div>Lemon Aid Packages</div>
          <div>Enjoy more benefits by Becoming our Member!</div>
        </div>

        <LemonAidPackages>
          <div>
            <div className={'package-name'}>
              <div>Standard</div>
              <div>69,000 KRW</div>
            </div>

            <div className={'package-info'}>
              <div className={'exposure'}>93 Days Exposure</div>
              <ul>
                <li>Job Post</li>
                <li>Photo Gallery</li>
                <li>Social Media Account</li>
                <li>Branding</li>
              </ul>
              <div className={'see-more'}>See More</div>
            </div>

            <button>Buy Now</button>
          </div>

          <div className={'premium'}>
            <div className={'package-name'}>
              <div>Premium</div>
              <div>69,000 KRW</div>
            </div>

            <div className={'package-info'}>
              <div className={'exposure'}>93 Days Exposure</div>
              <ul>
                <li>Job Post</li>
                <li>Photo Gallery</li>
                <li>Social Media Account</li>
                <li>Branding</li>
              </ul>
              <div className={'see-more'}>See More</div>
            </div>

            <button>Buy Now</button>
          </div>

          <div>
            <div className={'package-name'}>
              <div>Resume</div>
              <div>69,000 KRW</div>
            </div>

            <div className={'package-info'}>
              <div className={'exposure'}>31 Days Exposure</div>
              <ul>
                <li>Direct Resume Search</li>
              </ul>
              <div className={'see-more'}>See More</div>
            </div>

            <button>Buy Now</button>
          </div>

          <div>
            <div className={'package-name'}>
              <div>Specialist</div>
              <div>69,000 KRW</div>
            </div>

            <div className={'package-info'}>
              <div className={'exposure'}>31 Days Exposure</div>
              <ul>
                <li>Direct Resume Search</li>
              </ul>
              <div className={'see-more'}>See More</div>
            </div>

            <button>Buy Now</button>
          </div>
        </LemonAidPackages>

      </MainTag>
    </Container>
  );
};

export default Service;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  background: linear-gradient(to bottom, #F8FAFB 0%, #F8FAFB 45%, #fff 45%, #fff 100%);

  * {
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
  }

  & > .title > div {
    text-align: center;

    &:first-child {
      padding-top: 5rem;
      font-family: 'Tenada', cursive;
      font-weight: 400;
      font-size: 40px;
    }

    &:last-child {
      margin-top: 1rem;
      font-weight: 400;
      font-size: 18px;
    }
  }
`;

const LemonAidPackages = styled.div`
  width: 1399px;
  height: 512px;
  margin: 5rem auto 0;
  display: flex;
  justify-content: space-between;

  & > .premium {
    border: 3px solid #FAE13E;

    & > button {
      background: #FAE13E;
    }
  }

  & > div {
    width: 331px;
    height: 512px;
    border: 1px solid #EDEDED;
    border-radius: 15px;
    background: #fff;

    & > .package-name {
      margin: auto;
      width: 276px;
      height: 11.25rem;
      flex-direction: column;
      border-bottom: 1px solid #D4D4D4;
      display: flex;
      justify-content: center;
      align-items: center;

      & > div {
        font-weight: 600;
        font-size: 28px;

        &:last-child {
          margin-top: 1.3rem;
          color: #F4B723;
        }
      }
    }

    & > .package-info {
      margin: 2rem auto 0;
      width: 250px;
      height: 10.5rem;

      & > .exposure {
        font-weight: 600;
        font-size: 20px;
      }

      & > ul {
        margin-top: .7rem;
        font-weight: 400;
        font-size: 16px;

        & > li {
          &:first-child {
            margin-top: 0;
          }

          margin-top: .5rem;
        }
      }

      & > .see-more {
        margin-top: .7rem;
        font-weight: 500;
        font-size: 16px;
        width: auto;
        text-decoration: underline;
        color: #5BCFCF;
      }
    }

    & > button {
      width: 287px;
      height: 45px;
      display: block;
      margin: 3rem auto;
      border: 1px solid #FAE13E;
      border-radius: 10px;
      background: none;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;