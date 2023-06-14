
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/Home";
import MainLayout from "@/layouts/MainLayout";
import UsersList from "@/pages/users/UsersList";

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <Home />
            },
            {
              path: 'users',
              element: <UsersList />
            }
          ]
        },
      ]
    },
  ])

export default router;