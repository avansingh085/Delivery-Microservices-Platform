import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx';
import { Toaster } from 'sonner';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <>
  
    <Toaster position="top-center" richColors />
     <ToastContainer />
   <App/>
   </>
)
