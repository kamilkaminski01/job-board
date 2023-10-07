import { IUser } from 'models/user'

export interface UserContextProps {
  userData: IUser
  isLogged: boolean
  login: () => void
  logout: () => void
}
