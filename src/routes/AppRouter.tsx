import { Routes, Route } from 'react-router-dom'
import { Main } from '../pages/MainPage'
import { RoutePaths } from './paths'
import { ProtectedRoute } from 'src/components/ui/auth/ProtectedRoute'
import { SiteNew } from 'src/pages/SiteNewPage'
import { NotFound } from 'src/pages/NotFoundPage'
import { ProfilePage } from 'src/pages/ProfilePage'
import { AuthWrapper } from 'src/components/ui/auth/AuthWrapper'
import { Login } from 'src/components/ui/auth/Login'
import { SignUp } from 'src/components/ui/auth/Signup'

export const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<ProtectedRoute auth={true} />}>
          <Route path={RoutePaths.MAIN} element={<Main />} />
          <Route path={RoutePaths.SITE_NEW} element={<SiteNew />} />
          <Route path={RoutePaths.USER} element={<ProfilePage />}/>
        </Route>
        
        <Route element={<ProtectedRoute auth={ false } />}>
          <Route path={RoutePaths.AUTH} element={<AuthWrapper />}>
            <Route path='' element={ <NotFound/> } />
            <Route path='login' element={<Login />}/>
            <Route path='signup' element={<SignUp /> }/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
