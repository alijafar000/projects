import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import "./App.css"
import Home from './pages/Home'
import About from './pages/About'
import Country from './pages/Country'
import Contact from './pages/Contact'
import AppLayout from './components/layout/AppLayout'
import CountryDetails from './components/layout/CountryDetails'


//create routers for pages and for header and footer page are constant but middle components are change
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
    path: "/",
    element: <Home/>
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "country",
    element: <Country/>
  },
  {
    path: "country/:id",
    element: <CountryDetails/>
  },
  {
    path: "contact",
    element: <Contact/>
  },
    ]
  }
])
const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App