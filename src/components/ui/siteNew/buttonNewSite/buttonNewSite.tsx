import { useNavigate } from 'react-router-dom'
import { Button } from '../../button'
import { ref, set } from 'firebase/database'
import { dbSite } from 'src/App'
import { useAppSelector } from 'src/store/store'

export function ButtonNewSite() {
  const navigate = useNavigate()
  const user = useAppSelector(store => store.user.data)
  const handleCreateSite = async () => {
    const siteId = Date.now().toString()
    const newSite = {
      id: siteId,
      title: 'My Project',
      bgColor: '#5C90FF',
      data: [],
      userId: user?.id
    }
    await set(ref(dbSite, `sites/${siteId}`), newSite)

    navigate(`/sites/${siteId}`)
  }
  return (
    <Button
      className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700"
      onClick={handleCreateSite}
    >
      Новый сайт
    </Button>
  )
}
