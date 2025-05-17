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
import { useEffect } from 'react'
import { fetchSiteById } from 'src/store/slices/projectSlice'

export function SiteNew() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  const site = useAppSelector((store) => store.project.site)

  const isModal = useAppSelector(selectorModalOpen)
  const { siteId } = useParams<{ siteId: string }>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (siteId) {
      dispatch(fetchSiteById(siteId))
    }
  }, [dispatch, siteId])

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
            <pre>{site ? generateHTML(blocks, site) : 'загрузка данных'}</pre>
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
              onClick={() => site && exportSiteToZip(blocks, site)}
              disabled={!site}
            >
              Экспорт сайта в виде ZIP архива
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
