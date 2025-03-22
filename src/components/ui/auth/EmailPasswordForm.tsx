import { UserCredential } from "firebase/auth"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/hooks/redux-hooks"
import { setUser } from "src/store/slices/userSlice"

type Inputs = {
  email: string
  password: string
}

interface EmailPasswodFormProps {
    handleFormSubmit:(email:string,password:string) => Promise<UserCredential>
}

export function EmailPasswordForm({handleFormSubmit}:EmailPasswodFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors,isDirty,isValid },
  } = useForm<Inputs>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isInputsValid = !isDirty || !isValid

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { user } = await handleFormSubmit(data.email,data.password)
    dispatch(setUser({ email:user.email,id:user.uid,isLoggedIn:true }))

    navigate('/sites/new')
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Введите email" {...register("email", {required:true})}/>
      <input placeholder="Введите пароль"{...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}

      <button type="submit" disabled={isInputsValid} className={isInputsValid ? 'bg-red-400' : 'bg-green-400'}>Submit</button>
    </form>
  )
}