import React, { useEffect, useState } from 'react';
import { AuthProps, Permission } from '../../interface/AuthProps.ts';
import { Container, HeaderWrapper } from '../../style/global.ts';
import Header from '../../components/Header.tsx';
import styled from 'styled-components';
import axiosInstance from '../../utils/AxiosInstance.ts';
import NotFound from '../../components/NotFound.tsx';
import LoadingModal from '../../components/LoadingModal.tsx';
import { phoneNumberFormatter } from '../../utils/phoneNumberFormatter.ts';

const UserManage: React.FC<AuthProps> = ({ authorized, permission }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  const getUser = () => {
    setLoading(true);

    axiosInstance.get('/user/users')
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const resetPassword = (username: string, id: number) => {
    const payload = { id: id, password: import.meta.env.VITE_LEMONAID_PASSWORD };
    if (window.confirm(`${username}님의 비밀번호를 ${import.meta.env.VITE_LEMONAID_PASSWORD}로 변경하시겠습니까 ?`)) {
      axiosInstance.put('/user', payload)
        .then(() => alert('비밀번호 초기화가 정상적으로 완료되었습니다.'))
        .catch(err => alert(err.response.data.message))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized} /> :
        <Container style={{ overflowX: 'auto' }}>
          <LoadingModal isOpen={loading} />
          <HeaderWrapper>
            <Header authorized={authorized} permission={permission} />
          </HeaderWrapper>

          <TableContainer>

            {loading ? <></> : data.length === 0 ? <div className={'non-value'}>신규 회원이 존재하지 않습니다.</div> :
              <>
                <div className={'table'}>
                  <div className={'table-header'}>
                    <div style={{ width: '15%' }}>회원명</div>
                    <div style={{ width: '15%' }}>국적</div>
                    <div style={{ width: '10%' }}>성별</div>
                    <div style={{ width: '15%' }}>생년월일</div>
                    <div style={{ width: '17.5%' }}>전화번호</div>
                    <div style={{ width: '17.5%' }}>이메일</div>
                    <div style={{ width: '10%' }}>비밀번호 초기화</div>
                  </div>

                  {Object.values(data).map((value: any, index: number) => (
                    <TableTR key={index}>
                      <div style={{ width: '15%' }}>{value.first_name + ' ' + value.last_name}</div>
                      <div style={{ width: '15%' }}>{value.nationality}</div>
                      <div style={{ width: '10%' }}>{value.gender ?? '정보 없음'}</div>
                      <div style={{ width: '15%' }}>{value.birthday.substring(0, 10)}</div>
                      <div style={{ width: '17.5%' }}>{phoneNumberFormatter(value.phone_number)}</div>
                      <div style={{ width: '17.5%' }}>{value.email}</div>
                      <div style={{ width: '10%' }}
                           onClick={() => resetPassword(value.first_name + ' ' + value.last_name, value.id)}>
                        <button>초기화</button>
                      </div>
                    </TableTR>
                  ))}
                </div>
              </>
            }
          </TableContainer>

        </Container>
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
    width: 1400px;
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

        & > input {
          width: 1.3rem;
          height: 1.3rem;
          cursor: pointer;
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
  }
`;

const TableTR = styled.div`
  height: 3.5em;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  transition: background-color .2s;

  & > div {
    font-family: 'KoPubWorldDotumLight', sans-serif;

    & > button {
      width: 90px;
      height: 35px;
      background-color: #FAE13E;
      border: none;
      border-radius: 5px;
    }
  }
`;

export default UserManage;