import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Welkom from './Components/Welkom/Welkom.jsx'
import './index.css'
import { CssBaseline } from "@mui/material";
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import NieuwSchermVoertuigen from './Components/NieuwScherm/NieuwSchermVoertuigen.jsx'
import { NieuwSchermTankkaarten } from './Components/NieuwScherm/NieuwSchermTankkaarten.jsx'
import NieuwSchermBestuurders from './Components/NieuwScherm/NieuwSchermBestuurders.jsx'
import NieuwSchermRelaties from './Components/NieuwScherm/NieuwSchermRelaties.jsx'
import NieuwSchermGebruikers from './Components/NieuwScherm/NieuwSchermGebruikers.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter (
  [
    {
      path : '/',
      element: <App/>
    },
    {
      path : '/Welkom/:firstName',
      element: <Welkom/>,
    },
    {
      path: '/NieuwSchermVoertuigen/:firstName',
      element: <NieuwSchermVoertuigen/>,
    }, 
    {
      path : '/NieuwSchermTankkaarten/:firstName',
      element : <NieuwSchermTankkaarten/>
    },
    {
      path : '/NieuwSchermBestuurders/:firstName', 
      element : <NieuwSchermBestuurders/>
    },
    {
      path : '/NieuwSchermRelaties/:firstName',
      element : <NieuwSchermRelaties/>
    },
    {
      path : '/NieuwSchermGebruikers/:firstName',
      element : <NieuwSchermGebruikers/>
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline>
      <QueryClientProvider client={queryClient}> 
        <RouterProvider router ={browserRouter}/>
      </QueryClientProvider>
    </CssBaseline>
  </React.StrictMode>
)
