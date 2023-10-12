import { FormProvider, useForm } from 'react-hook-form'
import { FormProps } from './interface'

const Form = ({ children, formID, className, onSubmit }: FormProps) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form id={formID} className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
