import { IUser } from 'models/user'

export interface IUpdateUser extends Partial<IUser> {
  newPassword?: string
  currentPassword?: string
}
