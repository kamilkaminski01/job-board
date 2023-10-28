import Modal from 'components/organisms/Modal'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { handleApiResponse } from 'utils/handleApiResponse'
import { AccountDataModalProps } from './_interface'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useModals } from 'providers/modals/context'
import useUser from 'hooks/useUser'

const ChangeGitHubModal = ({ action, defaultValue }: AccountDataModalProps) => {
  const methods = useForm()
  const { closeModal } = useModals()
  const { updateUser } = useUser()

  const formID = 'githubForm'

  const onSubmit = async (formValues: FieldValues) => {
    const { githubUrl } = formValues

    const response = await updateUser({ githubUrl })

    handleApiResponse(response, closeModal, methods.setError)
  }

  return (
    <Modal title={`${action} your GitHub profile`} buttonText={action} formID={formID}>
      <FormProvider {...methods}>
        <form id={formID} className="modal__form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="githubUrl"
            placeholder="GitHub profile"
            defaultValue={defaultValue}
            validators={{ pattern: valid.githubPattern }}
          />
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ChangeGitHubModal
