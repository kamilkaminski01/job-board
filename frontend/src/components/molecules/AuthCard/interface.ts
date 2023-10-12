import { ReactNode } from 'react'

export interface AuthCardProps {
  children?: ReactNode
  title: string
  description?: string
  switchBox?: { text: string; link: string; linkText: string }
  externalAuth?: { text: string }
  submitButton?: { text: string; formID?: string; disabled: boolean }
}
