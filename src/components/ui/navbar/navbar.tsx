import { Link, useNavigate } from 'react-router-dom'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { RoutePaths } from 'src/routes/paths'
import { useFirebase } from 'src/hooks/useFirebase'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { isUserLoggedIn } from 'src/store/slices/userSlice/selectors'
import { loggedOutUser } from 'src/store/slices/userSlice'
import { Button } from '../button'
import { ButtonNewSite } from '../siteNew/buttonNewSite/buttonNewSite'

// import { useAuth } from 'src/hooks/useAuth'
// import { removeUser } from 'src/store/slices/userSlice'

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface NavigationProp {
  name: string
  href: string
  current: boolean
  id: string
}

export function NavBar() {
  const navigation: NavigationProp[] = [
    {
      name: 'Главная',
      href: `${RoutePaths.MAIN}`,
      current: true,
      id: 'main',
    },
  ]
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(isUserLoggedIn)

  const dispatch = useAppDispatch()
  const { signOutUser } = useFirebase()

  const handleSignOut = async () => {
    await signOutUser()
    dispatch(loggedOutUser())
    navigate('/auth/login')
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              }
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              }
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    data-testid={`${item.id}-link`}
                    aria-current="page"
                    className="bg-gray-900 text-white
                        hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {<ButtonNewSite />}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn && (
              <>
                <Link to="/user">
                  <Button className="hover:bg-gray-700">Профиль</Button>
                </Link>
                <Button
                  variant="default"
                  className="hover:bg-gray-700"
                  onClick={handleSignOut}
                >
                  Выйти
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
