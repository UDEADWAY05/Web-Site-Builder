import { MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RoutePaths } from 'src/routes/paths'

interface ICurrentUser {
  id: string
  img: string
}

export function NavProfile() {
  const [currentUser] = useState<ICurrentUser | null>(null)
  if (!currentUser) return <p>Loading currentUser...</p>
  return (
    <MenuItems>
      <MenuItem>
        <Link
          to={`${RoutePaths.USER}/${currentUser.id}`}
          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
        >
          Профиль
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to={RoutePaths.SIGNOUT}
          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
        >
          Выход
        </Link>
      </MenuItem>
    </MenuItems>
  )
}
