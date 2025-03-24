import { FormEvent } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { setUser } from "src/store/slices/userSlice"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from '../form'
import { Input } from '../input'
import { Button } from '../button'
import { UserCredential } from "firebase/auth"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface AuthFormProps {
    handleFormSubmit:(email:string,password:string) => Promise<UserCredential>,
    isRegister:boolean
}

const generateAuthSchema = (isRegister: boolean) => {
    const baseSchema = z.object({
      email: z.string().email("Неверно введен email"),
      password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
    });
  
    if (isRegister) {
      return baseSchema.extend({
        confirmPassword: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  
    return baseSchema;
  };

export function AuthForm({ handleFormSubmit,isRegister }:AuthFormProps) {
  const authSchema = generateAuthSchema(isRegister)
  const form = useForm<z.infer<typeof authSchema>>({
    mode:'onBlur',
    defaultValues:{
      email:'',
      password:'',
      ...(isRegister && { confirmPassword:'' })
    },
    resolver:zodResolver(authSchema)
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
    catch (e:unknown) {
      if (e instanceof Error){
        setError('root', { type:'server',message:e.message })
      }
  }} 

  return (
    <Form {...form}>
    <form onSubmit={onSubmit} className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1">
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
      {isRegister && <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
            <FormControl>
              <Input {...register('confirmPassword')} id={'confirmPassword'} type='password' placeholder="Conform password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />}
      
      <Button type="submit" disabled={!isDirty || !isValid}>Submit</Button>
      {serverError && <span className="text-red-500">{ serverError }</span>}
    </form>
  </Form>
  )
}