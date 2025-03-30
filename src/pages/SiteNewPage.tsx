import { useState } from 'react'
import { BlockButtonProp, Blocks } from 'src/components/ui/siteNew/type/type'
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
  const [projectName, setProjectName] = useState('My Project')
  const [bgColor, setBgColor] = useState('#5C90FF')
  const [blocks, setBlocks] = useState<Blocks[]>([])
  console.log(blocks)
  const widthScreen = 800 // максимальная ширина рабочей области
  const heigthScreen = 600 // максимальная высота рабочей области

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const blockType = e.dataTransfer?.getData('blockType')
    const canvastRest = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - canvastRest.left
    const y = e.clientY - canvastRest.top

    const newBlock = {
      id: Date.now(),
      layout: { title: projectName, bgColor },
      type: blockType,
      x,
      y,
      content: blockTypes.find((item) => item.type === blockType)
        ?.defaultContent,
    }
    setBlocks((prev) => [...prev, newBlock])
  }

  const updateBlockPosition = (id: number, newX: number, newY: number) => {
    setBlocks(
      (prevBlocks) =>
        prevBlocks
          .map((block) =>
            block.id === id ? { ...block, x: newX, y: newY } : block
          )
          .filter(
            (block) =>
              block.x >= 0 &&
              block.y >= 0 &&
              block.x < widthScreen &&
              block.y < heigthScreen
          ) // Удаление блока, если он выходит за границы
    )
  }

  // Обновление текста блока
  const updateBlockContent = (id: number, newContent: string | string[]) => {
    console.log(id, newContent)

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id) {
          return { ...block, content: newContent }
        }
        // if (block.type === 'paragraph' || block.type === 'quote') {
        //   return {
        //     ...block.styles,
        //     fontWeight: 'bold',
        //     fontStyle: 'italic',
        //   }

        return block
      })
    )
  }

  // удаление блока
  const deleteBlock = (id: number) => {
    setBlocks(blocks.filter((block) => block.id !== id))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex h-screen">
      <SideBar
        projectName={projectName}
        bgColor={bgColor}
        setProjectName={setProjectName}
        setBgColor={setBgColor}
        blockTypes={blockTypes}
      />
      <Canvas
        blocks={blocks}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        updateBlockPosition={updateBlockPosition}
        updateBlockContent={updateBlockContent}
        deleteBlock={deleteBlock}
        bgColor={bgColor}
      />
    </div>
  )
}
