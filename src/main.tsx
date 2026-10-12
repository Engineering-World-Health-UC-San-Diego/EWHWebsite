import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import '@fontsource-variable/outfit';
import '@fontsource-variable/inter';
import './index.css';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { DesignReviews } from './pages/DesignReviews';
import { EventDetail } from './pages/EventDetail';
import { Events } from './pages/Events';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'projects', element: <Projects /> },
        { path: 'projects/:slug', element: <ProjectDetail /> },
        { path: 'events', element: <Events /> },
        { path: 'events/:slug', element: <EventDetail /> },
        { path: 'design-reviews', element: <DesignReviews /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  // Serve correctly from a GitHub Pages repository subpath (see vite.config.ts).
  { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
