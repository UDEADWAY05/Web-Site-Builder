import { useNavigate } from 'react-router-dom'
import { Button } from '../../button'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { resetLayout } from 'src/store/slices/siteSlice'
import { saveSite } from 'src/store/slices/projectSlice'

export function ButtonNewSite() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector((store) => store.user.data?.id)
  const handleCreateSite = async () => {
    try {
      if (!userId) {
        throw new Error('Отсутствует id пользователя')
      }
      const date = new Date()
      const siteId = Date.now().toString()
      const newSite = {
        id: siteId,
        title: `Мой проект ${date.toLocaleString()}`,
        bgColor: '#fafafa',
        data: [],
        blocks: [],
        createdAt: Date.now().toString(),
        formScript: `
          document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Валидация
            alert(JSON.stringify(data))
          });
        `
      }
      dispatch(resetLayout())
      dispatch(saveSite(newSite))
      // await set(ref(dbSite, `sites/${userId}/${siteId}`), newSite)

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
