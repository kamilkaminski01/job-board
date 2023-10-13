import Footer from 'components/organisms/Footer'
import Navbar from 'components/organisms/Navbar'
import { Outlet } from 'react-router-dom'
import './style.scss'

const SharedLayout = () => {
  return (
    <div className="shared-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default SharedLayout
