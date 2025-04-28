import { User } from './types'
import { setUser, loggedOutUser } from './userSlice'
import reducer from './userSlice'

export type { User }
export { setUser, reducer, loggedOutUser }
