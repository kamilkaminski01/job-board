import { ReactNode } from 'react'
import { FieldValues } from 'react-hook-form'

export interface FormProps {
  className?: string
  children: ReactNode
  formID: string
  onSubmit: (formValues: FieldValues) => void
}
