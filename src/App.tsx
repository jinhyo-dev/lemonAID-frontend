import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './style/global.ts';
import { Toaster } from 'react-hot-toast';
import ConfigAuth from './ConfigAuth.tsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/*',
      element: <ConfigAuth />,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}/>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
    </>
  );
};

export default App;
