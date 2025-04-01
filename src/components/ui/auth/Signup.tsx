import { generateAuthSchema } from "src/utils/generateAuthSchema"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../form'
import { useFirebase } from "src/hooks/useFirebase"
import { useDispatch } from "react-redux"
import { setUser } from "src/store/slices/userSlice"
import { Input } from "../input"
import { Button } from "../button"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { z } from 'zod'

export const SignUp = () => {
    const authSchema = generateAuthSchema({ isRegister:true })
    
    const form = useForm<z.infer<typeof authSchema>>({
        mode:'onTouched',
        defaultValues:{
            email:'',
            password:'',
            name:'',
            surname:''
        },
        resolver:zodResolver(authSchema)
    })

    const { register,formState:{ errors,isDirty,isValid,isSubmitting },setError} = form
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const serverError =	errors.root?.message
    console.log(errors)
    const { signUp } = useFirebase()    

    const onSubmit = async ({ email,password,name,surname }:{email:string,password:string,name:string,surname:string}) => {
      try {
        const userCredential = await signUp(email,password,name,surname)
        const user = userCredential.user
       
        if (user){
          dispatch(setUser({ id:user.uid, email, name, surname }))
          navigate('/sites/new')
        }  
      } catch (e) {
        if (e instanceof Error){
          setError('root',{type:'root',message:e.message})  
        }  
      }
    }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit) } className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1">
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
        name="name"
        render={({ field }) => (
            <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
                <Input {...register('name')} id={'name'} type='text' placeholder="name" {...field}/>
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="surname"
        render={({ field }) => (
            <FormItem>
            <FormLabel htmlFor="surname">Surname</FormLabel>
            <FormControl>
                <Input {...register('surname')} id={'surname'} type='text' placeholder="surname" {...field}/>
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
        <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
            <FormItem>
                <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                <FormControl>
                    <Input {...register('confirmPassword')} id={'confirmPassword'} type='password' placeholder="Confirm password" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
        <Link to='/auth/login' className="text-sm text-blue-500 hover:text-blue-800 justify-self-center">Have an account? Login</Link>
        {serverError && <span className="text-red-500">{ serverError }</span>}
    </form>
    </Form>
)
}
