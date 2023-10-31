import classNames from 'classnames'
import SettingsTileSubtitle from 'components/atoms/SettingsTileSubtitle'
import Tile from 'components/atoms/Tile'
import SettingsTileRecord from 'components/molecules/SettingsTileRecord'
import SettingsTileHeader from 'components/molecules/SettingsTileHeader'
import { UserContext } from 'providers/user/context'
import { useContext } from 'react'
import { AccountDeletionProps } from './interface'
import DeleteAccountModal from 'pages/SettingsPage/partials/modals/AccountDeletion/DeleteAccountModal'
import { useModals } from 'providers/modals/context'

const AccountDeletion = ({ className }: AccountDeletionProps) => {
  const { userData } = useContext(UserContext)
  const { openModal } = useModals()

  return (
    <Tile id="account-deletion" className={classNames(className)} shadow="light">
      <SettingsTileHeader
        title="Delete account"
        button={{ text: 'Delete', onClick: () => openModal(<DeleteAccountModal />) }}
      />
      <SettingsTileSubtitle>
        Deleting your account means that all your data will be deleted without a possibility of
        recovery
      </SettingsTileSubtitle>
      <SettingsTileRecord
        label="Account data"
        value={`${userData.firstName} ${userData.lastName}`}
        secondValue={userData.email}
      />
    </Tile>
  )
}

export default AccountDeletion
