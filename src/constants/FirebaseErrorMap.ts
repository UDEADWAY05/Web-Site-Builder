export const FirebaseErrorMap = new Map<string, string>([
    ["auth/email-already-in-use", "Этот адрес электронной почты уже используется."],
    ["auth/invalid-email", "Некорректный адрес электронной почты."],
    ["auth/user-not-found", "Пользователь с таким адресом электронной почты не найден."],
    ["auth/wrong-password", "Неправильный пароль. Попробуйте снова."],
    ["auth/weak-password", "Пароль должен содержать минимум 6 символов."],
    ["auth/too-many-requests", "Слишком много попыток входа. Попробуйте позже."],
    ["auth/network-request-failed", "Ошибка сети. Проверьте подключение к интернету."],
    ["auth/requires-recent-login", "Эта операция требует недавнего входа. Пожалуйста, войдите снова."],
    ["auth/missing-email", "Введите адрес электронной почты."],
    ["auth/operation-not-allowed", "Эта операция не разрешена."],
    ["auth/invalid-credential", "Неверные учетные данные."],
    ["auth/credential-already-in-use", "Этот учетный данные уже используются."],
])
