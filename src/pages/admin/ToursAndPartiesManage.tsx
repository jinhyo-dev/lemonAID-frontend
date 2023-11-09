import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AuthProps, Permission } from '../../interface/AuthProps.ts';
import NotFound from '../../components/NotFound.tsx';
import { AdminPageTitle, Container, HeaderWrapper } from '../../style/global.ts';
import Header from '../../components/Header.tsx';
import styled from 'styled-components';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai';
import { ModalContainer } from '../../components/List/List.tsx';
import { ImageListProps } from '../../interface/JobPostProps.ts';
import { ToursAndPartiesProps } from '../../interface/ToursAndPartiesProps.ts';
import axiosInstance from '../../utils/AxiosInstance.ts';
import { camelToFuckingSnake } from '../../utils/CamelToSnake.ts';
import LoadingModal from '../../components/LoadingModal.tsx';

interface ModalProps {
  isOpen: boolean;
  type: string;
}

const ToursAndPartiesManage: React.FC<AuthProps> = ({ authorized, permission }) => {
  const [modalState, setModalState] = useState<ModalProps>({ isOpen: false, type: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [imageList, setImageList] = useState<ImageListProps>({
    image1: { value: null, show: false },
    image2: { value: null, show: false },
    image3: { value: null, show: false },
    image4: { value: null, show: false },
  });
  const [data, setData] = useState<ToursAndPartiesProps>({
    company: '',
    date: '',
    description: '',
    itinerary: '',
    location: '',
    name: '',
    postOwn: '',
    price: NaN,
    theme: '',
  });

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

  const closeModal = () => {
    setModalState({ isOpen: false, type: '' });
  };

  const openModal = (type: string) => {
    setModalState({ isOpen: true, type: type });
  };

  const handlePostData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const elementId = event.target.id;

    if (selectedFile) {
      setImageList(prevImageList => ({
        ...prevImageList,
        [elementId]: { value: selectedFile, show: true },
      }));
    }
  };

  const addFileList = (key: string) => {
    setImageList(prevImageList => ({
      ...prevImageList,
      [key]: { ...prevImageList[key], show: true },
    }));
  };

  const deleteFileList = (key: string) => {
    setImageList(prevImageList => ({
      ...prevImageList,
      [key]: { value: null, show: false },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(imageList).every(item => item.value === null)) {
      alert('At least one image is required.');
    } else {
      const payload: any = {};

      for (const key of Object.keys(data)) {
        let newValue = data[key];

        if (key === 'price') {
          newValue = Number(data[key]);
        }

        const newKey = key === 'name' ? (modalState.type === 'tour' ? 'tour_name' : 'party_name') : camelToFuckingSnake(key);
        payload[newKey] = newValue;
      }
      setLoading(true);

      axiosInstance.post(`/post/${modalState.type === 'tour' ? 'tour' : 'party_and_events'}`, payload)
        .then(res => {
          if (res.data.status === 200) {
            const form = new FormData();

            form.append('id', res.data.id);
            form.append('post_type', modalState.type === 'tour' ? 'TOUR' : 'PARTY_AND_EVENTS');

            Object.keys(imageList).map((key) => {
              const image = imageList[key];
              if (image.value !== null) {
                form.append('images', image.value, image.value.name);
              }
            });

            axiosInstance.post('/post/images_upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then(res => alert(res.data.message))
              .catch(err => alert(err.response.data.message))
              .finally(() => setLoading(false));
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => alert(err.response.data.message));
    }
  };

  useEffect(() => {
    setData({
      company: '',
      date: '',
      description: '',
      itinerary: '',
      location: '',
      name: '',
      postOwn: '',
      price: NaN,
      theme: '',
    });
  }, [modalState.type]);

  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized} /> :
        <Container style={{ overflowX: 'auto' }}>
          <LoadingModal isOpen={loading} />
          <Modal
            closeTimeoutMS={200}
            isOpen={modalState.isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <ModalContainer>
              <div className={'close-button'}>
                <button onClick={closeModal}><IoClose /></button>
              </div>

              <div className={'image-submit-container'}>
                <input type={'file'} id={'image1'} onChange={handleFileChange} />
                <input type={'file'} id={'image2'} onChange={handleFileChange} />
                <input type={'file'} id={'image3'} onChange={handleFileChange} />
                <input type={'file'} id={'image4'} onChange={handleFileChange} />

                {
                  Object.values(imageList).every(item => item.value === null && !item.show) ? (
                      <label htmlFor={'image1'} className={'file-label-full'}>
                        <div>Upload Pictures</div>
                        <div>(Only jpg, jpeg, gif, png, tiff, ai, psd extensions are allowed)</div>
                      </label>) :
                    <div className={'label-container'}>
                      {
                        Object.entries(imageList).map(([key, value], index) => (
                          <label htmlFor={value.show ? key : ''} key={index}
                                 className={`file-single-label ${value.show ? 'file-single-label-show' : 'file-single-label-hidden'}`}>
                            <div style={{ margin: index === 0 ? '2px auto 0' : index === 3 ? '15px auto' : '' }}>
                              {
                                value.show ?
                                  <>
                                    <div>{value.value?.name ?? 'Click to Upload'}</div>
                                    <button onClick={() => deleteFileList(key)}><AiOutlineDelete /></button>
                                  </> :
                                  <div onClick={() => addFileList(key)}>
                                    <AiOutlineFileAdd /> Add Image
                                  </div>
                              }
                            </div>
                          </label>
                        ))}
                    </div>
                }

              </div>

              <form onSubmit={handleSubmit}>
                <div className={'table submit-table tour-submit-table'}>
                  <div>
                    <span>{modalState.type === 'tour' ? 'Tour name' : 'Party & Event name'}</span>
                    <input type={'text'} placeholder={modalState.type === 'tour' ? 'Tour name' : 'Party & Event name'}
                           name={'name'} value={data.name} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Description</span>
                    <input type={'text'} placeholder={'Description'} name={'description'}
                           value={data.description} required={true} onChange={handlePostData} />
                  </div>
                  <div>
                    <span>Post own</span>
                    <input type={'text'} placeholder={'Post own'} name={'postOwn'}
                           value={data.postOwn} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Company</span>
                    <input type={'text'} placeholder={'Company'} name={'company'}
                           value={data.company} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Theme</span>
                    <input type={'text'} placeholder={'Theme'} name={'theme'}
                           value={data.theme} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Location</span>
                    <input type={'text'} placeholder={'Location'} name={'location'}
                           value={data.location} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Date</span>
                    <input type={'date'} placeholder={'Date'} name={'date'}
                           value={data.date} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Price</span>
                    <input type={'text'} placeholder={'Price'} name={'price'}
                           value={isNaN(data.price) ? '' : data.price} required={true} onChange={handlePostData} />
                  </div>

                  <div>
                    <span>Itinerary</span>
                    <input type={'text'} placeholder={'Itinerary'} name={'itinerary'}
                           value={data.itinerary} required={true} onChange={handlePostData} />
                  </div>
                </div>

                <div className={'apply-button'}>
                  <button type={'submit'}>Submit</button>
                </div>
              </form>
            </ModalContainer>
          </Modal>

          <HeaderWrapper>
            <Header authorized={authorized} permission={permission} />
          </HeaderWrapper>

          <AdminPageTitle>
            투어 및 파티 관리
          </AdminPageTitle>

          <ManageContainer>
            <div>
              <button onClick={() => openModal('tour')}>투어 추가</button>
              <button onClick={() => openModal('party')}>파티 & 이벤트 추가</button>
            </div>
          </ManageContainer>

        </Container>
      }
    </>
  );
};

const ManageContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    font-family: 'KoPubWorldDotumBold', sans-serif;
  }

  & > div {
    width: 38rem;
    height: 5rem;
    display: flex;
    justify-content: space-between;

    & > button {
      width: 44%;
      font-size: 23px;
      border-radius: 8px;
      border: none;
      background: #FAE13E;
      color: #000;
    }
  }
`;

export default ToursAndPartiesManage;