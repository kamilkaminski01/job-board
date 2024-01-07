import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { PATHS } from './utils/consts'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProtectedRoutes from './components/atoms/ProtectedRoutes'
import AuthLayout from './components/atoms/AuthLayout'
import RegisterPage from './pages/RegisterPage'
import SharedLayout from './components/atoms/SharedLayout'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import AlertContainer from 'components/atoms/AlertContainer'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.register} element={<RegisterPage />} />
        </Route>

        <Route element={<SharedLayout />}>
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.about} element={<AboutPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path={PATHS.profile} element={<ProfilePage />} />
            <Route path={PATHS.settings} element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
      <AlertContainer />
    </div>
  )
}

export default App
