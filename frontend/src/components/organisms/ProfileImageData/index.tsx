import SettingsTileHeader from 'components/molecules/SettingsTileHeader'
import Tile from 'components/atoms/Tile'
import { ProfileImageDataProps } from './interface'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import { useModals } from 'providers/modals/context'
import SettingsTileRecord from 'components/molecules/SettingsTileRecord'
import ChangeProfileImageModal from 'pages/SettingsPage/partials/modals/AccountData/ChangeProfileImageModal'

const ProfileImageData = ({ className }: ProfileImageDataProps) => {
  const { userData } = useContext(UserContext)
  const { openModal } = useModals()

  return (
    <Tile id="profile-image-data" className={className} shadow="light">
      <SettingsTileHeader title="Profile image settings" />
      {userData.image !== null ? (
        <SettingsTileRecord
          label="Profile image"
          value={userData.image}
          valueType="image"
          button={{
            text: 'Update',
            onClick: () =>
              openModal(<ChangeProfileImageModal action="Update" defaultValue={userData.image} />)
          }}
        />
      ) : (
        <></>
      )}
    </Tile>
  )
}

export default ProfileImageData
