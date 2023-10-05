import Header from '../components/Header.tsx';
import styled from 'styled-components';
import recruimentBanner from '../assets/images/Banner/recruitment.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow } from '../components/NextArrow.tsx';
import { PrevArrow } from '../components/PrevArrow.tsx';
import grade1 from '../assets/images/grade/grade1.png';
import grade2 from '../assets/images/grade/grade2.png';
import grade3 from '../assets/images/grade/grade3.png';
import { HeaderWrapper } from '../style/global.ts';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import Modal from 'react-modal';
import { useEffect } from 'react';

interface ImageProps {
  $url: string;
}

interface ActivePagination {
  $isActive: boolean;
}

const Recruitment = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const employers = Array(9).fill({});
  const dotsLength = Array(3).fill({});

  const getCustomStyles = () => {
    const isSmallScreen = window.innerWidth <= 770;

    const width = isSmallScreen ? '80%' : '28vw';
    const height = isSmallScreen ? '28rem' : '77vh';

    return {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: width,
        height: height,
        padding: '0',
        zIndex: 11,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        borderRadius: '15px',
        backgroundColor: '#fff',
      },
      overlay: {
        overflow: 'auto',
        zIndex: 11,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        backdropFilter: 'blur(2px)',
      },
    };
  };

  const customStyles = getCustomStyles();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handlePagination = (increase: boolean) => {
    const MAX_PAGE = 3;
    if (!increase && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (increase && currentPage !== MAX_PAGE) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDotPagination = (index: number) => {
    setCurrentPage(index);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalIsOpen]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <ModalContainer>
          <div className={'close-button'}>
            <button><IoClose/></button>
          </div>
        </ModalContainer>
      </Modal>

      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <PageTitle>
        <div className={'text-container'}>
          <div className={'title'}>
            <div className={'first'}>Qualified</div>

            <div className={'second'}>
              <div />
              <div>Teachers</div>
            </div>

            <div className={'third'}>Reputable</div>

            <div className={'fourth'}>
              <div />
              <div>Institutions</div>
            </div>
          </div>

          <div className={'info-text'}>Briding Qualified Teachers and Leaning Institution in Korea</div>

          <div className={'button-container'}>
            <button>Learn More</button>
          </div>

        </div>
        <Image src={recruimentBanner} />
      </PageTitle>

      <PopularEmployers>
        <div>
          <div>POPULAR EMPLOYERS</div>
          <div>Empowering Education and Revolutionizing Learning Partnerships for a Brighter Future</div>
        </div>

        <div className={'image-container'}>
          <Slider {...settings}>
            <EmployerBox $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div className={'employers-image'} />
              <div className={'title'}>
                <img src={grade3} />
                <div>RISE Gangdong</div>
              </div>
              <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
              <div className={'bottom-container'}>
                <div>2,500,000 - 2,000,000 KRW</div>
                <div>Sep 1st, 2023</div>
              </div>
            </EmployerBox>

            <EmployerBox $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div className={'employers-image'} />
              <div className={'title'}>
                <img src={grade2} />
                <div>RISE Gangdong</div>
              </div>
              <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
              <div className={'bottom-container'}>
                <div>2,500,000 - 2,000,000 KRW</div>
                <div>Sep 1st, 2023</div>
              </div>
            </EmployerBox>

            <EmployerBox $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div className={'employers-image'} />
              <div className={'title'}>
                <img src={grade1} />
                <div>RISE Gangdong</div>
              </div>
              <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
              <div className={'bottom-container'}>
                <div>2,500,000 - 2,000,000 KRW</div>
                <div>Sep 1st, 2023</div>
              </div>
            </EmployerBox>

            <EmployerBox $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div className={'employers-image'} />
              <div className={'title'}>
                <img src={grade3} />
                <div>RISE Gangdong</div>
              </div>
              <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
              <div className={'bottom-container'}>
                <div>2,500,000 - 2,000,000 KRW</div>
                <div>Sep 1st, 2023</div>
              </div>
            </EmployerBox>
          </Slider>
        </div>
      </PopularEmployers>

      <AllEmployers>
        <div className={'title'}>MEET ALL EMPLOYERS</div>
        <div className={'main-container'}>
          {employers.map((_, index) => (
            <EmployerBox key={index} $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'} onClick={openModal}>
              <div className={'employers-image'} />
              <div className={'title'}>
                <img src={grade3} />
                <div>RISE Gangdong</div>
              </div>
              <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
              <div className={'bottom-container'}>
                <div>2,500,000 - 2,000,000 KRW</div>
                <div>Sep 1st, 2023</div>
              </div>
            </EmployerBox>
          ))}
        </div>

        <div className={'pagination-container'}>
          <FiChevronLeft onClick={() => handlePagination(false)} />
          {dotsLength.map((_, index) => (
            <Dot $isActive={index === currentPage} onClick={() => handleDotPagination(index)} />
          ))}
          <FiChevronRight onClick={() => handlePagination(true)} />
        </div>
      </AllEmployers>
    </div>
  )
    ;
};

