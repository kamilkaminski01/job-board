import axios, { AxiosError } from 'axios'
import { IServerResponse } from 'models/serverResponse'

export const parseApiErrors = <T>(error: unknown): IServerResponse<T> => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError

    try {
      const response = JSON.parse(err.request.response)

      if (response.message && response.code) {
        const errorMessage: IServerResponse['errorMessage'] = response.message
        const errorCode: IServerResponse['errorCode'] = response.code

        return { succeed: false, errorMessage, errorCode }
      } else {
        const errors: IServerResponse['errors'] = response

        return { succeed: false, errors }
      }
    } catch {
      return { succeed: false, errorMessage: 'Something went wrong. Try again.' }
    }
  } else {
    return { succeed: false, errorMessage: 'Something went wrong. Try again.' }
  }
}
