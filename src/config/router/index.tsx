
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/login/Login";
import MainLayout from "@/layouts/MainLayout";

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
          ]
        },
        {
          path: '/auth/login',
          element: <Login />
        }
      ]
    },
  ])

export default router;