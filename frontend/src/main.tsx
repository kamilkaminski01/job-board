import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './providers/user'
import ModalsProvider from 'providers/modals'
import ScrollToTop from 'components/atoms/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <UserProvider>
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </UserProvider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
)
