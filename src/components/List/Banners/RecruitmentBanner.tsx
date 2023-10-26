import recruitmentBanner from "../../../assets/images/Banner/recruitment.png";
import styled from "styled-components";

const RecruitmentBanner = () => {
  return (
    <Banner>
      <div className={'text-container'}>
        <div className={'title'}>
          <div className={'first'}>Qualified</div>

          <div className={'second'}>
            <div/>
            <div>Teachers</div>
          </div>

          <div className={'third'}>Reputable</div>

          <div className={'fourth'}>
            <div/>
            <div>Institutions</div>
          </div>
        </div>

        <div className={'info-text'}>Briding Qualified Teachers and Leaning Institution in Korea</div>

        <div className={'button-container'}>
          <button>Learn More</button>
        </div>

      </div>
      <Image src={recruitmentBanner}/>
    </Banner>
  )
}

const Banner = styled.div`
  margin: 2rem auto 0;
  width: 1150px;
  height: 550px;
  display: flex;
  align-items: center;

  @media (max-width: 750px) {
    width: 90%;
    display: block;
    height: auto;
  }

  & > .text-container {
    height: auto;
    width: 100%;

    * {
      font-family: 'Tenada', cursive;
      font-weight: 400;
      width: 100%;
    }

    & > .title {
      width: 440px;
      height: auto;

      @media (max-width: 750px) {
        width: 100%;
      }

      * {
        height: 80px;
      }

      & > .first {
        font-size: 60px;

        @media (max-width: 750px) {
          padding-top: 30px;
          font-size: 50px;
        }
      }

      & > .second {
        margin: 15px 0 15px;
        position: relative;
        width: 100%;
        height: auto;

        @media (max-width: 750px) {
          margin: 0;
        }

        & > div {
          &:first-child {
            float: right;
            width: 234px;
            height: 34px;
            background: #FFFBD4;
            border: 5px solid #FAE13E;
            box-sizing: border-box;
            z-index: 0;
            position: relative;
            margin-right: 42px;

            @media (max-width: 750px) {
              font-size: 32px;
              height: 34px;
              width: 198px;
              margin-right: 43%;
            }
          }

          &:last-child {
            position: absolute;
            right: 0;
            z-index: 1;
            font-size: 40px;
            text-align: right;
            top: 0;
            transform: translateY(-20px);
            margin-right: 20px;

            @media (max-width: 750px) {
              font-size: 32px;
              transform: translateY(-6px);
              margin-right: 43%;
            }
          }
        }
      }


      & > .third {
        margin: 65px 0 15px;
        font-size: 60px;
        text-align: right;

        @media (max-width: 750px) {
          font-size: 50px;
          margin: 65px 0 15px -26%;
        }
      }

      & > .fourth {
        margin: 30px 0 5px;
        position: relative;
        width: 100%;
        height: 3rem;

        @media (max-width: 750px) {
          margin: 5px 0 5px;
        }


        & > div {
          &:first-child {
            float: left;
            width: 254px;
            height: 34px;
            background: #FAE13E;
            box-sizing: border-box;
            z-index: 0;
            position: relative;
          }

          &:last-child {
            position: absolute;
            left: 0;
            z-index: 1;
            font-size: 40px;
            text-align: left;
            top: 0;
            transform: translateY(-20px);
            margin-left: 22px;
            
            @media (max-width: 750px) {
              transform: translateY(-17px);
            }
          }
        }
      }
    }

    & > .info-text {
      font-weight: 400;
      font-size: 18px;
      font-family: 'KoPubWorldDotumLight', sans-serif;
      color: #3E3C39;
    }

    & > .button-container {
      width: 166px;
      height: 45px;

      & > button {
        margin-top: 40px;
        font-family: 'KoPubWorldDotumLight', sans-serif;
        width: 100%;
        font-size: 16px;
        height: 100%;
        border-radius: 10px;
        background: #FAE13E;
        border: none;

        @media (max-width: 750px) {
          margin-top: 25px;
        }
      }
    }
  }
`;

const Image = styled.img`
  height: 80%;
  margin-left: auto;

  @media (max-width: 750px) {
    margin-top: 10px;
    width: 100%;
  }
`;

export default RecruitmentBanner