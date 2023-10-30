import Header from '../components/Header.tsx';
import { Container, HeaderWrapper } from '../style/global.ts';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Dot } from '../components/List/List.tsx';
import React, { useState } from 'react';
import { AuthProps } from '../interface/AuthProps.ts';
import Banner from '../components/List/Banner.tsx';

interface ImageProps {
  $url: string;
}

const Resume: React.FC<AuthProps> = ({ authorized }) => {
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
        <Header authorized={authorized} />
      </HeaderWrapper>

      <Banner $type={'recruitment'} authorized={authorized} />

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
    background-image: url(${({ $url }) => $url});

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

      @media (max-width: 750px) {
        margin-top: 1rem;
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