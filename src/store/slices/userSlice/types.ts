export type User = {
  id: string
  email: string
  name: string
  surname: string
}

export type Auth = {
  userId: User['id']
}
export type UserState = {
  data: User | null
  auth: Auth | null
  isLoading: boolean
  isLoggedIn: boolean
  error: string | null
}
