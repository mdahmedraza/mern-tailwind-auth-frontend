import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import Username from './components/Username';

// auth middleware....
import {AuthorizeUser, ProtectRoute} from './middleware/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Username></Username>
  },
  {
    path: '/password',
    element:<ProtectRoute><Password /></ProtectRoute>
  },
  {
    path: '/profile',
    element:<AuthorizeUser><Profile /></AuthorizeUser>
  },
  {
    path: '/recovery',
    element:<Recovery></Recovery>
  },
  {
    path: '/register',
    element:<Register></Register>
  },
  {
    path: '/reset',
    element:<Reset></Reset>
  },
  {
    path: '*',
    element:<PageNotFound></PageNotFound>
  },
])

export default function App(){
  return(
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}