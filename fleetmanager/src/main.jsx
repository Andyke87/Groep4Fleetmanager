import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Welkom from './Components/Welkom/Welkom.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import NieuwSchermVoertuigen from './Components/NieuwScherm/NieuwSchermVoertuigen.jsx'
import { NieuwSchermTankkaarten } from './Components/NieuwScherm/NieuwSchermTankkaarten.jsx'
import NieuwSchermBestuurders from './Components/NieuwScherm/NieuwSchermBestuurders.jsx'
import Relaties from './Components/Relaties/Relaties.jsx'

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
      path : '/Relaties',
      element : <Relaties/>
    }
  ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router ={browserRouter}>

   </RouterProvider>
  </React.StrictMode>,
)
