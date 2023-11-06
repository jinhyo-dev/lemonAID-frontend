import Header from '../Header.tsx';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow } from '../NextArrow.tsx';
import { PrevArrow } from '../PrevArrow.tsx';
// import grade1 from '../../assets/images/grade/grade1.png';
// import grade2 from '../../assets/images/grade/grade2.png';
import grade3 from '../../assets/images/grade/grade3.png';
import { HeaderWrapper } from '../../style/global.ts';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import * as React from 'react';
import { AuthProps, Permission } from '../../interface/AuthProps.ts';
import { debounce } from 'lodash';
import Banner from './Banner.tsx';
import { ModalNextArrow } from '../Modal/ModalNextArrow.tsx';
import { ModalPrevArrow } from '../Modal/ModalPrevArrow.tsx';
import axiosInstance from '../../utils/AxiosInstance.ts';
import LoadingModal from '../LoadingModal.tsx';
import { numberWithCommas } from '../../utils/numberFormat.ts';
import { formatDateString } from '../../utils/FormatDate.ts';
import LemonaidLogo from '../../assets/images/logo/Lemonaid-1.png';

interface ImageProps {
  $url: string;
}

interface ActivePagination {
  $isActive: boolean;
}

export interface PageType extends AuthProps {
  $type: 'recruitment' | 'tour' | 'parties';
}

interface ActiveSort {
  $isActive: boolean;
}

