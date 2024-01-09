import { ReactNode, CSSProperties } from 'react'

export interface TileProps {
  children: ReactNode
  id?: string
  className?: string
  shadow?: 'normal' | 'light'
  style?: CSSProperties
  borderTop?: boolean
}
