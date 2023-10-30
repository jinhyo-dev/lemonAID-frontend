import toursBanner from '../../assets/images/Banner/tours.png';
import recruitmentBanner from '../../assets/images/Banner/recruitment.png';
import partyBanner from '../../assets/images/Banner/parties.png';
import styled from 'styled-components';
import React from 'react';
import { PageType } from './List.tsx';

const Banner: React.FC<PageType> = ({ $type }) => {
  return (
    <BannerContainer $type={$type}>
      <div className={'banner'}>
        <Image $type={$type}
               src={$type === 'recruitment' ? recruitmentBanner : $type === 'tour' ? toursBanner : partyBanner} />

        <div className={'text-container'}>
          <div className={'title'}>
            {$type === 'recruitment' ?
              <span>Qualified Teachers <br/><span>Reputable Institutions</span></span> :
              $type === 'tour' ? <span>Local Tourism</span> : <span>Parties &<br/> Events</span>}
          </div>
          <div className={'info-text'}>
            {
              $type === 'recruitment' ?
                <>Briding Qualified Teachers and<br /> Leaning Institution in Korea</> : $type === 'tour' ?
                  <>Embark on Unparalleled Adventures Organized by<br /> Leading Tour Companies in South Korea</> :
                  <>South Korea’s Premier Party Planners Brining Your<br />Celebrations to the Life</>
            }
          </div>
          <div className={'button-container'}>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </BannerContainer>
  );
};

const BannerContainer = styled.div <Omit<PageType, 'authorized'>>`
  width: 100%;
  height: 530px;
  background: #FFFBD4;

  & > .banner {
    width: 1200px;
    margin: auto;
    height: 530px;
    display: flex;
    align-items: center;
    background: #FFFBD4;

    @media (max-width: 750px) {
      flex-direction: column-reverse;
      width: 100%;
    }

    & > .text-container {
      height: 60%;

      @media (max-width: 750px) {
        margin-top: 10%;
        height: 40%;
      }

      @media (max-width: 500px) {
        height: 50%;
      }

      & > .title {
        text-align: right;

        @media (max-width: 750px) {
          text-align: center;
        }

        * {
          font-family: 'Tenada', cursive;
          font-size: ${({ $type }) => $type === 'recruitment' ? '48.3px' : '60px'};

          @media (max-width: 750px) {
            font-size: ${({ $type }) => $type === 'recruitment' ? '38.3px' : '50px'};
          }

          @media (max-width: 500px) {
            font-size: ${({ $type }) => $type === 'recruitment' ? '28.3px' : '40px'};
          }
        }

        & > span > span {
          font-size: 40px;
          @media (max-width: 750px) {
            font-size: 30px
          }
          @media (max-width: 500px) {
            font-size: 23.5px
          }
        }
      }

      & > .info-text {
        margin-top: 20px;
        font-weight: 400;
        font-size: 18px;
        font-family: 'KoPubWorldDotumBold', sans-serif;
        color: #3E3C39;

        @media (max-width: 750px) {
          text-align: center;
        }

        @media (max-width: 500px) {
          font-size: 13px;
        }
      }

      & > .button-container {
        margin-left: auto;
        width: 166px;
        height: 45px;

        @media (max-width: 750px) {
          margin: auto;
          width: 136px;
          height: 40px;

          & > button {
            margin-top: 20px !important;
          }
        }

        @media (max-width: 750px) {
          width: 116px;
          height: 35px;
          
          & > button {
            font-size: 13px !important;
          }
        }

        & > button {
          margin-top: 40px;
          font-family: 'KoPubWorldDotumLight', sans-serif;
          width: 100%;
          font-size: 16px;
          height: 100%;
          color: #000;
          border-radius: 10px;
          background: #FAE13E;
          border: none;
        }
      }
    }
  }
`;


const Image = styled.img<Omit<PageType, 'authorized'>>`
  @media (min-width: 751px) {
    width: ${({ $type }) => $type === 'recruitment' ? '50%' : '60%'};
    margin-right: auto;
  }
  
  @media (max-width: 750px) {
    margin: ${({ $type }) => $type === 'recruitment' ? '1% auto 3.5%' : 'auto'};
    width: ${({ $type }) => $type === 'recruitment' ? '47%' : $type === 'tour' ? '55%' : '60%'};
  }

  @media (max-width: 500px) {
    margin: 0 auto 5%;
    width: ${({ $type }) => $type === 'recruitment' ? '75%' : $type === 'tour' ? '80%' : '85%'};
  }
`;

export default Banner;