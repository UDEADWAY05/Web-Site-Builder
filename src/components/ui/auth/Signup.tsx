import { generateAuthSchema } from 'src/utils/generateAuthSchema'
import { Form } from '../form'
import { FormInputField } from './CustomFormField'
import { useFirebase } from 'src/hooks/useFirebase'
import { useDispatch } from 'react-redux'
import { setUser } from 'src/store/slices/userSlice'
import { FirebaseError } from 'firebase/app'
import { FirebaseErrorMap } from 'src/constants/FirebaseErrorMap'
import { Button } from '../button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

export const SignUp = () => {
  const authSchema = generateAuthSchema({ isRegister: true })

  const form = useForm<z.infer<typeof authSchema>>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
    },
    resolver: zodResolver(authSchema),
  })

  const {
    formState: { errors, isDirty, isValid, isSubmitting },
    setError,
  } = form
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const serverError = errors.root?.message

  const { signUp } = useFirebase()

  const onSubmit = async ({
    email,
    password,
    name,
    surname,
  }: {
    email: string
    password: string
    name: string
    surname: string
  }) => {
    try {
      const userCredential = await signUp(email, password, name, surname)
      const user = userCredential.user

      if (user) {
        dispatch(setUser({ id: user.uid, email, name, surname }))
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
          label="Почта"
          type="text"
          placeholder="email"
        />
        <FormInputField
          form={form}
          name={'name'}
          label="Имя"
          type="text"
          placeholder="Имя"
        />
        <FormInputField
          form={form}
          name={'surname'}
          label="Фамилия"
          type="text"
          placeholder="Фамилия"
        />
        <FormInputField
          form={form}
          name={'password'}
          label="Пароль"
          type="password"
          placeholder="пароль"
        />
        <FormInputField
          form={form}
          name={'confirmPassword'}
          label="Подтвердите пароль"
          type="password"
          placeholder="подтвердите пароль"
        />

        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {isSubmitting ? 'Отправка данных...' : 'Регистрация'}
        </Button>
        <Link
          to="/auth/login"
          className="text-sm text-blue-500 hover:text-blue-800 justify-self-center"
        >
          Есть аккаунт? Войти.
        </Link>
        {serverError && <span className="text-red-500">{serverError}</span>}
      </form>
    </Form>
  )
}
