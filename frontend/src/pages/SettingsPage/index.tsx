import './style.scss'
import AccountData from 'components/organisms/AccountData'
import SettingsPageMenu from 'components/molecules/SettingsPageMenu'
import DescriptionData from 'components/organisms/DescriptionData'
import SocialData from 'components/organisms/SocialData'
import ProfileImageData from 'components/organisms/ProfileImageData'
import AccountDeletion from 'components/organisms/AccountDeletion'

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <SettingsPageMenu />
      <AccountData />
      <DescriptionData className="settings-page__description-data" />
      <SocialData className="settings-page__social-data" />
      <ProfileImageData className="settings-page__profile-image-data" />
      <AccountDeletion className="settings-page__account-deletion" />
    </div>
  )
}

export default SettingsPage
