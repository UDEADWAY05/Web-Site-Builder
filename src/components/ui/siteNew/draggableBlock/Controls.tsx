import { useState } from 'react'
import { cancel, edit } from 'src/assets'
import { useAppDispatch } from 'src/hooks/redux-hooks'
// import {
//   Block,
//   blockContentUpdate,
//   blockDelete,
//   blockPositionUpdate,
// } from 'src/store/slices/layoutSite'
import { Block } from 'src/store/slices/siteSlice'
import { updateBlockContent,deleteBlock,updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
interface OffsetProp {
  x: number
  y: number
}

interface ControlsProps {
  block:Block
  onMouseUp:() => void
  onMouseLeave:() => void
}

// блок - редактирование блока
export function Controls({ block, onMouseLeave, onMouseUp }:ControlsProps) {
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState<OffsetProp>({ x: 0, y: 0 })
  const dispatch = useAppDispatch()

  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setOffset({
      x: e.clientX - block.styles?.left,
      y: e.clientY - block.styles?.top,
    })
  }

  // Перемещение блока
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    dispatch(
      updateBlockPosition({
        id: block.id,
        // newX: e.clientX - offset.x,
        // newY: e.clientY - offset.y,
        left: e.clientX - offset.x,
        top: e.clientY - offset.y,
      })
    )
  }

  // const updateContent = (id: number, newContent: string | string[]) => {
  const updateContent = (id: number, newContent: Block['content']) => { //TODO convert id
    // dispatch(blockContentUpdate({ id, newContent }))
    dispatch(updateBlockContent({ id: String(id), content:newContent }))
  }

  // начало редактирования текста
  const startEditing = (item: Block) => {
    if (!item) return <p>SomeThing Wrong</p>
    console.log('начало редактирования', item)

    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          border: '1px solid #000',
          zIndex: 20,
        }}
      >
        <h3>Редактирование</h3>

        {item.type === 'paragraph' ||
          (item.type === 'header' && (
            <input
              type="text"
              value={item.type}
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
        {/* {setIsEditing(false)} */}
      </div>
    )
  }

  return (
    <div
      className="flex justy justify-between content-center absolute"
      style={{ top: '-25px', right: 0 }}
    >
      <button
        className="cursor-no-drop"
        // onClick={() => dispatch(blockDelete(block.id))}
        onClick={() => dispatch(deleteBlock(block.id))}
        style={{ marginRight: '5px' }}
      >
        <img src={cancel} alt="cancel" />
      </button>
      <button
        onClick={() => startEditing(block)}
        style={{ marginRight: '5px' }}
      >
        <img src={edit} alt="edit" />
      </button>
      <span
        style={{ cursor: 'move', padding: '5px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        ⠿
      </span>
    </div>
  )
}
