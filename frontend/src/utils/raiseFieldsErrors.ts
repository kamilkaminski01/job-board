import { IServerResponseError } from 'models/serverResponseError'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

export const raiseFieldsErrors = <T extends FieldValues>(
  formErrors: Record<string, IServerResponseError[]>,
  setError: UseFormSetError<T>
) => {
  Object.entries(formErrors).forEach(([fieldName, fieldErrors]) => {
    fieldErrors.forEach((error) => setError(fieldName as Path<T>, { message: error.message }))
  })
}
