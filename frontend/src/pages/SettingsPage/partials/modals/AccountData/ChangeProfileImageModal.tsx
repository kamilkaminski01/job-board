import Modal from 'components/organisms/Modal'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { handleApiResponse } from 'utils/handleApiResponse'
import { AccountDataModalProps } from './_interface'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useModals } from 'providers/modals/context'
import useUser from 'hooks/useUser'

const ChangeProfileImage = ({ action }: AccountDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateUser } = useUser()

  const formID = 'profileImageForm'
  const formData = new FormData()

  const onSubmit = async (formValues: FieldValues) => {
    const { image } = formValues
    formData.append('image', image[0])

    const response = await updateUser(formData, true)

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title={`${action} your profile image`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input name="image" type="file" validators={{ validate: valid.imageFileFormat }} />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ChangeProfileImage
