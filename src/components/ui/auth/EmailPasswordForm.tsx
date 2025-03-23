import { UserCredential } from "firebase/auth"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { setUser } from "src/store/slices/userSlice"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from '../form'
import { Input } from '../input'
import { Button } from '../button'
import { FormEvent } from "react"

type Inputs = {
  email: string
  password: string
}

interface EmailPasswodFormProps {
    handleFormSubmit:(email:string,password:string) => Promise<UserCredential>
}

export function EmailPasswordForm({handleFormSubmit}:EmailPasswodFormProps) {
  const form = useForm<Inputs>({
    defaultValues:{
      email:'',
      password:''
    },
  })
  const { formState:{ errors,isDirty,isValid },setError} = form
  console.log(isDirty,isValid)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password){
      setError('root',{type:'manual',message:'Проверьте правильность ввода email и пароля'})
      return
    }

    console.log(email,password)
    const { user } = await handleFormSubmit(email,password)
    console.log(user)
    dispatch(setUser({ email:user.email,id:user.uid,isLoggedIn:true }))

    navigate('/sites/new')
  } 

  return (
    <Form {...form}>
    <form onSubmit={onSubmit} className="px-2 py-4 flex flex-col">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field} required={true} minLength={6} />
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
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="password" {...field} required={true} minLength={6} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" disabled={!isDirty || !isValid}>Submit</Button>
        {errors.email && (<span role="alert">Проверьте правильность ввода email</span>)}
        {errors.password && (<span role="alert">Проверьте правильность ввода пароля</span>)}
    </form>
  </Form>
  )
}