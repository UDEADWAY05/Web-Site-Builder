import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { checkUserData } from 'src/store/slices/userSlice/thunks'
import {
  selectUserData,
  selectUserId,
} from 'src/store/slices/userSlice/selectors'
import { Form } from '../components/ui/form'
import { FormInputField } from 'src/components/ui/auth/CustomFormField'
import { FirebaseError } from 'firebase/app'
import { useFirebase } from 'src/hooks/useFirebase'
import { FirebaseErrorMap } from 'src/constants/FirebaseErrorMap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'src/components/ui/button'
import { z } from 'zod'

const profileSchema = z.object({
  email: z.string().email('Неверно введен email'),
  name: z.string().min(3, 'Имя не может быть короче 3 символов'),
  surname: z.string().min(2, 'Фамилия не должна быть короче 2 символов'),
})

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const userData = useAppSelector(selectUserData)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const { updateUser, getUserById } = useFirebase()

  const form = useForm<z.infer<typeof profileSchema>>({
    mode: 'onTouched',
    defaultValues: {
      email: userData?.email,
      name: userData?.name,
      surname: userData?.surname,
    },
    resolver: zodResolver(profileSchema),
  })

  const {
    formState: { errors, isValid, isSubmitting },
    setError,
  } = form
  const serverError = errors.root?.message

  const onSubmit = async ({
    name,
    surname,
  }: {
    name: string
    surname: string
  }) => {
    try {
      if (!userId) {
        return
      }
      await updateUser(userId, name, surname)
      dispatch(checkUserData({ id: userId, getUserById }))
      setIsEditing(false)
    } catch (e) {
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
    <main className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1"
        >
          <h1 className="font-semibold size-sm w-full">Ваши данные:</h1>

          <FormInputField
            form={form}
            name={'name'}
            label="Имя"
            type="text"
            placeholder="имя"
            disabled={!isEditing}
          />
          <FormInputField
            form={form}
            name={'surname'}
            label="Фамилия"
            type="text"
            placeholder="фамилия"
            disabled={!isEditing}
          />

          {/* Button keys to prevent propagation click on save button after edit button click*/}
          {isEditing ? (
            <Button
              key="save"
              variant="default"
              type="submit"
              className="w-full"
              disabled={!isValid || isSubmitting}
            >
              Сохранить
            </Button>
          ) : (
            <Button
              key="edit"
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="w-full hover:bg-gray-300"
            >
              Редактировать
            </Button>
          )}

          {isEditing && (
            <Button variant="default" onClick={() => setIsEditing(false)}>
              Отменить редактирование
            </Button>
          )}
          {serverError && <span className="text-red-500">{serverError}</span>}
        </form>
      </Form>
    </main>
  )
}
