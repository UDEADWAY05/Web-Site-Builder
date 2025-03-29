import { generateAuthSchema } from "src/utils/generateAuthSchema"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../form'
import { Input } from "../input"
import { Button } from "../button"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { Link,useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { login } from "src/store/slices/userSlice/thunks"
import { z } from 'zod'

export const Login = () => {
    const authSchema = generateAuthSchema({ isRegister:false })
    
    const form = useForm<z.infer<typeof authSchema>>({
      defaultValues:{
        email:'',
        password:'',
      },
      resolver:zodResolver(authSchema)
    })

    const { register,formState:{ errors,isDirty,isValid,isSubmitting },setError} = form

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const serverError =	errors.root?.message
        
    const onSubmit = async ({ email,password }:{email:string,password:string}) => {  
      try {
        const user = await dispatch(login({ email,password }))

        navigate('/sites/new')  
      }
      catch (e) {
        if (e instanceof FirebaseError){
          setError('root', { type:'firebase_error',message:e.message })
        }
        else if (e instanceof Error){
            console.error(e)
            setError('root', { type:'root_error',message:e.message })
          }
      }}    
    
    return (
    <Form {...form}>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1">
        
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
            <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
                <Input {...register('email')} id={'email'} type='text'placeholder="email" {...field} autoFocus />
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
      <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
      <Link to='/auth/signup' className="text-sm text-blue-500 hover:text-blue-800 justify-self-center">No account yet? Signup</Link>
      {serverError && <span className="text-red-500">{ serverError }</span>}
    </form>
  </Form>
)
    }
