import toursBanner from "../../../assets/images/Banner/tours.png";
import styled from "styled-components";

const ToursBanner = () => {
  return (
    <Banner>
      <Image src={toursBanner}/>

      <div className={'text-container'}>
        <div className={'title'}>Local Tourism</div>
        <div className={'info-text'}>
          Embark on Unparalleled Adventures Organized by<br/>
          Leading Tour Companies in South Korea
        </div>
        <div className={'button-container'}>
          <button>Learn More</button>
        </div>
      </div>
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
    height: 60%;

    & > .title {
      font-size: 60px;
      font-family: 'Tenada', cursive;
    }

    & > .info-text {
      font-weight: 400;
      font-size: 18px;
      font-family: 'KoPubWorldDotumBold', sans-serif;
      text-align: right;
      color: #3E3C39;
    }

    & > .button-container {
      margin-left: auto;
      width: 166px;
      height: 45px;

      & > button {
        margin-top: 40px;
        font-family: 'KoPubWorldDotumBold', sans-serif;
        width: 100%;
        font-size: 16px;
        height: 100%;
        border-radius: 10px;
        background: #FFFBD4;
        border: none;
      }
    }
  }
`;

const Image = styled.img`
  width: 60%;
  margin-left: auto;
`;

export default ToursBanner