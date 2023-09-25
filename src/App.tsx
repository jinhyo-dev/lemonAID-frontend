import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main.tsx";
import {GlobalStyle} from "./style/global.ts";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: '',
        element: <Main/>,
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
