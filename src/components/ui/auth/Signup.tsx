import { generateAuthSchema } from "src/utils/generateAuthSchema"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../form'
import { signup } from "src/store/slices/userSlice/thunks"
import { Input } from "../input"
import { Button } from "../button"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { useNavigate } from "react-router-dom"
import { z } from 'zod'

export const SignUp = () => {
    const authSchema = generateAuthSchema({ isRegister:true })
    
    const form = useForm<z.infer<typeof authSchema>>({
    mode:'onBlur',
    defaultValues:{
        email:'',
        password:'',
        name:''
    },
    resolver:zodResolver(authSchema)
    })

    const { register,formState:{ errors,isDirty,isValid },setError} = form

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const serverError = errors.root?.message
    
    const onSubmit = async ({ email,password,name }:{email:string,password:string,name:string}) => {
      console.log('data: ',email,password,name)    
      dispatch(signup({ email,password,name }))

      navigate('/sites/new')
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
        <Button type="submit" disabled={!isDirty || !isValid}>Submit</Button>
        {serverError && <span className="text-red-500">{ serverError }</span>}
    </form>
    </Form>
)
}
