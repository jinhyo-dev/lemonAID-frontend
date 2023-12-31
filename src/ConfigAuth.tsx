import { useLocation } from 'react-router-dom';
import Main from './pages/Main.tsx';
import SignIn from './pages/SignIn.tsx';
import MyPage from './pages/MyPage.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Service from './pages/Service.tsx';
import Recruitment from './pages/Recruitment.tsx';
import Tours from './pages/Tours.tsx';
import Parties from './pages/Parties.tsx';
import SignUp from './pages/SignUp.tsx';
import Resume from './pages/Resume.tsx';
import Search from './pages/Search.tsx';
import React, { useEffect, useState } from 'react';
import axiosInstance from './utils/AxiosInstance.ts';
import LoadingModal from './components/LoadingModal.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import AdminButton from './components/AdminButton.tsx';
import { Permission } from './interface/AuthProps.ts';
import NewUserManage from './pages/admin/NewUserManage.tsx';
import NotFound from './components/NotFound.tsx';
import PendingNoticeManage from './pages/admin/PendingNoticeManage.tsx';
import ToursAndPartiesManage from './pages/admin/ToursAndPartiesManage.tsx';
import NoticeManage from './pages/admin/NoticeManage.tsx';
import UserManage from './pages/admin/UserManage.tsx';
import OauthLogin from "./pages/OauthLogin.tsx";

interface AuthProps {
  loading: boolean;
  authorized: boolean;
  permission: Permission;
}

const ConfigAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<AuthProps>({
    authorized: false, loading: true, permission: Permission.Undefined,
  });
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const location = useLocation();

  useEffect(() => {
    axiosInstance.get('/user/me')
      .then(res => {
        if (res.data.status === 200) {
          const permission = res.data.data.user_type === 1 ? Permission.ACADEMY :
            res.data.data.user_type === 2 ? Permission.TEACHER : res.data.data.user_type === 3 ? Permission.ADMIN : Permission.Undefined;
          setIsAuthorized({ authorized: res.data.status === 200, loading: false, permission: permission });
          setPhoneNumber(res.data.data.phone_number)
        } else {
          setIsAuthorized({ authorized: false, loading: false, permission: Permission.Undefined });
        }
      })
      .catch(err => console.error(err));
  }, [location]);

  const getComponents = (path: string): React.ReactElement => {
    if (location.pathname.startsWith('/search')) {
      return <Search authorized={isAuthorized.authorized} permission={isAuthorized.permission} value={location.search} />;
    } else {
      switch (path) {
        case '/':
          return <Main authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/sign-in':
          return <SignIn authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/sign-up':
          return <SignUp authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/recruitment':
          return <Recruitment authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/service':
          return <Service authorized={isAuthorized.authorized} permission={isAuthorized.permission} phoneNumber={phoneNumber}/>;
        case '/resume':
          return <Resume authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/tours':
          return <Tours authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/parties-and-events':
          return <Parties authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/my-page':
          return <MyPage authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/admin/new-user':
          return <NewUserManage authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/admin/user-manage':
          return <UserManage authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/admin/pending-notice':
          return <PendingNoticeManage authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/admin/notice-manage':
          return <NoticeManage authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/admin/tour-and-party-manage':
          return <ToursAndPartiesManage authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
        case '/oauth/login':
          return <OauthLogin/>
        default:
          return <NotFound authorized={isAuthorized.authorized} permission={isAuthorized.permission} />;
      }
    }
  };


  return (
    <>
      <ScrollToTop />
      <LoadingModal isOpen={isAuthorized.loading} />
      {!isAuthorized.loading && getComponents(location.pathname)}
      {isAuthorized.permission === Permission.ADMIN && <AdminButton />}
    </>
  );
};

export default ConfigAuth;
