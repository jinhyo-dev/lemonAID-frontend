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
  const dotsLength = Array(3).fill({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>([])

  const handlePagination = (increase: boolean) => {
    const MAX_PAGE = 2;
    if (!increase && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (increase && currentPage !== MAX_PAGE) {
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

          // 추출된 파일 이름과 확장자를 사용하여 다운로드 파일명을 설정합니다.
          link.download = `lemonaid-${contentDisposition}`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => alert(err.response.data.message))
        .finally(() => setLoading(false))
    }
  }

  const fetchData = () => {
    setLoading(true)
    axiosInstance.get('/user/teachers')
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.data)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert(err.response.data.message))
      .finally(() => setLoading(false))
  }

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
            (!loading || data) &&
            Object.values(data).map((value: any, index: number) => (
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
            {dotsLength.map((_, index) => (
              <Dot $isActive={index === currentPage} onClick={() => handleDotPagination(index)} key={index}/>
            ))}
            <FiChevronRight onClick={() => handlePagination(true)}/>
          </div>
        </Employees>
      </>
    </Container>
  );
};

const Employees = styled.div`
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

const EmployeesBox = styled.div<ImageProps>`
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