import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { routesConfig } from './router';

import './styles.css';
import { AuthProvider } from './auth/index.js';

const router = createBrowserRouter(routesConfig);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(

  <React.StrictMode>
    
    <AuthProvider>

      <RouterProvider router={router} />
    
    </AuthProvider>

  </React.StrictMode>,

)