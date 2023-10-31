import Modal from 'components/organisms/Modal'
import useUser from 'hooks/useUser'

const DeleteAccountModal = () => {
  const { deleteUser } = useUser()

  return (
    <Modal title="Delete account" buttonText="Delete" onSubmit={deleteUser}>
      Are you sure you want to delete your account? This operation is irreversible.
    </Modal>
  )
}

export default DeleteAccountModal
