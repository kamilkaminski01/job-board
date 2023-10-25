import { createContext, useContext } from 'react'
import { ModalsContextProps } from './interface'

export const ModalsContext = createContext<ModalsContextProps>({} as ModalsContextProps)

export const useModals = () => useContext(ModalsContext)
