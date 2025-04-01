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
import { Canvas } from 'src/components/ui/siteNew/canvas'

export function SiteNew() {
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
    <div className="flex h-screen">
      <SideBar blockTypes={blockTypes} />
      <Canvas blockTypes={blockTypes} />
    </div>
  )
}
