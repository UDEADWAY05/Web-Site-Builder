import { Routes, Route } from 'react-router-dom'
import { Main } from '../pages/MainPage'
import { RoutePaths } from './paths'
import { NavBar } from 'src/components/ui/navbar'
import { SiteNew } from 'src/pages/SiteNewPage'
import { NotFound } from 'src/pages/NotFoundPage'

export const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutePaths.MAIN} element={<Main />} />
        <Route path={RoutePaths.SITE_NEW} element={<SiteNew />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
