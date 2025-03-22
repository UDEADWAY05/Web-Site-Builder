import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from 'src/routes/AppRouter'

export const renderWithRouter = (
  component: ReactElement,
  initialRoute: string = '/'
) => {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRoutes />
      {component}
    </MemoryRouter>
  )
}
