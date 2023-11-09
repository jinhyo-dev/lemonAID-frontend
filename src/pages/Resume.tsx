import Header from '../components/Header.tsx';
import {Container, HeaderWrapper} from '../style/global.ts';
import styled from 'styled-components';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {Dot} from '../components/List/List.tsx';
import React, {useEffect, useState} from 'react';
import {AuthProps} from '../interface/AuthProps.ts';
import Banner from '../components/List/Banner.tsx';
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../utils/AxiosInstance.ts";
import LoadingModal from "../components/LoadingModal.tsx";

interface ImageProps {
  $url: string;
}

const Resume: React.FC<AuthProps> = ({authorized, permission}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>([])
  const [pageLength, setPageLength] = useState<number>(NaN)

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

  const handleHireButton = (id: number) => {
    if (!authorized) {
      alert('Available after sign in');
      navigate('/sign-in')
    } else {
      setLoading(true)
      axiosInstance.get(`/user/resume?user_id=${id}`, {responseType: 'blob'})
        .then(res => {
          const blob = new Blob([res.data]);
          const contentDisposition = res.headers['content-disposition'].split('=')[1];

          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = fileObjectUrl;
          link.style.display = 'none';

          link.download = `lemonaid-${contentDisposition}`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(() => alert('Permission denied. Plan did not exist.'))
        .finally(() => setLoading(false))
    }
  }

  const fetchData = () => {
    setLoading(true)
    axiosInstance.get('/user/teachers')
      .then(res => {
        if (res.data.status === 200) {
          setData(chunkedData(res.data.data))
          setPageLength(Math.ceil(res.data.data.length / 5));
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert(err.response.data.message))
      .finally(() => setLoading(false))
  }

  const chunkedData = (rawData: any): any => {
    return rawData.reduce((resultArray: any, item: any, index: number) => {
      const chunkIndex = Math.floor(index / 5);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Container>
      <HeaderWrapper>
        <Header authorized={authorized} permission={permission}/>
      </HeaderWrapper>

      <LoadingModal isOpen={loading}/>
      <>
        <Banner $type={'recruitment'} authorized={authorized} permission={permission}/>

        <Employees>
          <div className={'title'}>MEET ALL EMPLOYEES</div>
          {
            data.length > 0 &&
            Object.values(data[currentPage - 1]).map((value: any, index: number) => (
              <EmployeesBox key={index} $url={import.meta.env.VITE_API_URL + value.image_path}>
                <div className={'img-container'}/>
                <div className={'text-container'}>
                  <div className={'name-container'}>
                    {value.first_name} {value.last_name}<span>{value.nationality}</span>
                  </div>
                  <div className={'hire-button-container'}>
                    <button onClick={() => handleHireButton(value.id)}>
                      Hire Now
                    </button>
                  </div>
                </div>
              </EmployeesBox>
            ))}

          <div className={'pagination-container'}>
            <FiChevronLeft onClick={() => handlePagination(false)}/>
            {Array.from({length: pageLength}, (_, index) => (
              <Dot $isActive={index + 1 === currentPage} onClick={() => handleDotPagination(index + 1)}
                   key={index}/>
            ))}
            <FiChevronRight onClick={() => handlePagination(true)}/>
          </div>
        </Employees>
      </>
    </Container>
  );
};

export const Employees = styled.div`
  margin: 65px auto 80px;
  width: 1200px;
  height: auto;

  @media (max-width: 750px) {
    width: 100%;
  }

  & > .title {
    margin: 0 auto 6rem;
    width: 420px;
    text-align: center;
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
    font-size: 32px;
    font-weight: 600;

    @media (max-width: 750px) {
      font-size: 24px;
    }

    @media (max-width: 500px) {
      width: 90%;
    }
  }

  & > .search-name {
    font-size: 45px;
    margin: 100px auto 80px;
    font-family: 'KoPubWorldDotumBold', 'sans-serif';
    text-align: center;
    color: #FAE13E;

    @media (max-width: 750px) {
      font-size: 35px;
    }

    @media (max-width: 500px) {
      font-size: 25px;
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

export const EmployeesBox = styled.div<ImageProps>`
  width: 100%;
  height: 361px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 750px) {
    margin: 3rem auto 0;
    width: 90%;
    display: flex;
    height: auto;
    flex-direction: column;
    justify-content: center;
  }

  & > .img-container {
    width: 310px;
    height: 100%;
    border-radius: 10px;
    background-size: cover;
    overflow: hidden;
    background-position: center;
    background-image: url(${({$url}) => $url});

    @media (max-width: 750px) {
      width: 312px;
      height: 312px;
    }

    @media (max-width: 500px) {
      width: 100%;
      height: 312px;
    }
  }

  & > .text-container {
    width: 710px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 750px) {
      width: 100%;
      height: auto;
    }

    & > * {
      font-family: 'KoPubWorldDotumBold', sans-serif;
    }

    & > .name-container {
      font-size: 20px;
      font-weight: 600;

      & > span {
        font-family: 'KoPubWorldDotumLight', sans-serif;
        margin-left: 5px;
        font-size: 17px;
        color: #888;
      }

      @media (max-width: 750px) {
        margin-top: 2rem;
      }
    }

    & > .info-container {
      font-family: 'KoPubWorldDotumLight', sans-serif;
      margin-top: 1rem;
      float: right;
      width: 99%;
      font-size: 16px;
      font-weight: 400;
    }

    & > .hire-button-container {
      & > button {
        margin-top: 2rem;
        background-color: #FAE13E;
        color: #000;
        height: 45px;
        font-size: 16px;
        width: 166px;
        border: none;
        border-radius: 5px;
      }
    }
  }
`;

export default Resume;