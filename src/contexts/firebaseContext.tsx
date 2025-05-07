import { UserCredential } from 'firebase/auth'
import { createContext, useEffect, useMemo } from 'react'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { useAppDispatch } from 'src/store/store'
import { auth, firebaseService } from 'src/firebase'
import { loggedOutUser, setUser } from 'src/store/slices/userSlice'

export interface FirebaseApi {
  signUp: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => Promise<UserCredential>
  signIn: (email: string, password: string) => Promise<User>
  getUserById: (id: string) => Promise<DocumentData | undefined>
  signOutUser: () => Promise<void>
  updateUser: (id: string, name: string, surname: string) => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const FirebaseContext = createContext<FirebaseApi | null>(null)

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useAppDispatch()
  const service = useMemo(() => firebaseService, [])

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userId = localStorage.getItem('user-local-id')
          if (userId) {
            const userData = await service.getUserById(userId)

            dispatch(
              setUser({
                id: userId,
                email: user.email || '',
                name: userData?.name || '',
                surname: userData?.surname || '',
              })
            )
          }
          if (user.refreshToken) {
            localStorage.setItem('jwt-refresh-token', user.refreshToken)
          }
        } catch (error) {
          console.error('Error handling auth state:', error)
        }
      } else {
        // Очищаем данные пользователя при выходе
        dispatch(loggedOutUser())
        localStorage.removeItem('jwt-refresh-token')
      }
    })
    return () => unsub()
  }, [dispatch, service])

  return (
    <FirebaseContext.Provider value={service}>
      {children}
    </FirebaseContext.Provider>
  )
}
