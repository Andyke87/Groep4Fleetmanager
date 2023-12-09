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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NieuwSchermGebruikers from './Components/NieuwScherm/NieuwSchermGebruikers.jsx'

const browserRouter = createBrowserRouter (
  [
    {
      path : '/',
      element: <App/>
    },
    {
      path : '/Welkom',
      element: <Welkom/>,
    },
    {
      path: '/NieuwSchermVoertuigen',
      element: <NieuwSchermVoertuigen/>,
    }, 
    {
      path : '/NieuwSchermTankkaarten',
      element : <NieuwSchermTankkaarten/>
    },
    {
      path : '/NieuwSchermBestuurders', 
      element : <NieuwSchermBestuurders/>
    },
    {
      path : '/NieuwSchermRelaties',
      element : <NieuwSchermRelaties/>
    },
    {
      path: '/NieuwSchermGebruikers',
      element : <NieuwSchermGebruikers/>
    }
  ]
);
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline>
      <QueryClientProvider client={queryClient}> 
        <RouterProvider router ={browserRouter}/>
      </QueryClientProvider>
    </CssBaseline>
  </React.StrictMode>
)
