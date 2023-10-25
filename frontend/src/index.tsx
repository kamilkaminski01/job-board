import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './providers/user'
import ModalsProvider from 'providers/modals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
