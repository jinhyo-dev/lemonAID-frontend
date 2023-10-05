import partiesBanner from "../../../assets/images/Banner/parties.png";
import styled from "styled-components";

const PartiesBanner = () => {
  return (
    <Banner>
      <Image src={partiesBanner}/>

      <div className={'text-container'}>
        <div className={'title'}>Parties &<br/>Events</div>
        <div className={'info-text'}>
          South Korea’s Premier Party Planners Brining Your<br/>
          Celebrations to the Life
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
      font-family: 'Black Ops One', cursive;
      text-align: right;
    }

    & > .info-text {
      margin-top: 13px;
      font-weight: 400;
      font-size: 18px;
      font-family: 'Commissioner', sans-serif;
      text-align: right;
      color: #3E3C39;
    }

    & > .button-container {
      margin-left: auto;
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
  width: 60%;
  margin-right: auto;
`;

export default PartiesBanner