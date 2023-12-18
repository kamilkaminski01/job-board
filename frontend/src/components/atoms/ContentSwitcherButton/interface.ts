import { ReactNode } from 'react'

export interface ContentSwitcherButtonProps {
  children: ReactNode
  isActive: boolean
  onClick: () => void
}
