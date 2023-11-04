import List, { ModalContainer } from '../components/List/List.tsx';
import { AuthProps, Permission } from '../interface/AuthProps.ts';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { ImageListProps, JobPostTypeProps } from '../interface/JobPostProps.ts';
import { AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance.ts';
import { camelToFuckingSnake } from '../utils/CamelToSnake.ts';

const Recruitment: React.FC<AuthProps> = ({ authorized, permission }) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [postTypeData, setPostTypeData] = useState<JobPostTypeProps>({
    academy: '',
    campus: '',
    category: 'Full Time',
    position: 'Native Teacher',
    startSalary: NaN,
    endSalary: NaN,
    studentLevel: 'Kindy',
    workingStartHour: undefined,
    workingEndHour: undefined,
    paidVacation: NaN,
    annualLeave: NaN,
    severance: 'Provided',
    insurance: 'Provided',
    housing: 'Provided',
    housingAllowance: NaN,
  });
  const [imageList, setImageList] = useState<ImageListProps>({
    image1: { value: null, show: false },
    image2: { value: null, show: false },
    image3: { value: null, show: false },
    image4: { value: null, show: false },
  });

  const navigate = useNavigate();

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
    setIsOpen(false);
  };

  const handlePostData = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null, dateDivision?: string) => {
    if (event instanceof Date || null) {
      dateDivision &&
      setPostTypeData(prevState => ({
        ...prevState,
        [dateDivision]: event,
      }));
    } else {
      const { name, value } = event!.target;

      setPostTypeData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!authorized) {
      alert('Available after sign in');
      navigate('/sign-in');
    } else if (Object.values(imageList).every(item => item.value === null)) {
      alert('At least one image is required.');
    } else {
      const payload: any = {};

      for (const key in postTypeData) {
        if (Object.prototype.hasOwnProperty.call(postTypeData, key)) {
          let newValue = postTypeData[key];

          if (['workingStartHour', 'workingEndHour'].includes(key)) {
            const value = postTypeData[key];
            const formattedTime = `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
            newValue = formattedTime;
          }

          const newKey = camelToFuckingSnake(key);
          payload[newKey] = ['paidVacation', 'annualLeave'].includes(key) ? Number(newValue) : newValue;
        }
      }

      axiosInstance.post('/post/job_post', payload)
        .then(res => {
          if (res.status === 200) {
            const form = new FormData();
            const imageArray: any = Object.keys(imageList).map((key) => {
              const image = imageList[key];
              if (image.value !== null) {
                if (Array.isArray(image.value)) {
                  return image.value[0]; // 또는 다른 방식으로 처리
                }
                return image.value;
              }
              return null;
            }).filter((image) => image !== null);

            console.log(imageArray)

            form.append('images', imageArray);
            form.append('id', res.data.id);

            axiosInstance.post('/post/job_images_upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then(res => console.log(res))
              .catch(err => alert(err.response.data.message));
            // .finally(() => )
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => alert(err.response.data.message));
    }
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

  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContainer $url={'https://thumbs.dreamstime.com/b/teacher-9707054.jpg'}>
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
                    <div>(Environment, Housing and etc)</div>
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
            <div className={'table submit-table'}>
              <div>
                <span>Academy name</span>
                <input type={'text'} placeholder={'e.g. RISE'} name={'academy'}
                       value={postTypeData.academy} required={true} onChange={handlePostData} />
              </div>

              <div>
                <span>Campus name</span>
                <input type={'text'} placeholder={'e.g. Gangdong Campus'} name={'campus'}
                       value={postTypeData.campus} required={true} onChange={handlePostData} />
              </div>
              <div>
                <span>Category</span>
                <select name={'category'} value={postTypeData.category} required={true} onChange={handlePostData}>
                  <option value={'Full Time'}>Full Time</option>
                  <option value={'Part Time'}>Part Time</option>
                </select>
              </div>

              <div>
                <span>Position</span>
                <select name={'position'} value={postTypeData.position} required={true} onChange={handlePostData}>
                  <option value={'Native Teacher'}>Native Teacher</option>
                  <option value={'Bilingual Teacher'}>Bilingual Teacher</option>
                </select>
              </div>

              <div>
                <span>Salary Range</span>

                <div className={'double-input-container'}>
                  <input type={'text'} placeholder={'Amount (Unit: KRW)'} name={'startSalary'}
                         value={isNaN(postTypeData.startSalary) ? '' : postTypeData.startSalary}
                         required={true} onChange={handlePostData} />
                  <span>-</span>
                  <input type={'text'} placeholder={'Amount (Unit: KRW)'} name={'endSalary'}
                         value={isNaN(postTypeData.endSalary) ? '' : postTypeData.endSalary}
                         required={true} onChange={handlePostData} />
                </div>
              </div>

              <div>
                <span>Student Level</span>
                <select name={'studentLevel'} value={postTypeData.studentLevel} required={true}
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
                              placeholderText={'Start hour'} className={'time-picker'}
                              value={postTypeData.workingStartHour ? postTypeData.workingStartHour.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }) : undefined}
                              dateFormat='h:mm aa'
                              onChange={e => handlePostData(e, 'workingStartHour')} />
                  <span>-</span>
                  <DatePicker showTimeSelectOnly={true} showTimeSelect={true} timeCaption='Time' timeIntervals={30}
                              placeholderText={'End hour'} className={'time-picker'}
                              value={postTypeData.workingEndHour ? postTypeData.workingEndHour.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }) : undefined}
                              dateFormat='h:mm aa'
                              onChange={e => handlePostData(e, 'workingEndHour')} />
                </div>
              </div>

              <div>
                <span>Paid Vacation</span>
                <input type={'text'} placeholder={'Unit: day'} name={'paidVacation'}
                       value={isNaN(postTypeData.paidVacation) ? '' : postTypeData.paidVacation}
                       required={true} onChange={handlePostData} />
              </div>

              <div>
                <span>Annual Leave</span>
                <input type={'text'} placeholder={'Unit: day'} name={'annualLeave'}
                       value={isNaN(postTypeData.annualLeave) ? '' : postTypeData.annualLeave}
                       required={true} onChange={handlePostData} />
              </div>

              <div>
                <span>Severance</span>
                <select name={'severance'} value={postTypeData.severance} required={true} onChange={handlePostData}>
                  <option value={'Provided'}>Provided</option>
                  <option value={'Not Provided'}>Not Provided</option>
                </select>
              </div>

              <div>
                <span>Insurance</span>
                <select name={'insurance'} value={postTypeData.insurance} required={true} onChange={handlePostData}>
                  <option value={'Provided'}>Provided</option>
                  <option value={'Not Provided'}>Not Provided</option>
                </select>
              </div>

              <div>
                <span>Housing</span>
                <select name={'housing'} value={postTypeData.housing} required={true} onChange={handlePostData}>
                  <option value={'Provided'}>Provided</option>
                  <option value={'Not Provided'}>Not Provided</option>
                </select>
              </div>

              <div>
                <span>Housing Allowance</span>
                <input type={'text'} placeholder={'Amount (Unit: KRW)'} name={'housingAllowance'}
                       value={isNaN(postTypeData.housingAllowance) ? '' : postTypeData.housingAllowance}
                       required={true} onChange={handlePostData} />
              </div>
            </div>

            <div className={'apply-button'}>
              <button type={'submit'}>Submit</button>
            </div>
          </form>
        </ModalContainer>
      </Modal>
      <List $type={'recruitment'} authorized={authorized} permission={permission} />
      {permission !== Permission.ADMIN && <Button onClick={() => setIsOpen(true)}>Create Job Post</Button>}
    </>
  );
};

const Button = styled.button`
  width: 11rem;
  height: 3.3rem;
  background: #FAE13E;
  right: 2%;
  z-index: 5;
  border-radius: 10px;
  position: fixed;
  text-align: center;
  bottom: 4%;
  cursor: pointer;
  border: none;
  color: #381d2a;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  transition: box-shadow .25s;
  font-size: 1.15rem;
  font-family: 'KoPubWorldDotumBold', sans-serif;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 14px 28px, rgba(0, 0, 0, 0.22) 0 10px 10px;
  }

  @media (max-width: 500px) {
    width: 8rem;
    height: 2.6rem;
    right: 3%;
    bottom: 2%;
    font-size: .8rem;
  }
`;

export default Recruitment;