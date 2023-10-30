import Tile from 'components/atoms/Tile'
import './style.scss'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'

const SettingsPageMenu = () => {
  const { userData } = useContext(UserContext)

  return (
    <Tile className="settings-page-menu" shadow="light">
      <div className="settings-page-menu__profile">
        {userData.image !== null ? (
          <>
            <img src={userData.image} className="settings-page-menu__image" />
            <span>
              {userData.firstName} {userData.lastName}
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </Tile>
  )
}

export default SettingsPageMenu
