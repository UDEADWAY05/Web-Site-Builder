import { Routes, Route, Navigate } from 'react-router-dom'
import { Main } from '../pages/MainPage'
import { RoutePaths } from './paths'
import { ProtectedRoute } from 'src/components/ui/auth/ProtectedRoute'
import { SiteNew } from 'src/pages/SiteNewPage'
import { NotFound } from 'src/pages/NotFoundPage'
import { UserPage } from 'src/pages/UserPage'
import { AuthWrapper } from 'src/components/ui/auth/AuthWrapper'
import { Login } from 'src/components/ui/auth/Login'
import { SignUp } from 'src/components/ui/auth/Signup'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Защищенные маршруты для авторизованных пользователей */}
      <Route element={<ProtectedRoute auth={true} />}>
        <Route path={RoutePaths.SITES} element={<Main />} />
        <Route
          path={`${RoutePaths.SITES_EDIT}`}
          element={<SiteNew />}
        />
        <Route path={RoutePaths.USER} element={<UserPage />} />
        <Route path={ RoutePaths.MAIN } element={<Navigate to={RoutePaths.SITES} />} />      
      </Route>

      {/* Маршруты для неавторизованных пользователей */}
      <Route element={<ProtectedRoute auth={false} />}>
        <Route path={RoutePaths.AUTH} element={<AuthWrapper />}>
          <Route path="" element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
