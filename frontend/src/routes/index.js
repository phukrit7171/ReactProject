import { lazy } from 'react';

// Lazy-loaded components
const Login = lazy(() => import('../pages/LoginPage'));
const Register = lazy(() => import('../pages/RegisterPage'));
const Chat = lazy(() => import('../pages/ChatPage'));
const Friends = lazy(() => import('../pages/FriendsPage'));
const Settings = lazy(() => import('../pages/SettingsPage'));
const NotFound = lazy(() => import('../pages/NotFoundPage'));

export const routes = {
  public: [
    {
      path: '/login',
      component: Login,
      exact: true,
    },
    {
      path: '/register',
      component: Register,
      exact: true,
    },
  ],
  private: [
    {
      path: '/chat',
      component: Chat,
      exact: true,
    },
    {
      path: '/friends',
      component: Friends,
      exact: true,
    },
    {
      path: '/settings',
      component: Settings,
      exact: true,
    },
  ],
  notFound: {
    path: '*',
    component: NotFound,
  },
};

export const defaultPrivateRoute = '/chat';
export const defaultPublicRoute = '/login';