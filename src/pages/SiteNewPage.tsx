import type { Site } from 'src/store/slices/siteSlice/types'
import { SideBar } from 'src/components/ui/siteNew'
import { Canvas } from 'src/components/ui/siteNew'
import { Button } from 'src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { setModalClose } from 'src/store/slices/siteSlice'
import { generateHTML } from 'src/utils/generateHTML'
import { generateCSS } from 'src/utils/generateCSS'
import { useAppSelector, useAppDispatch } from 'src/store/store'
import {
  selectorLayoutSiteData,
  selectorModalOpen,
} from 'src/store/slices/siteSlice/selectors'
import { exportSiteToZip } from 'src/utils/exportSiteToZip'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { child, get, off, ref } from 'firebase/database'
import { dbSite } from 'src/firebase'

export function SiteNew() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  console.log(blocks)
  const userId = useAppSelector((store) => store.user.data?.id)

  const isModal = useAppSelector(selectorModalOpen)
  const { siteId } = useParams<{ siteId: string }>()
  const dispatch = useAppDispatch()

  // временная заглушка
  const [siteById, setSiteById] = useState<Site | null>(null)

  useEffect(() => {
    if (!siteId) return
    const dbRef = ref(dbSite)
    get(child(dbRef, `sites/${userId}/${siteId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSiteById(snapshot.val() as Site)
        } else {
          console.log('No data')
          setSiteById(null)
        }
      })
      .catch((err) => {
        console.log(err)
        setSiteById(null)
      })
    return () => off(dbRef) // Функция для отписки
  }, [siteId, userId])

  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <Canvas />
      </div>
      <Dialog open={isModal} onOpenChange={() => dispatch(setModalClose())}>
        <DialogContent className="p-2 sm:max-w-[1025px] w-full overflow-x-auto overflow-y-auto max-h-[80vh] break-words">
          <DialogHeader>
            <DialogTitle>Layout Web Site</DialogTitle>
            <DialogDescription>Здесь представлен Ваш код</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-4 py-2 ">
            <pre>
              {siteById ? generateHTML(blocks, siteById) : 'загрузка данных'}
            </pre>
            <pre>
              <div className=" outline-2 ">
                <h3 className="text-center">CSS</h3>
                {generateCSS(blocks)}
              </div>
            </pre>
          </div>
          <DialogFooter>
            <Button onClick={() => dispatch(setModalClose())}>
              Вернуться в режим редактирования
            </Button>
            <Button
              onClick={() => siteById && exportSiteToZip(blocks, siteById)}
              disabled={!siteById}
            >
              Экспорт сайта в виде ZIP архива
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
