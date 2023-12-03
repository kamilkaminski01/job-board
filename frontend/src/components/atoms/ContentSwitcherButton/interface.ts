import { ReactNode } from 'react'

export interface ContentSwitcherButtonProps {
  children: ReactNode
  className?: string
  isActive: boolean
  onClick: () => void
}
