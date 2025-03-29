import { z } from 'zod'

export const generateAuthSchema = ({isRegister}: {isRegister: boolean}) => {
    const schema = z.object({
      email: z.string().email("Неверно введен email"),
      password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
    });
  
    if (isRegister) {
      return schema.extend({
        name:z.string(),
        confirmPassword: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  
    return schema;
  };