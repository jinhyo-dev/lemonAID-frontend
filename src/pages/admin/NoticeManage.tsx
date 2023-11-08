import React, {useEffect, useState} from 'react';
import {AuthProps, Permission} from '../../interface/AuthProps.ts';
import NotFound from '../../components/NotFound.tsx';
import {Container, HeaderWrapper} from '../../style/global.ts';
import Header from '../../components/Header.tsx';
import styled from 'styled-components';
import {IoClose} from 'react-icons/io5';
import {Image, ModalContainer} from '../../components/List/List.tsx';
import Modal from 'react-modal';
import Slider from 'react-slick';
import {ModalPrevArrow} from '../../components/Modal/ModalPrevArrow.tsx';
import {ModalNextArrow} from '../../components/Modal/ModalNextArrow.tsx';
import axiosInstance from '../../utils/AxiosInstance.ts';
import LoadingModal from '../../components/LoadingModal.tsx';
import {numberWithCommas} from '../../utils/numberFormat.ts';

const NoticeManage: React.FC<AuthProps> = ({authorized, permission}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>([]);
  const [rank, setRank] = useState<number>(1)

  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ModalNextArrow/>,
    prevArrow: <ModalPrevArrow/>,
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

  const fetchData = () => {
    setLoading(true);
    axiosInstance.get('/post/pending_job_post')
      .then(res => setData(res.data.data))
      .catch(err => alert(err.response.data.message))
      .finally(() => setLoading(false));
  };

  const handleJobPost = (id: number, acceptation: boolean) => {
    setLoading(true);
    const payload = {id: [id]};

    const handleLoading = () => {
      setLoading(false)
      setIsOpen(false)
      fetchData()
    }

    if (acceptation) {
      axiosInstance.put('/post/pending_job_post', payload)
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message))
        .finally(() => handleLoading());
    } else {
      axiosInstance.delete('/post/pending_job_post', {data: payload})
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message))
        .finally(() => handleLoading());
    }
  };

  const ModalContainerComponents = () => {
    return (
      <ModalContainer>
        <div className={'close-button'}>
          <button onClick={closeModal}><IoClose/></button>
        </div>
        <div className={'image-container'}>
          <Slider {...settings}>
            {
              modalData.images.split(',').map((imageSrc: string, index: number) => {
                console.log(imageSrc);
                return (
                  <Image $url={import.meta.env.VITE_API_URL + imageSrc} key={index}>
                    <div>{index + 1} / {modalData.images.split(',').length}</div>
                  </Image>
                );
              })
            }
          </Slider>
        </div>
        <div className={'institute-name'}>
          <div>{modalData.academy}</div>
          <div>{modalData.campus}</div>
        </div>
        <div className={'table'}>
          <div><span>Position</span><span>{modalData.position}</span></div>
          <div>
            <span>Salary Range</span><span>{numberWithCommas(modalData.start_salary)} KRW - {numberWithCommas(modalData.end_salary)} KRW</span>
          </div>
          <div><span>Student Level</span><span>{modalData.student_level}</span></div>
          <div><span>Working Hours</span><span>{modalData.working_hours_start} - {modalData.working_hours_end}</span>
          </div>
          <div><span>Paid Vacation</span><span>{modalData.paid_vacation} Days</span></div>
          <div><span>Annual Leave</span><span>{modalData.annual_leave} Days</span></div>
          <div><span>Severance</span><span>{modalData.severance}</span></div>
          <div><span>Insurance</span><span>{modalData.insurance}</span></div>
          <div><span>Housing</span><span>{modalData.housing}</span></div>
          <div><span>Housing Allowance</span><span>{numberWithCommas(modalData.housing_allowance)} KRW</span></div>
          <div>
            <span>Rank</span>
            <select onChange={e => setRank(Number(e.target.value))} value={rank}>
              <option value={1}>Rank 1</option>
              <option value={2}>Rank 2</option>
              <option value={3}>Rank 3</option>
            </select>
          </div>
        </div>

        <div className={'accept-button'}>
          <button onClick={() => handleJobPost(modalData.ID, true)}>승인</button>
          <button onClick={() => handleJobPost(modalData.ID, false)}>비승인</button>
        </div>
      </ModalContainer>
    );
  };

  const openModal = (value: any) => {
    setModalData(value);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized}/> :
        <>
          <LoadingModal isOpen={loading}/>
          <Container style={{overflowX: 'auto'}}>
            <Modal
              closeTimeoutMS={200}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
            >
              <ModalContainerComponents/>
            </Modal>
            <HeaderWrapper>
              <Header authorized={authorized} permission={permission}/>
            </HeaderWrapper>

            <TableContainer>

              {loading ? <></> : data.length === 0 ? <div className={'non-value'}>신규 공고가 존재하지 않습니다.</div> :
                <>
                  <div className={'table'}>
                    <div className={'table-header'}>
                      <div style={{width: '70%'}}>학원명</div>
                      <div style={{width: '30%'}}>공고</div>
                    </div>

                    {Object.values(data).map((value: any, index: number) => (
                      <div key={index} className={'table-tr'}>
                        <div style={{width: '70%'}}>
                          {value.academy}
                        </div>
                        <div style={{width: '30%'}}>
                          <button onClick={() => openModal(value)}>공고 보기</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              }
            </TableContainer>
          </Container>
        </>
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