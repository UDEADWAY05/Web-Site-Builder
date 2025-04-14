import { useNavigate } from 'react-router-dom'
import { Button } from '../../button'
import { dbSite, ref, set } from 'src/App'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { resetLayout } from 'src/store/slices/siteSlice/siteSlice'

export function ButtonNewSite() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleCreateSite = async () => {
    try {
      const siteId = Date.now().toString()
      const newSite = {
        id: siteId,
        title: 'My Project',
        bgColor: '#5C90FF',
        data: [],
      }
      dispatch(resetLayout())
      await set(ref(dbSite, `sites/${siteId}`), newSite)

      navigate(`/sites/${siteId}`)
    } catch (error) {
      // временная заглушка - перенести в slice
      console.log('Ошибка при создании макета сайта:', error)
    }
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
