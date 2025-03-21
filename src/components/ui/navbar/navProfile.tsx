import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RoutePaths } from 'src/routes/paths'

interface ICurrentUser {
  id: string
  img: string
  isLoggeedIn: boolean
}

export function NavProfile() {
  const [currentUser] = useState<ICurrentUser | null>({
    id: '1',
    img: '111',
    isLoggeedIn: true,
  })

  if (!currentUser) return <p>Loading currentUser...</p>
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>

          {/* <img
            alt="userAvatar"
            src={currentUser.img}
            className="size-8 rounded-full"
          /> */}
          {/* //заглушка на фото пользователя */}
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <Link
            to={`${RoutePaths.USER}/${currentUser.id}`}
            data-testid={`${RoutePaths.USER}-link`}
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            Профиль
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to={RoutePaths.SIGNOUT}
            data-testid={`${RoutePaths.SIGNOUT}-link`}
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            Выход
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
