import React, { useState } from 'react';
import { AuthProps, Permission } from '../../interface/AuthProps.ts';
import NotFound from '../../components/NotFound.tsx';
import { Container, HeaderWrapper } from '../../style/global.ts';
import Header from '../../components/Header.tsx';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { Image, ModalContainer } from '../../components/List/List.tsx';
import Modal from 'react-modal';
import Slider from 'react-slick';
import { ModalPrevArrow } from '../../components/Modal/ModalPrevArrow.tsx';
import { ModalNextArrow } from '../../components/Modal/ModalNextArrow.tsx';

const NoticeManage: React.FC<AuthProps> = ({ authorized, permission }) => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [data, setData] = useState<any>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ModalNextArrow />,
    prevArrow: <ModalPrevArrow />,
  };

  const getCustomStyles = () => {
    const width = '500px';
    const height = '865px';

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalContainerComponents = () => {
    return (
      <ModalContainer $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
        <div className={'close-button'}>
          <button onClick={closeModal}><IoClose /></button>
        </div>
        <div className={'image-container'}>
          <Slider {...settings}>
            <Image $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div>1/2</div>
            </Image>
            <Image $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div>2/2</div>
            </Image>
          </Slider>
        </div>
        <div className={'institute-name'}>
          <div>RISE</div>
          <div>Gangdong Campus</div>
        </div>
        <div className={'table'}>
          <div><span>Position</span><span>Teacher</span></div>
          <div><span>Salary Range</span><span>2,400,000 - 2,900,000 KRW</span></div>
          <div><span>Student Level</span><span>Kindy/Elemetary/Middle/High</span></div>
          <div><span>Working Hours</span><span>9:00 am - 18:00 pm</span></div>
          <div><span>Paid Vacation</span><span>3 Days</span></div>
          <div><span>Annual Leave</span><span>11 Days</span></div>
          <div><span>Severance</span><span>Provided</span></div>
          <div><span>Insurance</span><span>Provided</span></div>
          <div>
            <span>Housing</span>
            <span>Provided, <span className={'parentheses'}>(within 10min walking distance)</span></span>
          </div>
          <div>
            <span>Housing Allowance</span>
            <span>Provided, <span className={'parentheses'}>(500,000 KRW)</span></span>
          </div>
        </div>

        <div className={'accept-button'}>
          <button>승인</button>
          <button>비승인</button>
        </div>
      </ModalContainer>
    );
  };

  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized} /> :
        <Container style={{ overflowX: 'auto' }}>
          <Modal
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <ModalContainerComponents />
          </Modal>
          {/*<LoadingModal isOpen={loading} />*/}
          <HeaderWrapper>
            <Header authorized={authorized} permission={permission} />
          </HeaderWrapper>

          <TableContainer>

            {/*{loading ? <></> : data.length === 0 ? <div className={'non-value'}>신규 회원이 존재하지 않습니다.</div> :*/}
            <>
              <div className={'table'}>
                <div className={'table-header'}>
                  <div style={{ width: '70%' }}>학원명</div>
                  <div style={{ width: '30%' }}>공고</div>
                </div>

                {[...Array(10)].map((_, index: number) => (
                  <div key={index} className={'table-tr'}>
                    <div style={{ width: '70%' }}>
                      gangdong campus
                    </div>
                    <div style={{ width: '30%' }}>
                      <button onClick={() => setIsOpen(true)}>공고 보기</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
            {/*}*/}
          </TableContainer>

        </Container>
      }
    </>
  );
};

const TableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  min-width: 1400px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > .non-value {
    font-size: 2.5rem;
    font-family: 'KoPubWorldDotumBold', sans-serif;
    color: #000;
  }

  & > .table {
    width: 800px;
    height: 76vh;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-sizing: border-box;
    overflow-y: auto;

    & > div {
      width: 100%;
      display: flex;

      & > div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    & > .table-header {
      height: 4rem;
      background-color: #FAE13E;

      & > div {
        font-family: 'KoPubWorldDotumBold', sans-serif;
      }
    }

    & > .table-tr {
      background-color: #fff;
      height: 3.5em;
      border-bottom: 1px solid #ccc;

      & > div {
        font-family: 'KoPubWorldDotumLight', sans-serif;

        & > button {
          width: 5rem;
          height: 2rem;
          border: none;
          border-radius: 5px;
          background-color: #FAE13E;
        }
      }
    }
  }
`;

export default NoticeManage;