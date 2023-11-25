import Tile from 'components/atoms/Tile'
import './style.scss'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import useAuth from 'hooks/useAuth'

const SettingsPageMenu = () => {
  const { userData } = useContext(UserContext)
  const { logout } = useAuth()

  return (
    <Tile className="settings-page-menu" shadow="light">
      <div className="settings-page-menu__profile">
        {userData.image ? (
          <img src={userData.image} className="settings-page-menu__image" />
        ) : (
          <div className="settings-page-menu__image"></div>
        )}
        <span>
          {userData.firstName} {userData.lastName}
        </span>
        <span className="settings-page-menu__logout" onClick={logout}>
          Logout
        </span>
      </div>
    </Tile>
  )
}

export default SettingsPageMenu
