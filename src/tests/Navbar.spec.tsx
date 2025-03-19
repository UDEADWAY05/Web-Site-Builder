import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from './helper/renderWithRoutes'
import { NavBar } from 'src/components/ui/navbar'

// В начале файла с тестами
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Navbar', () => {
  test('test main link', async () => {
    render(renderWithRouter(<NavBar />))
    const mainLink = screen.getByTestId('main-link')
    userEvent.click(mainLink)
    expect(screen.getByTestId('main-page')).toBeInTheDocument()
  })

  test('test siteNew link', async () => {
    render(renderWithRouter(<NavBar />))
    const siteNewLink = screen.getByTestId('siteNew-link')
    userEvent.click(siteNewLink)
    expect(screen.getByTestId('siteNew-page')).toBeInTheDocument()
  })

  test('test notFound link', async () => {
    render(renderWithRouter(<NavBar />, 'jhjhi'))

    expect(screen.getByTestId('notFound-page')).toBeInTheDocument()
  })
})
