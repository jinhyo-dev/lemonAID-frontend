import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main.tsx";
import {GlobalStyle} from "./style/global.ts";
import SignIn from "./pages/SignIn.tsx";
import MyPage from "./pages/MyPage.tsx";
import Service from "./pages/Service.tsx";
import List from "./pages/List.tsx";

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
        path: '/list',
        element: <List/>,
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
