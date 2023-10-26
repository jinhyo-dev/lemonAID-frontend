import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './style/global.ts';
import { Toaster } from 'react-hot-toast';
import ConfigAuth from './ConfigAuth.tsx';
// import axiosInstance from './utils/AxiosInstance.ts';

const App = () => {
  // const [isAuthrorized, setIsAuthorized] = useState<boolean>(false);


  // useEffect(() => {
  // ga('send', 'pageview');
  //   axiosInstance.get('/user/me')
  //     .then(res => {
  //       // setIsAuthorized(res.data.status === 200);
  //       console.log(location)
  //       if (res.data.status !== 200 && !['/sign-in', '/sign-up', '/'].includes(window.location.pathname)) {
  //         window.location.replace('/')
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, [location]);

  const router = createBrowserRouter([
    {
      path: '/*',
      element: <ConfigAuth />,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
    </>
  );
};

export default App;
