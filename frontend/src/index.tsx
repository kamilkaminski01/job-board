import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './providers/user'
import GoogleProvider from './providers/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </GoogleProvider>
    </BrowserRouter>
  </React.StrictMode>
)
