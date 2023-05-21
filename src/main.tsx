/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom"
import ThemeContextProvider from '@/contexts/ThemeContext';
import App from '@/App'
import router from '@/config/router'
import './variables.css'
import './index.css'
import AuthContextProvider from './contexts/AuthContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        {/* @ts-ignore */}  
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
