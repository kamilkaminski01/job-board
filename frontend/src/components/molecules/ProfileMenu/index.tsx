import Tile from 'components/atoms/Tile'
import './style.scss'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import useAuth from 'hooks/useAuth'
import { NavLink } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import { CgProfile } from 'react-icons/cg'
import { GiSettingsKnobs } from 'react-icons/gi'
import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { ThemeContext } from 'providers/theme/context.ts'

const ProfileMenu = () => {
  const { userData } = useContext(UserContext)
  const { logout } = useAuth()
  const { themeColors } = useContext(ThemeContext)

  return (
    <Tile className="profile-menu" shadow="light">
      <div className="profile-menu__content">
        {userData.image ? (
          <img src={userData.image} className="profile-menu__image" />
        ) : (
          <div className="profile-menu__image"></div>
        )}
        <span>
          {userData.firstName} {userData.lastName}
        </span>
      </div>
      <div className="profile-menu__nav">
        <span className="profile-menu__nav-item">
          <CgProfile />
          <NavLink
            to={PATHS.profile}
            style={({ isActive }) => ({ color: isActive ? themeColors.primaryColor : '' })}>
            Profile
          </NavLink>
        </span>
        <span className="profile-menu__nav-item">
          <GiSettingsKnobs />
          <NavLink
            to={PATHS.settings}
            style={({ isActive }) => ({ color: isActive ? themeColors.primaryColor : '' })}>
            Settings
          </NavLink>
        </span>
        <span className="profile-menu__logout profile-menu__nav-item" onClick={logout}>
          <MdOutlinePowerSettingsNew />
          Logout
        </span>
      </div>
    </Tile>
  )
}

export default ProfileMenu
