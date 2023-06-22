
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/Home";
import MainLayout from "@/layouts/MainLayout";
import UsersList from "@/pages/users/UsersList";
import UserEditForm from "@/pages/users/UserEditForm";
import CreateUserForm from "@/pages/users/CreateUserForm";
import ProductsList from "@/pages/products/ProductsList";
import CreateProductForm from "@/pages/products/CreateProductForm";
import EditProductForm from "@/pages/products/EditProductForm";
import OrdersList from "@/pages/orders/OrdersList";
import OrderDetails from "@/pages/orders/OrderDetails";

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
            },
            {
              path: 'products',
              element: <ProductsList />
            },
            { 
              path: 'products/create',
              element: <CreateProductForm /> 
            },
            { 
              path: 'products/:id',
              element: <EditProductForm /> 
            },
            {
              path: 'orders',
              element: <OrdersList />
            },
            {
              path: 'orders/:id',
              element: <OrderDetails />
            }
          ]
        },
      ]
    },
  ])

export default router;