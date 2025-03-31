import { generateAuthSchema } from "src/utils/generateAuthSchema"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../form'
import { Input } from "../input"
import { Button } from "../button"
import { useAuth } from "src/hooks/useAuth"
import { setUser } from "src/store/slices/userSlice"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { Link,useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { z } from 'zod'




export const Login = () => {
    const authSchema = generateAuthSchema({ isRegister:false })
    
    const form = useForm<z.infer<typeof authSchema>>({
      mode:'onTouched',
      defaultValues:{
        email:'',
        password:'',
      },
      resolver:zodResolver(authSchema)
    })

    const { register,formState:{ errors,isDirty,isValid,isSubmitting },setError} = form
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const { signIn } = useAuth()
        
    const onSubmit = async ({ email,password }:{email:string,password:string}) => {  
      try {
        const user = await signIn(email,password)
        console.log(user)

        if (user){
          dispatch(setUser({ email:user.email,id:user.userId,name:user.name,surname:user.surname }))
          navigate('/sites/new')
        }
      }
      catch (e) {
        if (e instanceof Error){
          setError('root',{type:'root',message:e.message})  
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
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  </Form>
)
}
