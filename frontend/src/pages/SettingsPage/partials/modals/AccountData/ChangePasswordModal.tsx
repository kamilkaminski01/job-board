import Input from 'components/molecules/Input'
import Modal from 'components/organisms/Modal'
import useUser from 'hooks/useUser'
import { valid } from 'utils/Validators/validators'
import { useModals } from 'providers/modals/context'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { comparePasswords } from 'utils/comparePasswords'
import { TModalActions } from 'models/modalActions'
import { handleApiResponse } from 'utils/handleApiResponse'

const ChangePasswordModal = () => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateUser } = useUser()

  const action: TModalActions = 'Change'
  const formID = 'changePasswordForm'
  const newPassword = methods.watch('newPassword')

  const onSubmit = async (formValues: FieldValues) => {
    const { currentPassword, newPassword } = formValues

    const response = await updateUser({ currentPassword, newPassword })

    handleApiResponse(response, closeModal, methods.setError, 'currentPassword')
  }

  return (
    <Modal title={`${action} password`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="currentPassword"
            type="password"
            placeholder="Current password"
            validators={{ required: valid.required }}
          />
          <Input
            name="newPassword"
            type="password"
            placeholder="New password"
            validators={{ required: valid.required, pattern: valid.passwordPattern }}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            validators={{
              required: valid.required,
              validate: (confirmPassword) => comparePasswords(newPassword, confirmPassword)
            }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ChangePasswordModal
