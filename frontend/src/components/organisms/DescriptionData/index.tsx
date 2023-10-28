import SettingsTileHeader from 'components/molecules/SettingsTileHeader'
import Tile from 'components/atoms/Tile'
import { DescriptionDataProps } from './interface'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import { useModals } from 'providers/modals/context'
import SettingsTileRecord from 'components/molecules/SettingsTileRecord'
import ChangeDescriptionModal from 'pages/SettingsPage/partials/modals/AccountData/ChangeDescriptionModal'

const DescriptionData = ({ className }: DescriptionDataProps) => {
  const { userData } = useContext(UserContext)
  const { openModal } = useModals()

  return (
    <Tile id="description-data" className={className} shadow="light">
      <SettingsTileHeader title="Description settings" />
      {userData.description !== null ? (
        <SettingsTileRecord
          label="Description"
          value={userData.description || ''}
          button={
            !userData.description
              ? {
                  text: 'Add',
                  onClick: () => openModal(<ChangeDescriptionModal action="Add" />)
                }
              : {
                  text: 'Update',
                  onClick: () =>
                    openModal(
                      <ChangeDescriptionModal action="Update" defaultValue={userData.description} />
                    )
                }
          }
        />
      ) : (
        <></>
      )}
    </Tile>
  )
}

export default DescriptionData
