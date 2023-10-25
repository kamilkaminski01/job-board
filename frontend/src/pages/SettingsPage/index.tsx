import './style.scss'
import AccountData from 'components/organisms/AccountData'
import SettingsPageMenu from 'components/molecules/SettingsPageMenu'

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <SettingsPageMenu />
      <AccountData />
    </div>
  )
}

export default SettingsPage
