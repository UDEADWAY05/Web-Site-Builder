import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import { removeUser } from "src/store/slices/userSlice";
import { selectUserData } from "src/store/slices/userSlice/selectors";
import { selectUserId } from "src/store/slices/userSlice/selectors";
import { useFirebase } from "src/hooks/useFirebase";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../components/ui/form' 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { z } from 'zod'

const profileSchema = z.object({
  email: z.string().email("Неверно введен email"),
  name:z.string().min(3,'Имя не может быть короче 3 символов'),
  surname:z.string().min(2,'Фамилия не должна быть короче 2 символов'),
});

export const ProfilePage = () => {
  const userData = useAppSelector(selectUserData)
  const userId = useAppSelector(selectUserId)

  const form = useForm<z.infer<typeof profileSchema>>({
    mode:'onTouched',
    defaultValues:{
        email:userData?.email,
        name:userData?.name,
        surname:userData?.surname,
    },
    resolver:zodResolver(profileSchema)
  })
  
  const { register,formState:{ errors,isDirty,isValid,isSubmitting },setError} = form
  const serverError =	errors.root?.message

  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch()
  const { updateUser,signOutUser } = useFirebase()
  const handleSignOut = async () => {
      await signOutUser()
      dispatch(removeUser())
  }

  const onSubmit = async ({ name,surname }:{name:string,surname:string,}) => {
    try {
      if (!userId){
        throw new Error('User ID is unknown')
      }
      const user = await updateUser(userId,name,surname)
    } catch (e) {
      if (e instanceof Error){
        console.log('error caught',e.message)
        setError('root',{type:'root',message:e.message})  
      }  
    }
  }    
  
  return (
    <div className='flex justify-center items-center'>

    <Form {...form} >  
    <form onSubmit={form.handleSubmit(onSubmit) } className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1">
        <h1 className="font-semibold size-sm w-full">Your profile</h1>
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
            <FormItem>
            <FormLabel htmlFor="name">Имя</FormLabel>
            <FormControl>
                <Input {...register('name')} id={'name'} type='text' placeholder="имя" {...field} disabled={!isEditing}/>
            </FormControl>
            <FormMessage />
            </FormItem>
        )} />
         <FormField
        control={form.control}
        name="surname"
        render={({ field }) => (
            <FormItem>
            <FormLabel htmlFor="surname">Фамилия</FormLabel>
            <FormControl>
                <Input {...register('surname')} id={'surname'} type='text' placeholder="фамилия" {...field} disabled={!isEditing}/>
            </FormControl>
            <FormMessage />
            </FormItem>
        )} />
        
        {isEditing ? (
            <Button variant="default" type='submit' className="w-full" disabled={!isValid}>Сохранить</Button>
          ) : (
            <Button variant="secondary" type="button" onClick={() => setIsEditing(true)} className="w-full hover:bg-gray-300" >Редактировать</Button>
          )}
        <Button variant="destructive" onClick={handleSignOut} className="w-full mt-2">Выйти из системы</Button>
        {serverError && <span className="text-red-500">{ serverError }</span>}
    </form>
    </Form>
  </div>

)
}