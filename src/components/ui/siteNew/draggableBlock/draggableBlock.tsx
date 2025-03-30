import type { Blocks } from '../type/type'
import { useState } from 'react'
import { cancel, edit } from '../../../../assets'

interface OffsetProp {
  x: number
  y: number
}

export function DraggableBlock({
  block,
  updatePosition,
  updateContent,
  deleteBlock,
}: {
  block: Blocks
  updatePosition: (id: number, newX: number, newY: number) => void
  updateContent: (id: number, value: string | string[]) => void
  deleteBlock: (id: number) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState<OffsetProp>({ x: 0, y: 0 })

  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setOffset({ x: e.clientX - block.x, y: e.clientY - block.y })
  }

  // Перемещение блока
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    updatePosition(block.id, e.clientX - offset.x, e.clientY - offset.y)
  }

  // Окончание перетаскивания
  const handleMouseUp = () => {
    setDragging(false)
  }

  // Изменение параметров блока
  const handleMouseOver = () => {
    setIsEditing(true)
  }

  const handleMouseOut = () => {
    setIsEditing(false)
  }
  // Подтверждение ввода текста
  const startEditing = (item: Blocks) => {
    if (!item) return <p>SomeThing Wrong</p>
    console.log('начало редактирования', item)
    return (
      <>
        {item.content === 'paragraph' ||
          (item.content === 'header' && (
            <input
              type="text"
              value={item.content}
              onChange={(e) => updateContent(block.id, e.target.value)}
              style={{ width: '100%' }}
            />
          ))}

        {item.type === 'listOl' || item.type === 'listUl' ? (
          <textarea
            value={
              Array.isArray(item.content)
                ? item.content.join('\n')
                : item.content
            }
            onChange={(e) =>
              updateContent(block.id, e.target.value.split('\n'))
            }
            style={{ width: '100%', minHeight: '100px' }}
          />
        ) : (
          item.type === 'image' && (
            <input
              type="text"
              value={item.content}
              onChange={(e) => updateContent(block.id, e.target.value)}
              placeholder="Введите URL изображения"
              style={{ width: '100%' }}
            />
          )
        )}
        {setIsEditing(false)}
      </>
    )
  }

  //удаление блока

  const handleDeletedBlok = (id: number) => {
    deleteBlock(id)
  }

  const style = {
    left: block.x,
    top: block.y,
  }

  // блок - редактирование блока
  const controls = (item: Blocks) => {
    return (
      <div
        className="flex justy justify-between content-center absolute"
        style={{ top: '-25px', right: 0 }}
      >
        <button
          className="cursor-no-drop"
          onClick={() => handleDeletedBlok(block.id)}
        >
          <img src={cancel} alt="cancel" />
        </button>
        <button
          onClick={() => startEditing(item)}
          style={{ marginRight: '5px' }}
        >
          <img src={edit} alt="edit" />
        </button>
        <span
          style={{ cursor: 'move', padding: '5px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          ⠿
        </span>
      </div>
    )
  }

  return (
    <div
      style={style}
      className="p-2 m-2 bg-white  absolute "
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isEditing && controls(block)}

      {block.type === 'header' && <h1>{block.content}</h1>}
      {block.type === 'paragraph' && <p>{block.content}</p>}
      {block.type === 'listUl' && (
        <ul>
          {Array.isArray(block.content) ? (
            block.content.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>{block.content}</li>
          )}
        </ul>
      )}
      {block.type === 'listOl' && (
        <ol>
          {Array.isArray(block.content) ? (
            block.content.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>{block.content}</li>
          )}
        </ol>
      )}
      {block.type === 'image' && <img src="#" alt="image" />}
      {block.type === 'divider' && <hr />}
      {block.type === 'button' && <button>{block.content}</button>}
      {block.type === 'quote' && (
        <div>
          <blockquote cite="https://www.huxley.net/bnw/four.html">
            <p>
              Words can be like X-rays, if you use them properly—they’ll go
              through anything. You read and you’re pierced.
            </p>
          </blockquote>
          <p>
            —Aldous Huxley, <cite>Brave New World</cite>
          </p>
        </div>
      )}
    </div>
  )
}
