import { createContext } from 'react'
import { UserContextProps } from './interface'

export const UserContext = createContext<UserContextProps>({} as UserContextProps)
