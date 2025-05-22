import { generateAuthSchema } from "src/utils/generateAuthSchema";

describe('функция generateAuthSchema', () => {
  it('валидирует корректно введенные данные', () => {
    const schema = generateAuthSchema({ isRegister: false });

    const result = schema.safeParse({
      email: 'test@example.com',
      password: '123456',
    });

    expect(result.success).toBe(true);
  });

  it('инвалидирует неверно введенный адрес почты', () => {
    const schema = generateAuthSchema({ isRegister: false });

    const result = schema.safeParse({
      email: 'invalid-email',
      password: '123456',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Неверно введен email');
  });

  it('Правильно валидирует форму регистрации при корректно введенных данных', () => {
    const schema = generateAuthSchema({ isRegister: true });

    const result = schema.safeParse({
      email: 'user@example.com',
      password: '123456',
      confirmPassword: '123456',
      name: 'Иван',
      surname: 'Иванов',
    });

    expect(result.success).toBe(true);
  });

  it('Инвалидирует форму регистрации при неверно введенных данных', () => {
    const schema = generateAuthSchema({ isRegister: true });
    const result = schema.safeParse({
      email: 'user@example.com',
      password: '123456',
      confirmPassword: '654321',
      name: 'Иван',
      surname: 'Иванов',
    });

    expect(result.success).toBe(false);
  });

  it('Инвалидирует форму регистрации при недостаточном количестве символов в поле имени', () => {
    const schema = generateAuthSchema({ isRegister: true });
    const result = schema.safeParse({
      email: 'user@example.com',
      password: '123456',
      confirmPassword: '123456',
      name: 'Ив',
      surname: 'И',
    });

    expect(result.success).toBe(false);
  });
});