const ModalContainer = styled.div`
  width: 90%;
  height: 95%;
  margin: auto;
  background: #faa;
`;

const PageTitle = styled.div`
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

const PopularEmployers = styled.div`
  margin: 65px auto 0;
  width: 1200px;
  height: 700px;

  & > div > div {
    margin: auto;
    width: 420px;
    text-align: center;
    font-family: 'Commissioner', 'sans-serif';

    &:first-child {
      font-size: 32px;
      font-weight: 600;
    }

    &:last-child {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 400;
      color: #3E3C39;
    }
  }

  & > .image-container {
    margin: 70px auto;
    height: 390px;

    & > * {
      width: 100%;
      height: 100%;
    }
  }
`;

const EmployerBox = styled.div<ImageProps>`
  width: 386px !important;
  height: 510px;

  * {
    font-family: 'Commissioner', 'sans-serif' !important;
  }

  & > .employers-image {
    width: 386px;
    height: 386px;
    background-size: cover;
    overflow: hidden;
    background-position: center;
    border-radius: 10px;
    background-image: url(${({ $url }) => $url});
  }

  & > .title {
    margin-top: 15px;
    display: flex;
    height: 31px;
    width: 100%;
    font-weight: 600;
    font-size: 20px;

    & > img {
      width: 31px;
    }

    & > div {
      margin-top: 3.5px;
      margin-left: 12px;
      width: auto;
      color: #010101;
      align-content: center;
      display: flex;
      justify-content: center;
    }
  }

  & > .subtitle {
    width: 100%;
    margin-top: 5px;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    color: #3E3C39;
  }

  & > .bottom-container {
    margin-top: 20px;
    bottom: 0;
    width: 100%;
    display: flex;

    & > div {
      display: flex;
      align-items: center;
      width: auto;
      padding-left: 20px;
      padding-right: 20px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #EDEDED;
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      background: #F8FAFB;

      &:first-child {
        margin-right: 7px;
      }
    }
  }
`;

const AllEmployers = styled.div`
  margin: 100px auto 30px;
  height: 1400px;
  width: 1200px;

  * {
    font-family: 'Commissioner', 'sans-serif';
  }

  & > .title {
    margin: 0 auto 20px;
    width: auto;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
  }

  & > .main-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    & > div {
      margin-top: 50px;
      flex: 1 0 calc(33.3333% - 20px);
      margin-right: 5px;
      margin-left: 5px;
    }
  }

  & > .pagination-container {
    margin: 70px auto;
    width: auto;
    height: 17px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    & > svg {
      color: #F4B723;
      font-size: 30px;
      cursor: pointer;
    }
  }
`;

const Dot = styled.div<ActivePagination>`
  height: 8px;
  margin-left: 6px;
  cursor: pointer;
  width: ${({ $isActive }) => $isActive ? '36px' : '8px'};
  border-radius: 100px;
  background: ${({ $isActive }) => $isActive ? '#F4B723' : '#D9D9D9'};
  transition: all .3s;

  &:first-child {
    margin-left: 0;
  }
`;

export default Recruitment;