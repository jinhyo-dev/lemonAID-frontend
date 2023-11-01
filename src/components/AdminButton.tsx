import styled from 'styled-components';
import { FaUserGear } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClick, setIsClick] = useState<boolean>(false)

  const handlePage = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    setIsClick(false)
  }, [location]);

  return (
    <Button onClick={() => setIsClick(!isClick)} $currentPath={location.pathname}>
      <FaUserGear />
      <AdminNav $isClick={isClick} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => handlePage('/admin/new-user')}>신규회원 관리</button>
        <button onClick={() => handlePage('/admin/new-notice')}>공고 관리</button>
        <button>투어 및 파티 관리</button>
        <button>프로필 관리</button>
        <button>공고 신청서 관리</button>
      </AdminNav>
    </Button>
  );
};

const Button = styled.button<{ $currentPath: string }>`
  width: 4.5rem;
  height: 4.5rem;
  right: 2%;
  z-index: 5;
  border-radius: 50%;
  position: fixed;
  text-align: center;
  bottom: 4%;
  border: none;
  background-color: #FAE13E;
  color: #381d2a;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  transition: box-shadow .25s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 14px 28px, rgba(0, 0, 0, 0.22) 0 10px 10px;
  }

  & > svg {
    font-size: 2.2rem;
    margin-left: .4rem;
  }

  & > div {
    font-family: 'KoPubWorldDotumLight', sans-serif;
    font-size: .6rem;
  }
`;

const AdminNav = styled.nav<{$isClick: boolean}>`
  transition: all .3s;
  visibility: ${({ $isClick }) => $isClick ? 'visible' : 'hidden'};
  opacity: ${({ $isClick }) => $isClick ? 1 : 0};
  position: fixed;
  border-radius: 15px;
  z-index: 4;
  width: 10rem;
  right: 1%;
  bottom: 13%;
  height: 20rem;
  background-color: #f9f9f9;
  display: flex;
  border: 3px solid #FAE13E;;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  
  & > button {
    background: none;
    border: none;
    width: 100%;
    height: 4rem;
    font-size: 17px;
    color: #000;
    font-family: 'KoPubWorldDotumLight', 'sans-serif';
    transition: background-color .25s;
    
    &:hover {
      background: #FAE13E;
    }
  }
`

export default AdminButton;