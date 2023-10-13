import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main.tsx";
import {GlobalStyle} from "./style/global.ts";
import SignIn from "./pages/SignIn.tsx";
import MyPage from "./pages/MyPage.tsx";
import Service from "./pages/Service.tsx";
import Recruitment from "./pages/Recruitment.tsx";
import Tours from "./pages/Tours.tsx";
import Parties from "./pages/Parties.tsx";
import SignUp from './pages/SignUp.tsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: '',
        element: <Main/>,
      },
      {
        path: '/sign-in',
        element: <SignIn/>,
      },
      {
        path: '/sign-up',
        element: <SignUp/>,
      },
      {
        path: '/my-page',
        element: <MyPage/>,
      },
      {
        path: '/service',
        element: <Service/>,
      },
      {
        path: '/recruitment',
        element: <Recruitment/>,
      },
      {
        path: '/tours',
        element: <Tours/>,
      },
      {
        path: '/parties-and-events',
        element: <Parties/>,
      },
    ]
  }
]);

const App = () => {

  return (
    <>
      <GlobalStyle/>
      <RouterProvider router={router}/>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

export default App
