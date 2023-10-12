import { ReactNode } from 'react'

export interface ButtonProps {
  children?: ReactNode
  className?: string
  disable?: boolean
  type?: 'submit' | 'button' | 'reset'
  form?: string
  onClick?: (e?: any) => void
}
