import { useNavigate } from 'react-router-dom'
import { Button } from '../../button'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { resetLayout } from 'src/store/slices/siteSlice'
import { ref, set } from 'firebase/database'
import { dbSite } from 'src/firebase'

export function ButtonNewSite() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector((store) => store.user.data?.id)
  const handleCreateSite = async () => {
    try {
      const date = new Date()
      const siteId = Date.now().toString()
      const newSite = {
        id: siteId,
<<<<<<< HEAD
        title: `Мой проект ${date.toLocaleString()}`,
=======
        title: 'Мой проект',
>>>>>>> 1702434 (chore: убрал firebase из app)
        bgColor: '#fafafa',
        data: [],
      }
      dispatch(resetLayout())
      await set(ref(dbSite, `sites/${userId}/${siteId}`), newSite)

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
