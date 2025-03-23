import { Routes, Route } from 'react-router-dom'
import { Main } from '../pages/MainPage'
import { RoutePaths } from './paths'
import { ProtectedRoute } from 'src/components/ui/auth/ProtectedRoute'
import { SiteNew } from 'src/pages/SiteNewPage'
import { NotFound } from 'src/pages/NotFoundPage'
import { AuthPage } from 'src/pages/AuthPage';

export const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<ProtectedRoute auth={true} />}>
          <Route path={RoutePaths.MAIN} element={<Main />} />
          <Route path={RoutePaths.SITE_NEW} element={<SiteNew />} />
        </Route>
        
        <Route element={<ProtectedRoute auth={ false } />}>
          <Route path={RoutePaths.AUTH} element={<AuthPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
