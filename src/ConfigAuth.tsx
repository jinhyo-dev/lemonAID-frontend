import { useLocation } from 'react-router-dom';
import Main from './pages/Main.tsx';
import SignIn from './pages/SignIn.tsx';
import MyPage from './pages/MyPage.tsx';
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

interface AuthProps {
  loading: boolean;
  authorized: boolean;
}

const ConfigAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<AuthProps>({
    authorized: false, loading: true,
  });

  const location = useLocation();

  useEffect(() => {
    axiosInstance.get('/user/me')
      .then(res => {
        setIsAuthorized({ authorized: res.data.status === 200, loading: false });
      })
      .catch(err => console.log(err));
  }, [location]);

  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     children: [
  //       {
  //         path: '',
  //         element: <Main />,
  //       },
  //       {
  //         path: '/sign-in',
  //         element: <SignIn />,
  //       },
  //       {
  //         path: '/sign-up',
  //         element: <SignUp />,
  //       },
  //       {
  //         path: '/my-page',
  //         element: <MyPage />,
  //       },
  //       {
  //         path: '/service',
  //         element: <Service />,
  //       },
  //       {
  //         path: '/recruitment',
  //         element: <Recruitment />,
  //       },
  //       {
  //         path: '/tours',
  //         element: <Tours />,
  //       },
  //       {
  //         path: '/parties-and-events',
  //         element: <Parties />,
  //       },
  //       {
  //         path: '/resume',
  //         element: <Resume />,
  //       },
  //       {
  //         path: '/search/:searchValue',
  //         element: <Search />,
  //       },
  //       {
  //         path: '/admin',
  //         children: [
  //           {
  //             path: '',
  //             element: <></>,
  //           },
  //           {
  //             path: '/admin/notice/register',
  //             element: <></>,
  //           },
  //           {
  //             path: '/admin/notice/manage',
  //             element: <></>,
  //           },
  //           {
  //             path: '/admin/events/manage',
  //             element: <></>,
  //           },
  //           {
  //             path: '/admin/profile/manage',
  //             element: <></>,
  //           },
  //           {
  //             path: '/admin/application/manage',
  //             element: <></>,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const getComponents = (path: string): React.ReactElement => {
    if (location.pathname.startsWith('/search')) {
      return <Search authorized={isAuthorized.authorized} />;
    } else {
      switch (path) {
        case '/':
          return <Main authorized={isAuthorized.authorized} />;
        case '/sign-in':
          return <SignIn authorized={isAuthorized.authorized} />;
        case '/sign-up':
          return <SignUp authorized={isAuthorized.authorized} />;
        case '/recruitment':
          return <Recruitment authorized={isAuthorized.authorized} />;
        case '/service':
          return <Service authorized={isAuthorized.authorized} />;
        case '/resume':
          return <Resume authorized={isAuthorized.authorized} />;
        case '/tours':
          return <Tours authorized={isAuthorized.authorized} />;
        case '/parties-and-events':
          return <Parties authorized={isAuthorized.authorized} />;
        case '/my-page':
          return <MyPage authorized={isAuthorized.authorized} />;
        default:
          return <Resume authorized={isAuthorized.authorized} />;
      }
    }
  };


  return (
    <>
      <ScrollToTop/>
      <LoadingModal isOpen={isAuthorized.loading} />
      {getComponents(location.pathname)}
    </>
  );
};

export default ConfigAuth;
