export type User = {
    id:string,
    email:string,
    name:string
}

export type UserState = {
  data: User | null,
  isLoggedIn: boolean,
  error: string | null
}