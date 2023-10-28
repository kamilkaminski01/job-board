import Tile from 'components/atoms/Tile'
import { UserContext } from 'providers/user/context'
import { useContext } from 'react'
import { useModals } from 'providers/modals/context'
import SettingsTileHeader from 'components/molecules/SettingsTileHeader'
import SettingsTileRecord from 'components/molecules/SettingsTileRecord'
import FirstNameModal from 'pages/SettingsPage/partials/modals/AccountData/FirstNameModal'
import LastNameModal from 'pages/SettingsPage/partials/modals/AccountData/LastNameModal'
import ChangePasswordModal from 'pages/SettingsPage/partials/modals/AccountData/ChangePasswordModal'

const AccountData = () => {
  const { userData } = useContext(UserContext)
  const { openModal } = useModals()

  return (
    <Tile id="account-data" shadow="light">
      <SettingsTileHeader title="Account settings" />
      <SettingsTileRecord
        label="First name"
        value={userData.firstName}
        button={
          !userData.firstName
            ? {
                text: 'Add',
                onClick: () => openModal(<FirstNameModal action="Add" />)
              }
            : {
                text: 'Update',
                onClick: () =>
                  openModal(<FirstNameModal action="Update" defaultValue={userData.firstName} />)
              }
        }
      />
      <SettingsTileRecord
        label="Last name"
        value={userData.lastName}
        button={
          !userData.lastName
            ? {
                text: 'Add',
                onClick: () => openModal(<LastNameModal action="Add" />)
              }
            : {
                text: 'Update',
                onClick: () =>
                  openModal(<LastNameModal action="Update" defaultValue={userData.lastName} />)
              }
        }
      />
      <SettingsTileRecord className="tile__record" label="Email" value={userData.email} />
      <SettingsTileRecord
        label="Password"
        value="*******"
        valueType="password"
        button={{ text: 'Update', onClick: () => openModal(<ChangePasswordModal />) }}
      />
    </Tile>
  )
}

export default AccountData
