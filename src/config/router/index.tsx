
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/Home";
import MainLayout from "@/layouts/MainLayout";
import UsersList from "@/pages/users/UsersList";
import UserEditForm from "@/pages/users/UserEditForm";
import CreateUserForm from "@/pages/users/CreateUserForm";

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
              element: <UsersList />,
            },
            { 
              path: 'users/:id',
              element: <UserEditForm /> 
            },
            { 
              path: 'users/create',
              element: <CreateUserForm /> 
            }
          ]
        },
      ]
    },
  ])

export default router;