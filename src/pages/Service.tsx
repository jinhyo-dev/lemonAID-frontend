import { Container, HeaderWrapper } from '../style/global.ts';
import Header from '../components/Header.tsx';
import styled from 'styled-components';
import React from 'react';
import { AuthProps } from '../interface/AuthProps.ts';

interface ServiceProps extends AuthProps {
  phoneNumber: string;
}

declare global {
  interface Window {
    PayApp: {
      setDefault: (key: string, value: string) => void;
      setParam: (key: string, value: string | number) => void;
      call: () => void;
    };
  }
}

const Service: React.FC<ServiceProps> = ({ authorized, permission, phoneNumber }) => {

  window.PayApp.setDefault('userid', 'lemonaid');
  window.PayApp.setDefault('shopname', 'LEMONAID');

  const payAppPay = (name: string, value: number, plan: number): void => {
    window.PayApp.setParam('goodname', 'Lemon Aid - ' + name + ' package');
    window.PayApp.setParam('price', value);
    window.PayApp.setParam('recvphone', phoneNumber);
    window.PayApp.setParam('returnurl', '');
    window.PayApp.setParam('smsuse', 'n');
    window.PayApp.setParam('redirectpay', '1');
    window.PayApp.setParam('skip_cstpage', 'y');
    window.PayApp.setParam('var1', plan);
    window.PayApp.call();
  };

  return (<Container style={{ overflowX: 'auto' }}>
    <HeaderWrapper>
      <Header authorized={authorized} permission={permission} />
    </HeaderWrapper>

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

          <button onClick={() => payAppPay('Standard', 69000, 1)}>Buy Now</button>
        </div>

        <div className={'premium'}>
          <div className={'package-name'}>
            <div>Premium</div>
            <div>199,000 KRW</div>
          </div>

          <div className={'package-info'}>
            <div className={'exposure'}>93 Days Exposure</div>
            <ul>
              <li>ALL Standard features</li>
              <li>10 Days Top Exposure</li>
              <li>PREMIUM Badge</li>
              <li>Resume Search</li>
            </ul>
            <div className={'see-more'}>See More</div>
          </div>

          <button onClick={() => payAppPay('Premium', 199000, 2)}>Buy Now</button>
        </div>

        <div>
          <div className={'package-name'}>
            <div>Resume</div>
            <div>49,000 KRW</div>
          </div>

          <div className={'package-info'}>
            <div className={'exposure'}>31 Days</div>
            <ul>
              <li>Direct Resume Search</li>
            </ul>
            <div className={'see-more'}>See More</div>
          </div>

          <button onClick={() => payAppPay('Resume', 49000, 3)}>Buy Now</button>
        </div>

        <div>
          <div className={'package-name'}>
            <div>Specialist</div>
            <div>1,000,000 KRW</div>
          </div>

          <div className={'package-info'}>
            <div className={'exposure'}>1 Teacher / 62 Days</div>
            <ul>
              <li>90% Refunded When a Teacher is NOT Hired</li>
            </ul>
            <div className={'see-more'}>See More</div>
          </div>

          <button onClick={() => payAppPay('Specialist', 1000000, 4)}>Buy Now</button>
        </div>
      </LemonAidPackages>

    </MainTag>
  </Container>);
};

export default Service;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  background: linear-gradient(to bottom, #F8FAFB 0%, #F8FAFB 45%, #fff 45%, #fff 100%);

  @media (max-width: 500px) {
    height: calc(100vh - 60px);
  }

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

    @media (max-width: 500px) {
      &:first-child {
        font-size: 25px;
      }

      &:last-child {
        font-size: 13px;
      }
    }
  }
`;

const LemonAidPackages = styled.div`
  width: 1399px;
  height: 512px;
  margin: 5rem auto 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
  }

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

    @media (max-width: 750px) {
      margin-top: 3rem;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 3rem;
      }
    }

    @media (max-width: 500px) {
      width: 90%;
    }

    & > .package-name {
      margin: auto;
      width: 80%;
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
      width: 80%;
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