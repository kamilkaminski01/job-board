import SettingsTileHeader from 'components/molecules/SettingsTileHeader'
import Tile from 'components/atoms/Tile'
import { SocialDataProps } from './interface'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import { useModals } from 'providers/modals/context'
import SettingsTileRecord from 'components/molecules/SettingsTileRecord'
import ChangeGitHubModal from 'pages/SettingsPage/partials/modals/AccountData/ChangeGitHubModal'
import ChangeLinkedInModal from 'pages/SettingsPage/partials/modals/AccountData/ChangeLinkedInModal'

const SocialData = ({ className }: SocialDataProps) => {
  const { userData } = useContext(UserContext)
  const { openModal } = useModals()

  return (
    <Tile id="social-data" className={className} shadow="light">
      <SettingsTileHeader title="Social profiles settings" />
      {userData.githubUrl !== null && userData.linkedinUrl !== null ? (
        <>
          <SettingsTileRecord
            label="GitHub"
            value={userData.githubUrl || ''}
            button={
              !userData.githubUrl
                ? {
                    text: 'Add',
                    onClick: () => openModal(<ChangeGitHubModal action="Add" />)
                  }
                : {
                    text: 'Update',
                    onClick: () =>
                      openModal(
                        <ChangeGitHubModal action="Update" defaultValue={userData.githubUrl} />
                      )
                  }
            }
          />
          <SettingsTileRecord
            label="LinkedIn"
            value={userData.linkedinUrl || ''}
            button={
              !userData.linkedinUrl
                ? {
                    text: 'Add',
                    onClick: () => openModal(<ChangeLinkedInModal action="Add" />)
                  }
                : {
                    text: 'Update',
                    onClick: () =>
                      openModal(
                        <ChangeLinkedInModal action="Update" defaultValue={userData.linkedinUrl} />
                      )
                  }
            }
          />
        </>
      ) : (
        <></>
      )}
    </Tile>
  )
}

export default SocialData
