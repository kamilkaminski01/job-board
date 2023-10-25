import { ReactNode } from 'react'

export interface ModalProps {
  children: ReactNode
  title: string
  buttonText: string
  formID?: string
  onSubmit?: () => void
}
