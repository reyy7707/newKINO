import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './pages/detail/context.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritesProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </FavoritesProvider>
  </React.StrictMode>,
)
