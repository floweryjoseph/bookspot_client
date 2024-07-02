import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from './context/AuthContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={"469623308918-ga8h7ijfdc8ebtj1en2t5hsiedb5and7.apps.googleusercontent.com"} >
    <AuthProvider>
    <App />
    </AuthProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
