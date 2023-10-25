import Tile from 'components/atoms/Tile'
import './style.scss'

const SettingsPageMenu = () => {
  return (
    <Tile className="settings-page-menu" shadow="light">
      <ul className="settings-page-menu__list">
        <li className="settings-page-menu__item">
          <a className="settings-page-menu__link" href="#account-data">
            Account settings
          </a>
        </li>
      </ul>
    </Tile>
  )
}

export default SettingsPageMenu
