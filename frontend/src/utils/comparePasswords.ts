import { valid } from './Validators/validators'

export const comparePasswords = (password: string, confirmPassword: string) => {
  return confirmPassword === password || valid.differentPasswordsMessage
}
