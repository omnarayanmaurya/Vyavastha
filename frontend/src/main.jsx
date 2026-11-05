import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)