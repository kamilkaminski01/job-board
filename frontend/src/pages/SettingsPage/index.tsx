import './style.scss'
import AccountData from 'components/organisms/AccountData'
import SettingsPageMenu from 'components/molecules/SettingsPageMenu'
import DescriptionData from 'components/organisms/DescriptionData'
import SocialData from 'components/organisms/SocialData'

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <SettingsPageMenu />
      <AccountData />
      <DescriptionData className="settings-page__description-data" />
      <SocialData className="settings-page__social-data" />
    </div>
  )
}

export default SettingsPage
