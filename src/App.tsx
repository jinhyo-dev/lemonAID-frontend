import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main.tsx";
import {GlobalStyle} from "./style/global.ts";
import SignIn from "./pages/SignIn.tsx";
import MyPage from "./pages/MyPage.tsx";
import Service from "./pages/Service.tsx";
import Recruitment from "./pages/Recruitment.tsx";
import Tours from "./pages/Tours.tsx";
import Parties from "./pages/Parties.tsx";

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
    </>
  )
}

export default App
