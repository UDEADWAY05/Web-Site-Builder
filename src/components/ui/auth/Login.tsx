import { generateAuthSchema } from 'src/utils/generateAuthSchema'
import { Form } from '../form'
import { Button } from '../button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from 'src/store/store'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { FirebaseErrorMap } from 'src/constants/FirebaseErrorMap'
import { FormInputField } from './CustomFormField'
import { useFirebase } from 'src/hooks/useFirebase'
import { setUser } from 'src/store/slices/userSlice'
import { z } from 'zod'

export const Login = () => {
  const authSchema = generateAuthSchema({ isRegister: false })

  const form = useForm<z.infer<typeof authSchema>>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authSchema),
  })

  const {
    formState: { errors, isDirty, isValid, isSubmitting },
    setError,
  } = form
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const serverError = errors.root?.message

  const { signIn, getUserById } = useFirebase()

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const user = await signIn(email, password)
      const userData = await getUserById(user.uid)

      if (userData) {
        dispatch(
          setUser({
            id: user.uid,
            email,
            name: userData.name,
            surname: userData.surname,
          })
        )
        navigate('/')
      }
    } catch (e: unknown) {
      console.error(e)
      if (e instanceof FirebaseError) {
        setError('root', {
          type: 'Firebase_error',
          message: FirebaseErrorMap.get(e.code) ?? e.message,
        })
      } else if (e instanceof Error) {
        setError('root', { type: 'root_error', message: e.message })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1"
      >
        <FormInputField
          form={form}
          name={'email'}
          label="Email"
          type="text"
          placeholder="email"
        />
        <FormInputField
          form={form}
          name={'password'}
          label="Пароль"
          type="password"
          placeholder="password"
        />

        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Link
          to="/auth/signup"
          className="text-sm text-blue-500 hover:text-blue-800 justify-self-center"
        >
          No account yet? Signup
        </Link>
        {serverError && <p className="text-red-500">{serverError}</p>}
      </form>
    </Form>
  )
}