const List: React.FC<PageType> = ({ $type, authorized, permission }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<'none' | 'dateAsc' | 'dateDesc' | 'priceAsc' | 'priceDesc'>('none');
  const [loading, setLoading] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(1920);
  const [pageLength, setPageLength] = useState<number>(NaN);

  const [data, setData] = useState<any>([]);
  const [modalData, setModalData] = useState<any>([]);
  const scrollToFocus = useRef<HTMLDivElement | null>(null);

  const handleResize = debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 200);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchData = () => {
    setLoading(true);
    axiosInstance.get($type === 'tour' ? '/post/tour' : '')
      .then(res => {
        if (res.data.status === 200) {
          const chunkedData = res.data.data.reduce((resultArray: any, item: any, index: number) => {
            const chunkIndex = Math.floor(index / 9);

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = []; // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          }, []);

          setData(chunkedData);
          setPageLength(Math.ceil(res.data.data.length / 9));
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const getCustomStyles = () => {
    const isSmallScreen = window.innerWidth <= 770;

    const width = isSmallScreen ? '80%' : '500px';
    const height = isSmallScreen ? '80%' : '865px';

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
    slidesToShow: screenWidth >= 750 ? 3 : 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const modalSetting = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ModalNextArrow />,
    prevArrow: <ModalPrevArrow />,
  };

  const handlePagination = (increase: boolean) => {
    if (!increase && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (increase && (currentPage !== pageLength)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDotPagination = (index: number) => {
    setCurrentPage(index);
  };

  const openModal = (value: any) => {
    setModalData(value);
    authorized ? setIsOpen(true) : alert('Available after sign in');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const sortData = () => {
    const sortedData: any = [...data];
    switch (sortType) {
      case 'dateAsc':
        sortedData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'dateDesc':
        sortedData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'priceAsc':
        sortedData.sort((a: any, b: any) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedData.sort((a: any, b: any) => b.price - a.price);
        break;
      default:
        break;
    }

    setData(sortedData);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalIsOpen]);

  useEffect(() => {
    scrollToFocus.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    sortData()
  }, [sortType]);

  useEffect(() => {
    fetchData();
  }, []);

  const ModalContainerComponents = () => {
    return (
      <ModalContainer $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
        <div className={'close-button'}>
          <button onClick={closeModal}><IoClose /></button>
        </div>
        <div className={'image-container'}>
          <Slider {...modalSetting}>
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
            {/*<Image $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div>1/2</div>
            </Image>
            <Image $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
              <div>2/2</div>
            </Image>*/}
          </Slider>
        </div>
        <div className={'institute-name'}>
          <div>{modalData.tour_name}</div>
          <div>{modalData.description}</div>
        </div>
        <div className={'table'}>
          <div>
            <span>{$type === 'recruitment' ? 'Position' : 'Company'}</span><span>{$type === 'recruitment' ? 'Teacher' : modalData.company}</span>
          </div>
          <div>
            <span>{$type === 'recruitment' ? 'Salary Range' : 'Theme'}</span><span>{$type === 'recruitment' ? '2,400,000 - 2,900,000 KRW' : modalData.theme}</span>
          </div>
          <div>
            <span>{$type === 'recruitment' ? 'Student Level' : 'Location'}</span><span>{$type === 'recruitment' ? 'Elementary' : modalData.location}</span>
          </div>
          <div>
            <span>{$type === 'recruitment' ? 'Working Hours' : 'Date'}</span><span>{$type === 'recruitment' ? '9:00 am - 18:00 pm' : formatDateString(modalData.date)}</span>
          </div>
          <div>
            <span>{$type === 'recruitment' ? 'Paid Vacation' : 'Price'}</span><span>{$type === 'recruitment' ? '3 Days' : `${numberWithCommas(modalData.price)} KRW`}</span>
          </div>
          <div>
            <span>{$type === 'recruitment' ? 'Annual Leave' : 'Itinerary'}</span><span>{$type === 'recruitment' ? '11 Days' : modalData.itinerary}</span>
          </div>
          {$type === 'recruitment' && <>
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
          </>}
        </div>

        <div className={'apply-button'}>
          <button>Apply</button>
        </div>
      </ModalContainer>
    );
  };

  return (
    <div>
      <LoadingModal isOpen={loading} />
      {
        !loading &&
        <>
          <Modal
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <ModalContainerComponents />
          </Modal>

          <HeaderWrapper ref={scrollToFocus}>
            <Header authorized={authorized} permission={permission} />
          </HeaderWrapper>

          <Banner $type={$type} authorized={authorized} permission={permission} />

          {$type === 'recruitment' &&
            <PopularEmployers>
              <div>
                <div>{$type === 'recruitment' ? 'POPULAR EMPLOYERS' : $type === 'tour' ? 'UPCOMING TOURS' : 'UPCOMING PARTIES & EVENTS'}</div>
                <div>
                  {$type === 'recruitment' ? 'Empowering Education and Revolutionizing Learning Partnerships for a Brighter Future'
                    : $type === 'tour' ? 'Korea’s Leading Local Tour Company Guides You Through Experiences Beyond Campare'
                      : 'Korea’s Leading Local Tour Company Guides You Through Experiences Beyond Campare'}
                </div>
              </div>

              <div className={'image-container'}>
                <Slider {...settings}>
                  {[...Array(4)].map((_, index: number) => (
                    <EmployerBox className={'employer-container'} key={index}
                                 $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
                      <div className={'employers-image'} />
                      <div className={'title'}>
                        {permission === Permission.ADMIN && <img src={grade3} alt={'grade'} />}
                        <div>RISE Gangdong</div>
                      </div>
                      <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
                      <div className={'bottom-container'}>
                        <div>2,500,000 - 2,000,000 KRW</div>
                        <div>Sep 1st, 2023</div>
                      </div>
                    </EmployerBox>
                  ))}

                </Slider>
              </div>
            </PopularEmployers>
          }

          <ListContainer $type={$type}>
            <div className={'title'}>
              {$type === 'recruitment' ? 'MEET ALL EMPLOYERS' : $type === 'tour' ? 'UPCOMING TOURS' : 'UPCOMING PARTIES & EVENTS'}
            </div>

            {$type !== 'recruitment' &&
              <div className={'sub-title'}>
                {$type === 'tour' ? 'Korea’s Leading Local Tour Company Guides You Through Experiences Beyond Campare'
                  : 'Korea’s Leading Local Tour Company Guides You Through Experiences Beyond Campare'}
              </div>
            }

            <div className={'button-container'}>
              <SortButton $isActive={sortType === 'priceDesc'} onClick={() => setSortType('priceDesc')}>Low Price</SortButton>
              <SortButton $isActive={sortType === 'priceAsc'} onClick={() => setSortType('priceAsc')}>High Price</SortButton>
              <SortButton $isActive={sortType === 'dateDesc'} onClick={() => setSortType('dateDesc')}>Latest date</SortButton>
              <SortButton $isActive={sortType === 'dateAsc'} onClick={() => setSortType('dateAsc')}>Oldest date</SortButton>
            </div>

            <div className={'main-container'}>
              {data.length > 0 ?
                Object.values(data[currentPage - 1]).map((value: any, index) => (
                  $type === 'recruitment' ?
                    <EmployerBox key={index} onClick={() => openModal(value)}
                                 $url={value.images ? import.meta.env.VITE_API_URL + value.images.split(',')[0] : LemonaidLogo}>
                      <div className={'employers-image'} />
                      <div className={'title'}>
                        {permission === Permission.ADMIN && <img src={grade3} alt={'grade'} />}
                        <div>RISE Gangdong</div>
                      </div>
                      <div className={'subtitle'}>서울시 강동구 성내로 25 (성내동)</div>
                      <div className={'bottom-container'}>
                        <div>2,500,000 - 2,000,000 KRW</div>
                        <div>Sep 1st, 2023</div>
                      </div>
                    </EmployerBox> :
                    <TourAndPartiesBox key={index} onClick={() => openModal(value)}
                                       $url={value.images ? import.meta.env.VITE_API_URL + value.images.split(',')[0] : LemonaidLogo}>
                      <div className={'container'}>
                        <div className={'employers-image'} />
                        <div className={'title'}>{value.tour_name}</div>
                        <div className={'subtitle'}>{value.description}</div>
                        <div className={'date'}>Date: {formatDateString(value.date)}</div>
                        <div className={'bottom-container'}>
                          <div>{numberWithCommas(value.price)} KRW</div>
                          <button>Learn More</button>
                        </div>
                      </div>
                    </TourAndPartiesBox>
                ))
                : <NoneData>There is no post.</NoneData>
              }
            </div>

            <div className={'pagination-container'}>
              <FiChevronLeft onClick={() => handlePagination(false)} />
              {Array.from({ length: pageLength }, (_, index) => (
                <Dot $isActive={index + 1 === currentPage} onClick={() => handleDotPagination(index + 1)} key={index} />
              ))}
              <FiChevronRight onClick={() => handlePagination(true)} />
            </div>
          </ListContainer>
        </>
      }
    </div>
  );
};

export const ModalContainer = styled.div<ImageProps>`
  width: 90%;
  height: 95%;
  margin: auto;

  * {
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
  }

  & > .close-button {
    width: 100%;
    height: 28px;

    @media (max-width: 500px) {
      display: none;
    }

    & > button {
      float: right;
      height: 28px;
      width: 28px;
      background: #EDEDED;
      border: 1px solid #D4D4D4;
      border-radius: 50%;

      & > svg {
        margin-top: .1rem;
        margin-left: -.175rem;
        font-size: 20px;
        color: #817C70;
      }
    }
  }

  & > .image-container {
    width: 100%;
    height: 200px;
    background-size: cover;
    overflow: hidden;
    background-position: center;
    margin: 10px 0 15px;
    border-radius: 10px;
  }

  & > .image-submit-container {
    width: 100%;
    height: 200px;
    margin: 10px 0 15px;
    border-radius: 10px;

    & > input[type='file'] {
      display: none;
    }

    & > .file-label-full {
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, .65);
      color: #fff;
      cursor: pointer;
      border-radius: 10px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      display: flex;

      & > div {
        font-family: 'KoPubWorldDotumBold', sans-serif;

        &:first-child {
          font-size: 1.8rem;

          @media (max-width: 500px) {
            font-size: 1rem;
          }
        }

        &:last-child {
          font-size: .85rem;

          @media (max-width: 500px) {
            font-size: .6rem;
          }
        }
      }
    }

    & > .label-container {
      width: 100%;
      height: 200px;
      overflow: auto;

      & > label {
        cursor: pointer;

        & > div {
          margin: 15px auto 0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          width: 98%;
          height: 50px;
          box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          box-sizing: border-box;

          @media (max-width: 500px) {
            height: 40px;
            font-size: 12px;
            padding-left: .8rem;
            padding-right: .8rem;
          }

          & > div {
            width: 90%;
          }

          & > button {
            margin-left: auto;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 24px;
            color: #ef4444;

            @media (max-width: 500px) {
              font-size: 17px;
            }

            & > svg {
              margin-bottom: -4px;
            }
          }
        }
      }

      & > .file-single-label-hidden {
        & > div {
          border: none;
          box-shadow: none;
          display: flex;
          align-items: center;
          background-color: rgb(0, 0, 0, .6);

          & > div {
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 16px;

            @media (max-width: 500px) {
              font-size: 12px;

              & > svg {
                font-size: 14.5px !important;
              }
            }

            & > svg {
              margin-bottom: -3px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }

  & > .institute-name {
    width: 100%;
    height: 60px;

    @media (max-width: 750px) {
      height: 40px;
    }

    background: #F8FAFB;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      &:first-child {
        padding-left: 2rem;
        font-size: 25px;
        font-weight: 600;
      }

      &:last-child {
        font-size: 16px;
        font-weight: 400;
        padding-right: 2rem;
      }

      @media (max-width: 750px) {
        &:first-child {
          padding-left: 1rem;
          font-size: 16px;
          font-weight: 600;
        }

        &:last-child {
          font-size: 12px;
          font-weight: 400;
          padding-right: 1rem;
        }
      }
    }
  }

  & .table {
    margin: 15px 0 15px;
    width: 100%;
    height: 420px;
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 500px) {
      height: 330px;
    }

    & > div {
      height: auto;
      width: 100%;

      @media (max-width: 500px) {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:first-child {
          margin-top: 15px !important;
        }

        &:last-child {
          margin-bottom: 15px !important;
        }
      }

      &:first-child {
        margin-top: 20px;
      }

      &:last-child {
        margin-bottom: 20px;
      }

      & .parentheses {
        font-size: 13px;

        @media (max-width: 500px) {
          font-size: 8.5px;
        }
      }

      & > span {
        font-weight: 400;
        font-size: 16px;

        &:first-child {
          padding-left: 25px;
          color: #817C70;
        }

        &:last-child {
          float: right;
          padding-right: 25px;
          color: #000;
        }

        @media (max-width: 500px) {
          font-size: 10px;

          &:first-child {
            padding-left: 1rem;
          }

          &:last-child {
            padding-right: 1rem;
          }
        }
      }
    }
  }

  & .submit-table {
    height: 510px;

    & > div {
      display: flex;
      align-items: center;

      select,
      input {
        margin-left: auto;
        width: 9.5rem;
        padding-left: .5rem;
        padding-right: .5rem;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #B2B1AD;
        box-sizing: border-box;
        font-size: 11px;
        transition: all .1s;

        @media (max-width: 500px) {
          width: 7.5rem;
        }

        &:focus {
          border: none;
          outline: 2px solid #F7C324;
        }
      }

      select {
        color: #000;
      }

      select:last-child,
      input:last-child {
        margin-right: 1rem;
      }

      & > .double-input-container {
        margin-right: 1rem;
        margin-left: auto;
        width: auto;
        display: flex;
        align-items: center;
        height: 100%;

        & > span {
          margin-left: .35rem;
          margin-right: .35rem;
          color: #B2B1AD;
          font-size: 12px;
        }

        & > .react-datepicker-wrapper {
          height: 100%;
          width: 7rem;

          @media (max-width: 500px) {
            width: 4.5rem;
          }

          & input {
            width: 100%;
          }
        }

        & > input {
          width: 8rem;
          margin: 0;
          height: 100%;

          @media (max-width: 500px) {
            width: 4.5rem;
          }
        }
      }
    }
  }

  & .tour-submit-table {
    & > div {
      height: 2.5rem;
    }

    input {
      width: 15rem !important;
      font-size: 14px !important;
    }
  }

  & .apply-button {
    width: 100%;
    height: 45px;
    text-align: center;

    & > button {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      border: none;
      cursor: pointer;
      background: #FAE13E;
      color: #000;
      transition: background-color .25s;
      margin-bottom: 1rem;

      &:hover {
        background: #dcc532;
      }
    }
  }

  & .accept-button {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;

    & > button {
      border-radius: 5px;
      width: 48%;
      height: 100%;
      border: none;
      cursor: pointer;
      background: #FAE13E;
      font-size: 18px;
      transition: background-color .25s;

      &:last-child {
        background: #ccc;
      }
    }
  }
`;

const PopularEmployers = styled.div`
  margin: 65px auto 0;
  width: 1200px;
  height: 700px;

  @media (max-width: 750px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    height: auto;
  }

  & > div > div {
    margin: auto;
    width: 420px;
    text-align: center;
    font-family: 'KoPubWorldDotumBold', 'sans-serif';

    @media (max-width: 750px) {
      width: 100%;
    }

    &:first-child {
      font-size: 32px;
      font-weight: 600;

      @media (max-width: 750px) {
        font-size: 28px;
      }

      @media (max-width: 500px) {
        font-size: 20px;
      }
    }

    &:last-child {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 400;
      color: #3E3C39;

      @media (max-width: 750px) {
        width: 80%;
      }

      @media (max-width: 500px) {
        font-size: 13px;
      }
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

  & .employer-container {
    margin-top: 5px;

    & .title > div {
      color: #F4B723;
    }

    & > .bottom-container > div {
      border: 1px solid #FAE13E;
      background: #FFFBD4;
    }
  }
`;

const EmployerBox = styled.div<ImageProps>`
  width: 386px !important;
  height: 510px;
  cursor: pointer;
  border-radius: 10px;
  transition: all .25s;

  @media (max-width: 500px) {
    width: 100% !important;
    height: 420px;
  }

  &:hover {
    transform: translateY(-5px);
  }

  * {
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
  }

  & > .employers-image {
    width: 386px;
    height: 386px;
    background-size: cover;
    overflow: hidden;
    background-position: center;
    border-radius: 10px;
    background-image: url(${({ $url }) => $url});
    margin: auto;

    @media (max-width: 500px) {
      width: 100% !important;
      height: 312px;
    }
  }

  & > .title {
    margin-top: 15px;
    display: flex;
    align-items: center;
    height: 31px;
    width: 100%;
    font-weight: 600;
    font-size: 20px;

    @media (max-width: 500px) {
      font-size: 16px;
      margin-top: 8px;
    }

    & > img {
      width: 31px;
      margin-right: 12px;

      @media (max-width: 500px) {
        height: 24px;
        width: 24px;
      }
    }

    & > div {
      margin-top: 3.5px;
      width: auto;
      color: #010101;
      align-content: center;
      display: flex;
      justify-content: center;
    }
  }

  & > .subtitle {
    font-family: 'KoPubWorldDotumLight', 'sans-serif';
    width: 100%;
    margin-top: 5px;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    color: #3E3C39;

    @media (max-width: 500px) {
      font-size: 13px;
    }
  }

  & > .bottom-container {
    margin-top: 20px;
    bottom: 0;
    width: 100%;
    display: flex;

    & > div {
      font-family: 'KoPubWorldDotumLight', 'sans-serif';
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

      @media (max-width: 500px) {
        font-size: 11px;
        padding-left: 15px;
        padding-right: 15px;
        height: 20px;
      }

      &:first-child {
        margin-right: 7px;
      }
    }
  }
`;

const TourAndPartiesBox = styled.div<ImageProps>`
  width: 386px;
  height: 510px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0, rgba(27, 31, 35, 0.15) 0 0 0 1px;
  transition: all .25s;

  @media (max-width: 750px) {
    width: 50% !important;
  }

  @media (max-width: 500px) {
    width: 100% !important;
    height: 460px;
  }

  &:hover {
    transform: translateY(-5px);
  }

  * {
    font-family: 'KoPubWorldDotumBold', sans-serif;
  }

  & > .container {
    width: 360px;
    height: 480px;

    @media (max-width: 750px) {
      width: 90%;
      height: 95%;
    }

    & > .employers-image {
      width: 100%;
      height: 348px;
      margin: auto;
      background-size: cover;
      overflow: hidden;
      background-position: center;
      border-radius: 10px;
      background-image: url(${({ $url }) => $url});

      @media (max-width: 750px) {
        width: 100% !important;
        height: 312px;
      }
    }

    & > .title {
      margin-top: 13px;
      width: 100%;
      font-weight: 600;
      font-size: 20px;

      @media (max-width: 500px) {
        font-size: 16px;
      }
    }

    & > .subtitle {
      width: 100%;
      margin-top: 3px;
      text-align: left;
      font-size: 16px;
      font-family: 'KoPubWorldDotumLight', sans-serif;
      color: #3E3C39;

      @media (max-width: 500px) {
        font-size: 13px;
      }
    }

    & > .date {
      width: 100%;
      font-family: 'KoPubWorldDotumLight', sans-serif;
      text-align: left;
      font-size: 14px;
      font-weight: 400;
      color: #3E3C39;

      @media (max-width: 500px) {
        font-size: 12px;
      }
    }

    & > .bottom-container {
      margin-top: 6px;
      height: 35px;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 500px) {
        height: 28px;
      }

      & > div {
        font-size: 20px;
        font-weight: 600;

        @media (max-width: 500px) {
          font-size: 16px;
        }
      }

      & > button {
        background-color: #FFFBD4;
        color: #F4B723;
        width: 125px;
        height: 100%;
        border: none;
        border-radius: 5px;

        @media (max-width: 500px) {
          width: 100px;
        }
      }
    }
  }
`;

const ListContainer = styled.div<Pick<PageType, '$type'>>`
  margin: 100px auto 10px;
  height: 1400px;
  width: 1200px;

  @media (max-width: 750px) {
    width: 100%;
  }

  * {
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
  }

  & > .title {
    margin: 0 auto 36px;
    width: auto;
    font-size: 32px;
    font-weight: 600;
    text-align: center;

    @media (max-width: 500px) {
      font-size: 20px;
    }
  }

  & > .button-container {
    width: 600px;
    margin: ${({ $type }) => $type === 'recruitment' ? '20px auto' : '30px auto 0'};
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 750px) {
      width: 550px;
    }

    @media (max-width: 500px) {
      width: 90%;
    }
  }

  & > .sub-title {
    font-size: 16px;
    font-weight: 400;
    color: #3E3C39;
    margin: -15px auto 0;
    width: 420px;
    text-align: center;
    font-family: 'KoPubWorldDotumBold', 'sans-serif';

    @media (max-width: 500px) {
      font-size: 13px;
      width: 90%;
    }
  }

  & > .main-container {
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    //justify-content: space-between;

    @media (max-width: 750px) {
      width: 95%;
      margin: auto;
    }

    & > div {
      margin-top: 50px;
      margin-left: 7px;
      margin-right: 7px;
      //width: calc(33.33333% - 20px);

      @media (max-width: 750px) {
        max-width: calc(50% - 10px); /* 750px 미만에서는 한 줄에 2개만 표시 */
        margin-left: 5px;
        margin-right: 5px;
      }

      @media (max-width: 500px) {
        max-width: calc(100% - 10px); /* 500px 미만에서는 한 줄에 1개만 표시 */
      }

      & > .employers-image {
        width: 100%;
      }
    }
  }


  & > .pagination-container {
    margin: 70px auto;
    padding-bottom: 100px;
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

const SortButton = styled.button<ActiveSort>`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  transition: all .3s;
  height: 100%;
  background: ${({ $isActive }) => $isActive ? '#FAE13E' : '#F8FAFB'};
  color: #000;
  border-radius: 5px;
  border: 1px solid ${({ $isActive }) => $isActive ? '#FAE13E' : '#EDEDED'};

  @media (max-width: 750px) {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    padding-left: .6rem;
    padding-right: .6rem;
  }
`;

export const Dot = styled.div<ActivePagination>`
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

export const Image = styled.div<ImageProps>`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background-size: cover;
  overflow: hidden;
  background-position: center;
  background-image: url(${({ $url }) => $url});

  & > div {
    float: right;
    width: 60px;
    border-radius: 10px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .5);
    color: #FAE13E;
    margin-top: 160px;
    text-align: center;
    margin-right: 9px;
    font-family: 'KoPubWorldDotumBold', sans-serif;
    font-size: 17px;

    @media (max-width: 500px) {
      width: 40px;
      height: 22px;
      border-radius: 7px;
      margin-top: 170px;
      font-size: 12px;
    }
  }
`;

const NoneData = styled.h1`
  text-align: center;
  margin: 15vh auto 10vh;
  font-size: 3rem;

  @media (max-width: 750px) {
    font-size: 1.8rem;
  }
`;

export default List;