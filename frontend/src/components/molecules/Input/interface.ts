import { RegisterOptions } from 'react-hook-form'

export interface InputProps {
  name: string
  type?: string
  hideErrors?: boolean
  className?: string
  defaultValue?: string | number | readonly string[] | undefined
  placeholder?: string
  validators?: RegisterOptions
}
