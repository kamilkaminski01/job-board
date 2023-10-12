import { FieldValues } from 'react-hook-form'
import useAuth from 'hooks/useAuth'
import { valid } from 'utils/Validators/validators'
import './style.scss'
import Input from 'components/molecules/Input'
import AuthCard from 'components/molecules/AuthCard'
import { PATHS } from 'utils/consts'
import Form from 'components/atoms/Form'

const LoginPage = () => {
  const { errorMessage, isLoading, login } = useAuth()
  const formID = 'loginForm'

  const onSubmit = (formValues: FieldValues): void => {
    const { email, password } = formValues

    login({ email, password })
  }

  return (
    <AuthCard
      title="Login"
      switchBox={{
        text: 'Need an account?',
        linkText: 'Register',
        link: PATHS.register
      }}
      externalAuth={{ text: 'Login with' }}
      submitButton={{ text: 'Login', formID, disabled: isLoading }}>
      <Form className="login-form" formID={formID} onSubmit={onSubmit}>
        <>
          {errorMessage && <p className="login-form__error-message">{errorMessage}</p>}

          <Input
            name="email"
            placeholder="Email"
            validators={{ required: valid.required, pattern: valid.emailPattern }}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            validators={{ required: valid.required }}
          />
        </>
      </Form>
    </AuthCard>
  )
}

export default LoginPage
