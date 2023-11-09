import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {AuthProps, Permission} from '../../interface/AuthProps.ts';
import NotFound from '../../components/NotFound.tsx';
import LoadingModal from '../../components/LoadingModal.tsx';
import {Container, HeaderWrapper} from '../../style/global.ts';
import Header from '../../components/Header.tsx';
import axiosInstance from "../../utils/AxiosInstance.ts";
import {ModalNextArrow} from "../../components/Modal/ModalNextArrow.tsx";
import {ModalPrevArrow} from "../../components/Modal/ModalPrevArrow.tsx";
import {IoClose} from "react-icons/io5";
import Slider from "react-slick";
import {
  Dot,
  EmployerBox,
  Image,
  ListContainer,
  ModalContainer,
  NoneData,
  SortButton
} from "../../components/List/List.tsx";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import LemonaidLogo from "../../assets/images/logo/Lemonaid-1.png";
import grade1 from "../../assets/images/grade/grade1.png";
import grade2 from "../../assets/images/grade/grade2.png";
import grade3 from "../../assets/images/grade/grade3.png";
import {numberWithCommas} from "../../utils/numberFormat.ts";
import {formatDateString} from "../../utils/FormatDate.ts";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

const NoticeManage: React.FC<AuthProps> = ({authorized, permission}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<'none' | 'dateAsc' | 'dateDesc' | 'priceAsc' | 'priceDesc'>('none');
  const [loading, setLoading] = useState<boolean>(true);
  const [pageLength, setPageLength] = useState<number>(NaN);

  const [data, setData] = useState<any>([]);
  const [modalData, setModalData] = useState<any>([]);
  const scrollToFocus = useRef<HTMLDivElement | null>(null);

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

  const modalSetting = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ModalNextArrow/>,
    prevArrow: <ModalPrevArrow/>,
  };

  const fetchData = () => {
    setLoading(true);
    axiosInstance.get('/post/job_post')
      .then(res => {
        if (res.data.status === 200) {
          setData(chunkedData(res.data.data));
          setPageLength(Math.ceil(res.data.data.length / 9));
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const chunkedData = (rawData: any): any => {
    return rawData.reduce((resultArray: any, item: any, index: number) => {
      const chunkIndex = Math.floor(index / 9);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  };

  const sortData = () => {
    const flatData: any = flattenData(data);

    switch (sortType) {
      case 'dateDesc':
        flatData.sort((a: any, b: any) => new Date(a.CreatedAt).getDate() - new Date(b.CreatedAt).getDate());
        break;
      case 'dateAsc':
        flatData.sort((a: any, b: any) => new Date(b.CreatedAt).getDate() - new Date(a.CreatedAt).getDate());
        break;
      case 'priceDesc':
        flatData.sort((a: any, b: any) => (a.start_salary - b.end_salary));
        break;
      case 'priceAsc':
        flatData.sort((a: any, b: any) => (b.start_salary - a.end_salary));
        break;
      default:
        break;
    }

    setData(chunkedData(flatData));
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalIsOpen]);

  const flattenData = (chunkedData: any[]): any[] => {
    return chunkedData.flat();
  };

  const openModal = (value: any) => {
    const newWorkingHoursStart = new Date(new Date().setHours(
      Number(value.working_hours_start.split(':')[0]),
      Number(value.working_hours_start.split(':')[1])
    ));

    const newWorkingHoursEnd = new Date(new Date().setHours(
      Number(value.working_hours_end.split(':')[0]),
      Number(value.working_hours_end.split(':')[1])
    ));

    setModalData({
      ...value,
      working_hours_start: newWorkingHoursStart,
      working_hours_end: newWorkingHoursEnd
    });
    authorized ? setIsOpen(true) : alert('Available after sign in');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePagination = (increase: boolean) => {
    if (!increase && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (increase && (currentPage !== pageLength)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: any = {};
    setLoading(true)

    for (const key in modalData) {
      if (Object.prototype.hasOwnProperty.call(modalData, key)) {
        let newValue = modalData[key];

        if (['working_hours_start', 'working_hours_end'].includes(key)) {
          const value = modalData[key];
          newValue = `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
        }

        if (!['CreatedAt', 'DeletedAt', 'UpdatedAt', 'location', 'user_id'].includes(key)) {
          payload[key.toLowerCase()] = ['paid_vacation', 'annual_leave', 'rank'].includes(key) ? Number(newValue) : newValue;
        }
      }
    }

    axiosInstance.put('/post/job_post', payload)
      .then(res => {
        if (res.status === 200) {
          alert(res.data.message);
          closeModal();
          fetchData();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert(err.response.data.message))
      .finally(() => setLoading(false))
  };

  const handlePostData = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null, dateDivision?: string) => {
    if (event instanceof Date || null) {
      dateDivision &&
      setModalData((prevState: any) => ({
        ...prevState,
        [dateDivision]: event,
      }));
    } else {
      const {name, value} = event!.target;

      setModalData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDotPagination = (index: number) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    scrollToFocus.current?.scrollIntoView({behavior: 'smooth'});
  }, [currentPage]);

  useEffect(() => {
    sortData();
  }, [sortType]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized}/> :
        <>
          <LoadingModal isOpen={loading}/>

          <Modal
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <ModalContainer>
              <div className={'close-button'}>
                <button onClick={closeModal}><IoClose/></button>
              </div>

              <div className={'image-container'}>
                {
                  modalData.images &&
                    <Slider {...modalSetting}>
                      {modalData.images.split(',').map((imageSrc: string, index: number) => (
                        <Image $url={import.meta.env.VITE_API_URL + imageSrc} key={index}>
                          <div>{index + 1} / {modalData.images.split(',').length}</div>
                        </Image>
                      ))}
                    </Slider>
                }
              </div>

              <form onSubmit={handleSubmit}>
                <div className={'table submit-table'}>
                  <div>
                    <span>Academy name</span>
                    <input type={'text'} placeholder={'e.g. RISE'} name={'academy'}
                           value={modalData.academy} required={true} onChange={handlePostData}/>
                  </div>

                  <div>
                    <span>Campus name</span>
                    <input type={'text'} placeholder={'e.g. Gangdong Campus'} name={'Campus'}
                           value={modalData.Campus} required={true} onChange={handlePostData}/>
                  </div>
                  <div>
                    <span>Category</span>
                    <select name={'category'} value={modalData.category} required={true} onChange={handlePostData}>
                      <option value={'Full Time'}>Full Time</option>
                      <option value={'Part Time'}>Part Time</option>
                    </select>
                  </div>

                  <div>
                    <span>Position</span>
                    <select name={'position'} value={modalData.position} required={true} onChange={handlePostData}>
                      <option value={'Native Teacher'}>Native Teacher</option>
                      <option value={'Bilingual Teacher'}>Bilingual Teacher</option>
                    </select>
                  </div>

                  <div>
                    <span>Salary Range</span>

                    <div className={'double-input-container'}>
                      <input type={'text'} placeholder={'Amount (Unit: KRW)'} name={'start_salary'}
                             value={isNaN(modalData.start_salary) ? '' : modalData.start_salary}
                             required={true} onChange={handlePostData}/>
                      <span>-</span>
                      <input type={'text'} placeholder={'Amount (Unit: KRW)'} name={'end_salary'}
                             value={isNaN(modalData.end_salary) ? '' : modalData.end_salary}
                             required={true} onChange={handlePostData}/>
                    </div>
                  </div>

                  <div>
                    <span>Student Level</span>
                    <select name={'student_level'} value={modalData.student_level} required={true}
                            onChange={handlePostData}>
                      <option>Kindy</option>
                      <option>Elementary</option>
                      <option>Middle</option>
                      <option>High</option>
                    </select>
                  </div>

                  <div>
                    <span>Working Hours</span>
                    <div className={'double-input-container'}>
                      <DatePicker showTimeSelectOnly={true} showTimeSelect={true} timeCaption='Time' timeIntervals={30}
                                  placeholderText={'Start hour'} className={'time-picker'} dateFormat='h:mm aa'
                                  value={modalData.working_hours_start ? modalData.working_hours_start.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }) : undefined}
                                  onChange={e => handlePostData(e, 'working_hours_start')}/>
                      <span>-</span>
                      <DatePicker showTimeSelectOnly={true} showTimeSelect={true} timeCaption='Time' timeIntervals={30}
                                  placeholderText={'End hour'} className={'time-picker'} dateFormat='h:mm aa'
                                  value={modalData.working_hours_end ? modalData.working_hours_end.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }) : undefined}
                                  onChange={e => handlePostData(e, 'working_hours_end')}/>
                    </div>
                  </div>

                  <div>
                    <span>Paid Vacation</span>
                    <input type={'text'} placeholder={'Unit: day'} name={'paid_vacation'}
                           value={isNaN(modalData.paid_vacation) ? '' : modalData.paid_vacation}
                           required={true} onChange={handlePostData}/>
                  </div>

                  <div>
                    <span>Annual Leave</span>
                    <input type={'text'} placeholder={'Unit: day'} name={'annual_leave'}
                           value={isNaN(modalData.annual_leave) ? '' : modalData.annual_leave}
                           required={true} onChange={handlePostData}/>
                  </div>

                  <div>
                    <span>Severance</span>
                    <select name={'severance'} value={modalData.severance} required={true} onChange={handlePostData}>
                      <option value={'Provided'}>Provided</option>
                      <option value={'Not Provided'}>Not Provided</option>
                    </select>
                  </div>

                  <div>
                    <span>Insurance</span>
                    <select name={'insurance'} value={modalData.insurance} required={true} onChange={handlePostData}>
                      <option value={'Provided'}>Provided</option>
                      <option value={'Not Provided'}>Not Provided</option>
                    </select>
                  </div>

                  <div>
                    <span>Housing</span>
                    <select name={'housing'} value={modalData.housing} required={true} onChange={handlePostData}>
                      <option value={'Provided'}>Provided</option>
                      <option value={'Not Provided'}>Not Provided</option>
                    </select>
                  </div>

                  <div>
                    <span>Housing Allowance</span>
                    <input type={'text'} placeholder={'Amount (Unit: KRW)'} name={'housing_allowance'}
                           value={isNaN(modalData.housing_allowance) ? '' : modalData.housing_allowance}
                           required={true} onChange={handlePostData}/>
                  </div>

                  <div>
                    <span>Rank</span>
                    <select onChange={handlePostData} value={modalData.rank} name={'rank'}>
                      <option value={1}>Rank 1</option>
                      <option value={2}>Rank 2</option>
                      <option value={3}>Rank 3</option>
                    </select>
                  </div>
                </div>

                <div className={'apply-button'}>
                  <button type={'submit'}>Submit</button>
                </div>
              </form>
            </ModalContainer>
          </Modal>

          <Container style={{overflowX: 'auto'}}>

            <HeaderWrapper>
              <Header authorized={authorized} permission={permission}/>
            </HeaderWrapper>

            <ListContainer $type={'recruitment'}>
              <div className={'button-container'}>
                <SortButton $isActive={sortType === 'priceDesc'} onClick={() => setSortType('priceDesc')}>
                  Low Price</SortButton>
                <SortButton $isActive={sortType === 'priceAsc'} onClick={() => setSortType('priceAsc')}>
                  High Price</SortButton>
                <SortButton $isActive={sortType === 'dateDesc'} onClick={() => setSortType('dateDesc')}>
                  Date Asc</SortButton>
                <SortButton $isActive={sortType === 'dateAsc'} onClick={() => setSortType('dateAsc')}>
                  Date Desc</SortButton>
              </div>

              <div className={'main-container'}>
                {data.length > 0 ?
                  Object.values(data[currentPage - 1]).map((value: any, index) => (
                    <EmployerBox key={index} onClick={() => openModal(value)}
                                 $url={value.images ? import.meta.env.VITE_API_URL + value.images.split(',')[0] : LemonaidLogo}>
                      <div className={'employers-image'}/>
                      <div className={'title'}>
                        {permission === Permission.ADMIN &&
                            <img src={value.rank === 1 ? grade1 : value.rank === 2 ? grade2 : grade3} alt={'grade'}/>}
                        <div>{value.academy}</div>
                      </div>
                      <div className={'subtitle'}>{value.Campus}</div>
                      <div className={'bottom-container'}>
                        <div>{numberWithCommas(value.start_salary)} - {numberWithCommas(value.end_salary)} KRW</div>
                        <div>{formatDateString(value.CreatedAt)}</div>
                      </div>
                    </EmployerBox>
                  ))
                  : <NoneData>There is no post.</NoneData>
                }
              </div>

              <div className={'pagination-container'}>
                <FiChevronLeft onClick={() => handlePagination(false)}/>
                {Array.from({length: pageLength}, (_, index) => (
                  <Dot $isActive={index + 1 === currentPage} onClick={() => handleDotPagination(index + 1)}
                       key={index}/>
                ))}
                <FiChevronRight onClick={() => handlePagination(true)}/>
              </div>
            </ListContainer>
          </Container>
        </>
      }
    </>
  );
};

export default NoticeManage;