import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Top from './pages/top';
import TodoIndex from './pages/todos/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/todos",
    element: <TodoIndex />,
  },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;