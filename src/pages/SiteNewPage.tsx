import { BlockButtonProp } from 'src/store/slices/layoutSite/types'
import {
  button,
  horozontal,
  list_ol,
  list_ul,
  photo,
  quote,
  title,
  paragraf,
} from '../assets'
import { SideBar } from 'src/components/ui/siteNew'
import { Canvas } from 'src/components/ui/siteNew'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'

import { useAppDispatch } from 'src/hooks/redux-hooks'
import { setModalClose } from 'src/store/slices/layoutSite/layoutSiteSlice'
import { GenerateHTML } from 'src/components/ui/siteNew/generateHTML/generateHTML'
import { GenerateCSS } from 'src/components/ui/siteNew/generateCSS/generateCSS'
import { useAppSelector } from 'src/store/store'
import { selectorModalOpen } from 'src/store/slices/layoutSite/selectors'

export function SiteNew() {
  const isModal = useAppSelector(selectorModalOpen)
  const dispatch = useAppDispatch()
  // Кнопки для бокового меню
  const blockTypes: BlockButtonProp[] = [
    {
      type: 'header',
      label: 'Заголовок',
      defaultContent: 'Новый заголовок',
      img: title,
    },
    {
      type: 'paragraph',
      label: 'Параграф',
      defaultContent: 'Текст параграфа',
      img: paragraf,
    },
    {
      type: 'listUl',
      label: 'Маркированный',
      defaultContent: [' -Элемент ', '-Элемент '],
      img: list_ul,
    },
    {
      type: 'listOl',
      label: 'Нумерованный',
      defaultContent: ['Элемент 1', 'Элемент 2'],
      img: list_ol,
    },
    {
      type: 'image',
      label: 'Изображение',
      defaultContent: '',
      img: photo,
    },
    {
      type: 'divider',
      label: 'Разделитель',
      defaultContent: '',
      img: horozontal,
    },
    { type: 'button', label: 'Кнопка', defaultContent: 'Нажать', img: button },
    {
      type: 'quote',
      label: 'Цитата',
      defaultContent: 'Текст цитаты',
      img: quote,
    },
  ]

  return (
    <>
      <div className="flex h-screen">
        <SideBar blockTypes={blockTypes} />
        <Canvas blockTypes={blockTypes} />
      </div>
      <Dialog open={isModal}>
        <DialogContent className=" p-2 sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Layout Web Site</DialogTitle>
            <DialogDescription>Здесь представлен Ваш код</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-4 py-2 ">
            <pre>
              <GenerateHTML />
            </pre>
            <pre>
              <GenerateCSS />
            </pre>
          </div>
          <DialogFooter onClick={() => dispatch(setModalClose())}>
            <Button>Вернуться в режим редактирования</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
