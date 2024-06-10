import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import EscapeFromTheOceanPrison from './pages/01';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// default path / goes to the only comic available at this time
const router = createBrowserRouter([
  {
    path: "/",
    element: <EscapeFromTheOceanPrison />,
  }
], {
  basename: import.meta.env.BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
);
