import { IUser } from 'models/user'

export interface UserContextProps {
  userData: IUser
  isLogged: boolean
  updateUserData: () => void
  login: () => void
  logout: () => void
}
