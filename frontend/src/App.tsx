import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { PATHS } from './utils/consts'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProtectedRoutes from './components/atoms/ProtectedRoutes'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={PATHS.login} element={<LoginPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path={PATHS.home} element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
