import Header from '../components/Header.tsx';
import { Container, HeaderWrapper } from '../style/global.ts';
import ResumeBanner from '../components/List/Banners/ResumeBanner.tsx';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Dot } from '../components/List/List.tsx';
import { useState } from 'react';

interface ImageProps {
  $url: string;
}

const Resume = () => {
  const employees = Array(4).fill({});
  const dotsLength = Array(3).fill({});
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <ResumeBanner />

      <Employees>
        <div className={'title'}>MEET ALL EMPLOYEES</div>
        {employees.map((_, i) => (
          <EmployeesBox key={i}
                        $url={'https://pictures.tribuna.com/image/2122cea9-ce71-43ee-a2be-909e5e7602e3?width=1920&quality=100'}>
            <div className={'img-container'} />
            <div className={'text-container'}>
              <div className={'name-container'}>GilDong Hong</div>
              <div className={'info-container'}>
                I'm GilDong Hong, and I have a deep passion for learning. For me, every day is an opportunity to acquire
                new knowledge and skills. Whether it's exploring a new language, delving into a complex subject, or
                experimenting with a new hobby, I find immense joy in the process of discovery.
              </div>
              <div className={'price-container'}>
                <div>2,500,000 - 2,000,000 KRW</div>
                <div>Any Information?</div>
              </div>
              <div className={'hire-button-container'}>
                <button>
                  Hire Now
                </button>
              </div>
            </div>
          </EmployeesBox>
        ))}

        <div className={'pagination-container'}>
          <FiChevronLeft onClick={() => handlePagination(false)} />
          {dotsLength.map((_, index) => (
            <Dot $isActive={index === currentPage} onClick={() => handleDotPagination(index)} key={index} />
          ))}
          <FiChevronRight onClick={() => handlePagination(true)} />
        </div>
      </Employees>
    </Container>
  );
};

const Employees = styled.div`
  margin: 65px auto 80px;
  width: 1200px;
  height: auto;

  & > .title {
    margin: 0 auto 6rem;
    width: 420px;
    text-align: center;
    font-family: 'Commissioner', 'sans-serif';
    font-size: 32px;
    font-weight: 600;
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

export default Resume;

const EmployeesBox = styled.div<ImageProps>`
  width: 100%;
  height: 361px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .img-container {
    width: 361px;
    height: 100%;
    border-radius: 10px;
    background-size: cover;
    overflow: hidden;
    background-position: center;
    background-image: url(${({ $url }) => $url});
  }

  & > .text-container {
    width: 710px;
    height: 240px;

    & > * {
      font-family: 'Commissioner', sans-serif;
    }

    & > .name-container {
      font-size: 20px;
      font-weight: 600;
    }
    
    & > .info-container {
      margin-top: 1rem;
      float: right;
      width: 99%;
      font-size: 16px;
      font-weight: 400;
    }

    & > .price-container {
      bottom: 0;
      width: 100%;
      display: flex;

      & > div {
        margin-top: 2rem;
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
