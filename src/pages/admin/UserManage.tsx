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
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);

  const getNewUser = () => {
    setLoading(true);

    axiosInstance.get('/auth/approval_queue')
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = res.data.data.map((item: any) => ({
            ...item,
            isChecked: false,
          }));
          setData(updatedData);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const acceptUser = () => {
    if (window.confirm('회원가입을 승인하시겠습니까 ?')) {
      const payload: { email: string[] } = { email: [] };

      data.forEach((item: any) => {
        if (item.isChecked) {
          payload.email.push(item.email);
        }
      });

      axiosInstance.put('/auth/accept_user', payload)
        .then(res => {
          if (res.data.status === 200) {
            alert('회원가입이 정상적으로 완료되었습니다.');
            getNewUser();
          }
        })
        .catch(err => console.log(err));
    }
  };

  const denyUser = () => {
    if (window.confirm('회원가입을 비승인하시겠습니까 ?')) {
      const payload: { email: string[] } = { email: [] };

      data.forEach((item: any) => {
        if (item.isChecked) {
          payload.email.push(item.email);
        }
      });

      axiosInstance.delete('/auth/deny_user', { data: payload })
        .then(res => {
          if (res.data.status === 200) {
            alert('회원가입 비승인이 정상적으로 완료되었습니다.');
            getNewUser();
          }
        })
        .catch(err => console.log(err));
    }
  };

  const toggleAllCheckboxes = (click: boolean) => {
    const updatedData = data.map((item: any) => {
      return { ...item, isChecked: click };
    });

    setIsAllCheck(!isAllCheck);
    setData(updatedData);
  };

  const handelCheckButton = (email: string) => {
    setData(data.map((v: any) =>
      v.email === email ? { ...v, isChecked: !v.isChecked } : v,
    ));
  };

  useEffect(() => {
    setIsAllCheck(data.length > 0 && data.every((item: any) => item.isChecked));
  }, [data]);

  useEffect(() => {
    getNewUser();
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
                <ButtonContainer $show={data.some((item: any) => item.isChecked)}>
                  <button onClick={acceptUser}>승인</button>
                  <button onClick={denyUser}>비승인</button>
                </ButtonContainer>

                <div className={'table'}>
                  <div className={'table-header'}>
                    <div style={{ width: '5%' }}>
                      <input type={'checkbox'} onChange={e => toggleAllCheckboxes(e.currentTarget.checked)}
                             checked={isAllCheck} />
                    </div>
                    <div style={{ width: '15%' }}>회원명</div>
                    <div style={{ width: '10%' }}>국적</div>
                    <div style={{ width: '8%' }}>성별</div>
                    <div style={{ width: '10%' }}>생년월일</div>
                    <div style={{ width: '17%' }}>비자 코드</div>
                    <div style={{ width: '20%' }}>전화번호</div>
                    <div style={{ width: '15%' }}>이메일</div>
                  </div>

                  {Object.values(data).map((value: any, index: number) => (
                    <TableTR key={index} onClick={() => handelCheckButton(value.email)} $isClicked={value.isChecked}>
                      <div style={{ width: '5%' }}>
                        <input type={'checkbox'} checked={value.isChecked}
                               onChange={() => handelCheckButton(value.email)} />
                      </div>
                      <div style={{ width: '15%' }}>{value.first_name + ' ' + value.last_name}</div>
                      <div style={{ width: '10%' }}>{value.nationality}</div>
                      <div style={{ width: '8%' }}>{value.gender ?? '정보 없음'}</div>
                      <div style={{ width: '10%' }}>{value.birthday.substring(0, 10)}</div>
                      <div style={{ width: '17%' }}>{value.visa_code}</div>
                      <div style={{ width: '20%' }}>{phoneNumberFormatter(value.phone_number)}</div>
                      <div style={{ width: '15%' }}>{value.email}</div>
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

const ButtonContainer = styled.div<{ $show: boolean }>`
  width: 1400px;
  margin-bottom: 1rem;

  visibility: ${({ $show }) => $show ? 'visible' : 'hidden'};
  opacity: ${({ $show }) => $show ? '1' : '0'};
  transition: .2s all;

  & > button {
    font-family: 'KoPubWorldDotumLight', sans-serif;
    width: 4rem;
    height: 2rem;
    border: none;
    border-radius: 5px;

    &:first-child {
      background-color: #FAE13E;
    }

    &:last-child {
      background-color: #ccc;
      margin-left: .6rem;
    }
  }
`;

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

const TableTR = styled.div<{ $isClicked: boolean }>`
  height: 3.5em;
  cursor: pointer;
  background-color: ${({ $isClicked }) => $isClicked ? '#e3eef8' : '#fff'};
  border-bottom: 1px solid #ccc;
  transition: background-color .2s;

  & > div {
    font-family: 'KoPubWorldDotumLight', sans-serif;
  }
`;

export default UserManage;