import type { Blocks } from '../type/type'
import { useState } from 'react'
interface OffsetProp {
  x: number
  y: number
}

export function DraggableBlock({
  block,
  updatePosition,
  updateContent,
}: {
  block: Blocks
  updatePosition: (id: number, newX: number, newY: number) => void
  updateContent: (id: number, value: string) => void
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

  // Изменение текста
  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  // Подтверждение ввода текста
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    updateContent(block.id, e.target.value)
    setIsEditing(false)
  }

  const style = {
    left: block.x,
    top: block.y,
  }

  return (
    <div
      style={style}
      className="p-2 m-2 bg-white cursor-grab absolute "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing && (
        <input
          type="text"
          defaultValue={block.content}
          autoFocus
          onBlur={handleBlur}
          // onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
        />
      )}
      {block.type === 'header' && <h1>{block.content}</h1>}
      {block.type === 'paragraph' && <p>{block.content}</p>}
      {block.type === 'listUl' && (
        <ul>
          <li>{block.content}</li>
        </ul>
      )}
      {block.type === 'listOl' && (
        <ol>
          <li>{block.content}</li>
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
