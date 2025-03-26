import { useState } from 'react'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
} from '@dnd-kit/sortable'
import { DraggableBlock, SideBar } from 'src/components/ui/siteNew'
import { Blocks } from 'src/components/ui/siteNew/type/type'
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

export function SiteNew() {
  const [projectName, setProjectName] = useState('My Project')
  const [bgColor, setBgColor] = useState('#5C90FF')
  const [blocks, setBlocks] = useState<Blocks[]>([])
  console.log(blocks)

  // Кнопки для бокового меню
  const blockTypes = [
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

  // функция drag Drog

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id)
      const newIndex = blocks.findIndex((block) => block.id === over.id)
      setBlocks(arrayMove(blocks, oldIndex, newIndex))
    }
  }

  const addBlock = (type: string) => {
    const newDate = {
      id: Date.now(),
      type,
      bgColor: bgColor,
      title: projectName,
      width: type === 'image' ? 200 : 300,
      height: 'auto',
      styles: {},
    }

    setBlocks([...blocks, newDate])
  }

  return (
    <div className="flex">
      <SideBar
        projectName={projectName}
        setProjectName={setProjectName}
        bgColor={bgColor}
        setBgColor={setBgColor}
        addBlock={addBlock}
        blockTypes={blockTypes}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks} strategy={rectSwappingStrategy}>
          <DraggableBlock blocks={blocks} bgColor={bgColor} />
        </SortableContext>
      </DndContext>
    </div>
  )
}
