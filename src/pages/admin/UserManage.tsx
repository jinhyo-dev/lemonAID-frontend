import React, { useEffect } from 'react';
import { AuthProps, Permission } from '../../interface/AuthProps.ts';
import { Container, HeaderWrapper } from '../../style/global.ts';
import Header from '../../components/Header.tsx';
import styled from 'styled-components';
import axiosInstance from '../../utils/AxiosInstance.ts';
import NotFound from '../../components/NotFound.tsx';

const UserManage: React.FC<AuthProps> = ({ authorized, permission }) => {

  const getNewUser = () => {
    axiosInstance.get('/auth/get_approval_queue')
      .then(res => console.log(res.data));
  };

  useEffect(() => {
    getNewUser();
  }, []);

  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized} /> :
        <Container>
          <HeaderWrapper>
            <Header authorized={authorized} permission={permission} />
          </HeaderWrapper>

          <TableContainer>
            <div className={'table'}>
              <div className={'table-header'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>회원명</div>
                <div style={{ width: '30%' }}>비자 코드</div>
                <div style={{ width: '35%' }}>가입 시간</div>
              </div>

              <div className={'table-tr'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>Cristiano Ronaldo</div>
                <div style={{ width: '30%' }}>CDA134123432</div>
                <div style={{ width: '35%' }}>2023-10-23 13:11</div>
              </div>

              <div className={'table-tr'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>Cristiano Ronaldo</div>
                <div style={{ width: '30%' }}>CDA134123432</div>
                <div style={{ width: '35%' }}>2023-10-23 13:11</div>
              </div>

              <div className={'table-tr'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>Cristiano Ronaldo</div>
                <div style={{ width: '30%' }}>CDA134123432</div>
                <div style={{ width: '35%' }}>2023-10-23 13:11</div>
              </div>

              <div className={'table-tr'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>Cristiano Ronaldo</div>
                <div style={{ width: '30%' }}>CDA134123432</div>
                <div style={{ width: '35%' }}>2023-10-23 13:11</div>
              </div>

              <div className={'table-tr'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>Cristiano Ronaldo</div>
                <div style={{ width: '30%' }}>CDA134123432</div>
                <div style={{ width: '35%' }}>2023-10-23 13:11</div>
              </div>

              <div className={'table-tr'}>
                <div style={{ width: '10%' }}><input type={'checkbox'} /></div>
                <div style={{ width: '25%' }}>Cristiano Ronaldo</div>
                <div style={{ width: '30%' }}>CDA134123432</div>
                <div style={{ width: '35%' }}>2023-10-23 13:11</div>
              </div>

            </div>

          </TableContainer>

        </Container>
      }
    </>
  );
};

const TableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .table {
    width: 1400px;
    height: 80vh;
    background-color: #f0f0f0;
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

        & > input {
          width: 1.3rem;
          height: 1.3rem;
        }
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
      height: 3.5em;
      background-color: #fff;
      border-bottom: 1px solid #ccc;

      & > div {
        font-family: 'KoPubWorldDotumLight', sans-serif;
      }
    }
  }
`;

export default UserManage;