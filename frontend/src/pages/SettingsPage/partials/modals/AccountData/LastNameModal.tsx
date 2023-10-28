import Input from 'components/molecules/Input'
import Modal from 'components/organisms/Modal'
import useUser from 'hooks/useUser'
import { useModals } from 'providers/modals/context'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { handleApiResponse } from 'utils/handleApiResponse'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { AccountDataModalProps } from './_interface'

const LastNameModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateUser } = useUser()

  const formID = 'lastNameForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { lastName } = formValues

    const response = await updateUser({ lastName })

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title={`${action} last name`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="lastName"
            placeholder="Last name"
            defaultValue={defaultValue}
            validators={{ required: valid.required, ...validSchemas.name }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default LastNameModal
