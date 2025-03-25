import { Routes, Route } from 'react-router-dom'
import { Main } from '../pages/MainPage'
import { RoutePaths } from './paths'

import { NotFound } from 'src/pages/NotFoundPage'
import { AuthPage } from 'src/pages/AuthPage'
import { SiteNew } from 'src/pages/SiteNewPage'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={RoutePaths.MAIN} element={<Main />} />
        <Route path={RoutePaths.SITE_NEW} element={<SiteNew />} />
        <Route path={RoutePaths.AUTH} element={<AuthPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}
