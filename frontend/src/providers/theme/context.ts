import { createContext } from 'react'
import { ThemeContextProps } from './interface.ts'

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)
