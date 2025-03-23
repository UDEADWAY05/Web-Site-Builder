import { UserCredential } from "firebase/auth"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { setUser } from "src/store/slices/userSlice"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from '../form'
import { Input } from '../input'
import { Button } from '../button'
import { FormEvent } from "react"
import { FirebaseError } from "firebase/app"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email:z.string().min(6,{ message:'Email должен содержать не меньше 6 символов' }).email('Email введен неверно'),
  password:z.string().min(6,{ message: 'Пароль должен содержать минимум 6 символов'})
})

interface EmailPasswodFormProps {
    handleFormSubmit:(email:string,password:string) => Promise<UserCredential>
}

export function EmailPasswordForm({handleFormSubmit}:EmailPasswodFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    mode:'onBlur',
    defaultValues:{
      email:'',
      password:''
    },
    resolver:zodResolver(schema)
  })

  const { register,formState:{ errors,isDirty,isValid },setError} = form

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const serverError =	errors.root?.message
	
  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {    
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      const email = formData.get('email')?.toString()
      const password = formData.get('password')?.toString()

      if (!email || !password){
        setError('root',{type:'manual',message:'Поля имени и пароля не могут быть пустыми'})
        return
      }

      const { user } = await handleFormSubmit(email,password)
      dispatch(setUser({ email:user.email,id:user.uid,isLoggedIn:true }))
  
      navigate('/sites/new')
    } 
    catch (e) {
      if (e instanceof FirebaseError){
        setError('root',{type:'server',message:e.message})
      }
    }
  } 

  return (
    <Form {...form}>
    <form onSubmit={onSubmit} className="px-2 py-4 flex flex-col w-1/4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input {...register('email')} id={'email'} placeholder="email" {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl>
              <Input {...register('password')} id={'password'} type='password' placeholder="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" disabled={!isDirty || !isValid}>Submit</Button>
      {serverError && <span className="text-red-500">{ serverError }</span>}
    </form>
  </Form>
  )
}