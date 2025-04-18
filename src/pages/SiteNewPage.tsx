import type { BlockButton, Site } from 'src/store/slices/siteSlice/types'
import {
  button,
  horozontal,
  list_ol,
  list_ul,
  photo,
  quote,
  title,
  paragraf,
  form,
  check_box,
  radio_button_checked,
} from '../assets'
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
import { child, dbSite, get, off, ref } from 'src/App'

export function SiteNew() {
  const blocks = useAppSelector(selectorLayoutSiteData)
  console.log(blocks)

  const isModal = useAppSelector(selectorModalOpen)
  const { siteId } = useParams<{ siteId: string }>()
  const dispatch = useAppDispatch()

  // временная заглушка
  const [siteById, setSiteById] = useState<Site | null>(null)

  useEffect(() => {
    if (!siteId) return
    const dbRef = ref(dbSite)
    get(child(dbRef, `sites/${siteId}`))
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
  }, [siteId])

  // Кнопки для бокового меню
  const blockTypes: BlockButton[] = [
    {
      type: 'header',
      label: 'Заголовок',
      img: title,
    },
    {
      type: 'paragraph',
      label: 'Параграф',
      img: paragraf,
    },
    {
      type: 'ul',
      label: 'Маркированный',
      img: list_ul,
    },
    {
      type: 'ol',
      label: 'Нумерованный',
      img: list_ol,
    },
    {
      type: 'image',
      label: 'Изображение',
      img: photo,
    },
    {
      type: 'divider',
      label: 'Разделитель',
      img: horozontal,
    },
    { type: 'button', label: 'Кнопка', img: button },
    {
      type: 'quote',
      label: 'Цитата',
      img: quote,
    },
    //////form///////
    {
      type: 'input',
      label: 'Поле ввода',
      img: form,
    },
    {
      type: 'textarea',
      label: 'Текстовая область',
      img: form,
    },
    {
      type: 'select',
      label: 'Поле выбора',
      img: form,
    },
    {
      type: 'checkbox',
      label: 'Флажкок',
      img: check_box,
    },
    {
      type: 'radiobox',
      label: 'Переключатель',
      img: radio_button_checked,
    },
  ]

  return (
    <>
      <div className="flex h-screen">
        <SideBar blockTypes={blockTypes} />
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
