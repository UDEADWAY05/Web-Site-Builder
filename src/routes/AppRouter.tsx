import { Routes, Route } from 'react-router-dom'
import { Main } from '../pages/Main'
import { RoutePaths } from './paths'
import { NavBar } from 'src/components/ui/navBar'
import { SiteNew } from 'src/pages/SiteNew'

export const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutePaths.MAIN} element={<Main />} />
        <Route path={RoutePaths.SITE_NEW} element={<SiteNew />} />
      </Routes>
    </>
  )
}
