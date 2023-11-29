import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorPage from '../components/errorPage';
import Layout from '../components/layout';
import Redirect from '../components/layout/Redirect';
import NotFoundPage from '../components/notfoundPage';
import { webRoutes } from './web';
import loadable from '@loadable/component';
import ProgressBar from '../components/loader/progressBar';
import RequireAuth from './requireAuth';
import Login from '../components/auth/Login';
import About from '../components/demo-pages/about';
import { Referrals } from '../components/referrals';
import EmployeeProfile from '../components/employees/EmployeeProfile';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const Dashboard = loadable(() => import('../components/dashboard'), {
  fallback: fallbackElement,
});
const Employees = loadable(() => import('../components/employees'), {
  fallback: fallbackElement,
});
const Employers = loadable(() => import('../components/employers'), {
  fallback: fallbackElement,
});
const JobDetails = loadable(() => import('../components/jobDetails'), {
  fallback: fallbackElement,
});
// const Referrals = loadable(() => import('../components/referrals'), {
//   fallback: fallbackElement,
// });

export const browserRouter = createBrowserRouter([
  {
    path: webRoutes.home,
    element: <Redirect />,
    errorElement: errorElement,
  },

  // auth routes
  {
    element: <AuthLayout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.login,
        element: <Login />,
      },
    ],
  },

  // protected routes
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.dashboard,
        element: <Dashboard />,
      },
      {
        path: webRoutes.employees,
        element: <Employees />,
      },
      {
        path: webRoutes.employers,
        element: <Employers />,
      },
      {
        path: webRoutes.jobDetails,
        element: <JobDetails />,
      },
      {
        path: webRoutes.referrals,
        element: <Referrals />,
      },
      {
        path: webRoutes.employeeProfie,
        element: <EmployeeProfile />,
      },
      {
        path: webRoutes.about,
        element: <About />,
      },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: errorElement,
  },
]);
