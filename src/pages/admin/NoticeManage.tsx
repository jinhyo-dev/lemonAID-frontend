import React from 'react';
import { AuthProps, Permission } from '../../interface/AuthProps.ts';
import NotFound from '../../components/NotFound.tsx';
// import LoadingModal from '../../components/LoadingModal.tsx';
import { Container, HeaderWrapper } from '../../style/global.ts';
import Header from '../../components/Header.tsx';

const NoticeManage: React.FC<AuthProps> = ({ authorized, permission }) => {
  return (
    <>
      {permission !== Permission.ADMIN ? <NotFound permission={permission} authorized={authorized} /> :
        <>
          {/*<LoadingModal isOpen={loading} />*/}
          <Container style={{ overflowX: 'auto' }}>

            <HeaderWrapper>
              <Header authorized={authorized} permission={permission} />
            </HeaderWrapper>
          </Container>
        </>}
    </>
  );
};

export default NoticeManage;