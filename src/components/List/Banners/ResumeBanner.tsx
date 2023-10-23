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

        <div className={'info-text'}>R     E        S      U       M       E</div>

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

  & > .text-container {
    height: auto;
    width: 45%;

    * {
      font-family: 'Black Ops One', cursive;
      font-weight: 400;
      width: 100%;
    }

    & > .title {
      width: 440px;
      height: auto;

      * {
        height: 80px;
      }

      & > .first {
        font-size: 60px;
      }

      & > .second {
        margin: 15px 0 15px;
        position: relative;
        width: 100%;
        height: auto;

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
          }
        }
      }


      & > .third {
        margin: 65px 0 15px;
        font-size: 60px;
        text-align: right;
      }

      & > .fourth {
        margin: 30px 0 5px;
        position: relative;
        width: 100%;
        height: 3rem;

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
          }
        }
      }
    }

    & > .info-text {
      font-weight: 400;
      font-size: 18px;
      font-family: 'Commissioner', sans-serif;
      color: #3E3C39;
    }

    & > .button-container {
      width: 166px;
      height: 45px;

      & > button {
        margin-top: 40px;
        font-family: 'Commissioner', sans-serif;
        width: 100%;
        font-size: 16px;
        height: 100%;
        border-radius: 10px;
        background: #FAE13E;
        border: none;
      }
    }
  }
`;

const Image = styled.img`
  height: 80%;
  margin-left: auto;
`;

export default RecruitmentBanner