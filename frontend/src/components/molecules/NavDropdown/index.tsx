import useAuth from 'hooks/useAuth'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import './style.scss'
import { PATHS } from 'utils/consts'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'providers/user/context'

const NavDropdown = () => {
  const location = useLocation()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const { userData } = useContext(UserContext)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setIsOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className="nav-dropdown">
      <div className="nav-dropdown__header" onClick={handleToggle}>
        <span>{userData.firstName || 'Profile'}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="nav-dropdown__menu" id="nav-dropdown__menu">
          <div className="nav-dropdown__userinfo">
            <label className="userinfo__label">User</label>
            <h4>{`${userData.firstName} ${userData.lastName}`}</h4>
          </div>
          <div className="nav-dropdown__links">
            <Link to={PATHS.profile}>Profile</Link>
            <Link to={PATHS.settings}>Settings</Link>
          </div>
          <span className="nav-dropdown__logout" onClick={logout}>
            Logout
          </span>
        </div>
      )}
    </div>
  )
}

export default NavDropdown
