import { IServerResponse } from 'models/serverResponse'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { raiseFieldsErrors } from './raiseFieldsErrors'

export const handleApiResponse = <T extends FieldValues>(
  response: IServerResponse,
  onSucceed: () => void,
  formSetError: UseFormSetError<T>,
  fieldName?: string
) => {
  if (response.succeed) {
    onSucceed()
  } else if (response.errors) {
    raiseFieldsErrors(response.errors, formSetError)
  } else if (response.errorMessage && response.errorCode) {
    formSetError(fieldName as Path<T>, { message: response.errorMessage })
  } else {
    alert(response.errorMessage)
  }
}
