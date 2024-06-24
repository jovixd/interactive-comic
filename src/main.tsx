import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme.js';
import PrisonEscape from './pages/01PrisonEscape.js';
import IsekaiQuest from './pages/02IsekaiQuest.js';
import HobbyTournament from './pages/03HobbyTournament.js'
import { createHashHistory, createRootRoute, createRoute, createRouter, Link, Outlet, RouterProvider } from '@tanstack/react-router';

// TODO make the root prettier
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/01-prison-escape" className="[&.active]:font-bold">
          Prison Escape
        </Link>{' '}
        <Link to="/02-isekai-quest" className="[&.active]:font-bold">
          Isekai Quest
        </Link>
        <Link to="/03-hobby-tournament" className="[&.active]:font-bold">
          Hobby Tournament
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Interactive comics</h3>
      </div>
    )
  },
})

const prisonEscapeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/01-prison-escape',
  component: function PrisonEscapeRoute() {
    return <PrisonEscape/>
  },
})

const isekaiQuestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/02-isekai-quest',
  component: function IsekaiQuestRoute() {
    return <IsekaiQuest/>
  },
})

const hobbyTournamentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/03-hobby-tournament',
  component: function HobbyTournamentRoute() {
    return <HobbyTournament/>
  },
})

const routeTree = rootRoute.addChildren([indexRoute, isekaiQuestRoute, prisonEscapeRoute, hobbyTournamentRoute])

const hashHistory = createHashHistory()

const router = createRouter({ routeTree, history: hashHistory})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
);
