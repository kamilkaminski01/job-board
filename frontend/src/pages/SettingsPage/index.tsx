import './style.scss'
import AccountData from 'components/organisms/AccountData'
import SettingsPageMenu from 'components/molecules/SettingsPageMenu'
import DescriptionData from 'components/organisms/DescriptionData'

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <SettingsPageMenu />
      <AccountData />
      <DescriptionData className="settings-page__description-data" />
    </div>
  )
}

export default SettingsPage
