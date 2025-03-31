import { z } from 'zod'

export const generateAuthSchema = ({isRegister}: {isRegister: boolean}) => {
    const schema = z.object({
      email: z.string().email("Неверно введен email"),
      password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
    });
  
    if (isRegister) {
      return schema.extend({
        name:z.string().min(3,'Имя не может быть короче 3 символов'),
<<<<<<< HEAD
=======
        surname:z.string().min(2,'Фамилия не должна быть короче 2 символов'),
>>>>>>> e2d4ac2 (fix:обновлен_стор_для_страницы_профиля.Верстка)
        confirmPassword: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  
    return schema;
  };