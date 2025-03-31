import { useState,useEffect, ChangeEvent, FormEvent } from "react";
import { useAppSelector } from "src/hooks/redux-hooks";
import { useAuth } from "src/hooks/useAuth";
import { selectUserData } from "src/store/slices/userSlice/selectors";
import { selectUserId } from "src/store/slices/userSlice/selectors";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '../components/ui/form'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { z } from 'zod'

interface ProfileData {
  email:string
  name:string
  surname:string,
}

const profileSchema = z.object({
  email: z.string().email("Неверно введен email"),
  name:z.string().min(3,'Имя не может быть короче 3 символов'),
  surname:z.string().min(2,'Фамилия не должна быть короче 2 символов'),
});

export const ProfilePage = () => {
  const userData = useAppSelector(selectUserData)

  const form = useForm<z.infer<typeof profileSchema>>({
    mode:'onTouched',
    defaultValues:{
        email:userData?.email,
        name:userData?.name,
        surname:userData?.surname
    },
    resolver:zodResolver(profileSchema)
  })
  
  const { register,formState:{ errors,isDirty,isValid,isSubmitting },setError} = form

  const [isEditing, setIsEditing] = useState(false);
  const userId = useAppSelector(selectUserId)
  
  const { getUserById } = useAuth()
  
  // useEffect(() => {
  //   if (!userId){
  //       return 
  //   }
  //   getUserById(userId).then((data) => {
  //     if (data) {
  //       setUser((prev) => ({...prev,name:data.name,surname:data.surname,email:data.email}))
  //     }
  //   })
  // }, []);

  // const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
  //   console.log('handler')
  //     console.log(e.target.name,e.target.value)
  //     setUser(prev => ({...prev,[e.target.name]:e.target.value}))
  // }
  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  //   if (user) {
  //     await updateUserProfile(user.uid, name, surname);
  //     alert('Profile updated successfully');
  //     setIsEditing(false);
    }
   
  const handleUpdate = () => {}

  // const handleLogout = async () => {
  //   await signOutUser();
  //   navigate('/login');
  // };

  const handleLogout = () => {}
  
  return (
    <div className='flex justify-center items-center'>

    <Form {...form} >  
    <form onSubmit={form.handleSubmit(onSubmit) } className="px-2 py-4 flex flex-col sm:w-1/2 md:w-1/3 gap-1">
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
            <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
                <Input {...register('email')} id={'email'} type='text'placeholder="email" {...field} disabled={!isEditing}/>
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
            <Button variant="default" className="w-full">Save</Button>
          ) : (
            <Button variant="secondary" type="button" onClick={() => setIsEditing(true)} className="w-full hover:bg-gray-300" >Edit</Button>
          )}
        <Button variant="destructive" onClick={handleLogout} className="w-full mt-2">Выйти из системы</Button>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
    </Form>
  </div>

)
}