import Modal from 'components/organisms/Modal'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { handleApiResponse } from 'utils/handleApiResponse'
import { AccountDataModalProps } from './_interface'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useModals } from 'providers/modals/context'
import useUser from 'hooks/useUser'

const ChangeLinkedInModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateUser } = useUser()

  const formID = 'linkedinForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { linkedinUrl } = formValues

    const response = await updateUser({ linkedinUrl })

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title={`${action} your LinkedIn profile`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="linkedinUrl"
            placeholder="LinkedIn profile"
            defaultValue={defaultValue}
            validators={{ pattern: valid.linkedinPattern }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ChangeLinkedInModal
