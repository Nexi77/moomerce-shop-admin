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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      {/* @ts-ignore */}  
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
