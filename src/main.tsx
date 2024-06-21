import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrisonEscape from './pages/01PrisonEscape';
import IsekaiQuest from './pages/02IsekaiQuest';

// TODO: fancier 404 page
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrisonEscape />,
  },
  {
    path: "/01-prison-escape",
    element: <PrisonEscape />,
  },
  {
    path: "/02-isekai-quest",
    element: <IsekaiQuest />,
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
