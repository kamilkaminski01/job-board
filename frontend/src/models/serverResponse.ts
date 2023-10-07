import { IServerResponseError } from './serverResponseError'

export interface IServerResponse<T = unknown> {
  succeed: boolean
  data?: T
  errorMessage?: string
  errorCode?: string
  errors?: Record<string, IServerResponseError[]>
}
