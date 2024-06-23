import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme.js';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrisonEscape from './pages/01PrisonEscape.js';
import IsekaiQuest from './pages/02IsekaiQuest.js';
import { createRouter, RouterProvider } from '@tanstack/react-router';

// TODO: fancier 404 page
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PrisonEscape />,
//   },
//   {
//     path: "/01-prison-escape",
//     element: <PrisonEscape />,
//   },
//   {
//     path: "/02-isekai-quest",
//     element: <IsekaiQuest />,
//   }
// ], {
//   basename: import.meta.env.BASE_URL
// });

// Import the generated route tree
import { routeTree } from './routeTree.gen.js'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline>
//         <RouterProvider router={router} />
//       </CssBaseline>
//     </ThemeProvider>
//   </React.StrictMode>,
// );

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <RouterProvider router={router} />
        </CssBaseline>
      </ThemeProvider>
    </React.StrictMode>,
  )
}