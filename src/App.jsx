import { useState } from 'react'
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './App.css'
import Home from './components/Home';
import Pastes from './components/Pastes';
import Navbar from './components/Navbar';
import ViewPaste from './components/ViewPaste';

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
        <Navbar/>
        <Home/>
    </div>
  
  },
  {
    path: "/pastes",
    element: 
    <div>
        <Navbar/>
        <Pastes/>
    </div>
  },
  {
    path: "/pastes/:id",
    element: 
    <div>
        <Navbar/>
        <ViewPaste/>
    </div>
  },
]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
