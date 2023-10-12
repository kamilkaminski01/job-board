import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import useAuth from 'hooks/useAuth'
import { valid } from 'utils/Validators/validators'
import './style.scss'
import Input from 'components/molecules/Input'
import AuthCard from 'components/molecules/AuthCard'
import { PATHS } from 'utils/consts'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import { comparePasswords } from 'utils/comparePasswords'
import { raiseFieldsErrors } from 'utils/raiseFieldsErrors'

const RegisterPage = () => {
  const { isLoading, register } = useAuth()
  const methods = useForm()

  const formID = 'registerForm'
  const currentPassword = methods.watch('password')

  const onSubmit = async (data: FieldValues) => {
    const { firstName, lastName, email, password } = data

    const response = await register({ firstName, lastName, email, password })

    if (!response.succeed && response.errors) {
      raiseFieldsErrors(response.errors, methods.setError)
    }
  }

  return (
    <AuthCard
      title="Register"
      switchBox={{ text: 'Already signed up?', linkText: 'Login', link: PATHS.login }}
      externalAuth={{ text: 'Sign up with' }}
      submitButton={{ text: 'Sign Up', formID, disabled: isLoading }}>
      <FormProvider {...methods}>
        <form className="register-form" id={formID} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="register-form__fields-wrapper">
            <Input
              name="firstName"
              placeholder="Name"
              validators={{ required: valid.required, ...validSchemas.name }}
            />

            <Input
              name="lastName"
              placeholder="Last Name"
              validators={{ required: valid.required, ...validSchemas.name }}
            />
          </div>

          <Input
            name="email"
            placeholder="Email"
            validators={{ required: valid.required, pattern: valid.emailPattern }}
          />

          <div className="register-form__fields-wrapper">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              validators={{ required: valid.required, pattern: valid.passwordPattern }}
            />

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              validators={{
                required: valid.required,
                validate: (value) => comparePasswords(currentPassword, value)
              }}
            />
          </div>
        </form>
      </FormProvider>
    </AuthCard>
  )
}

export default RegisterPage
