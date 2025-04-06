import type { Block } from '../../../../store/slices/layoutSite/types'
import { useState } from 'react'
import { cancel, edit } from '../../../../assets'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import {
  blockContentUpdate,
  blockDelete,
  blockPositionUpdate,
} from 'src/store/slices/layoutSite'

interface OffsetProp {
  x: number
  y: number
}

export function DraggableBlock(block: Block) {
  const [isEditing, setIsEditing] = useState(false)
  const [newText,setNewText] = useState('')
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState<OffsetProp>({ x: 0, y: 0 })

  console.log('isEditing:',isEditing,dragging)
  console.log('block type',block.type)
  
  const style = {
    left: `${block.styles?.left}px`,
    top: `${block.styles?.top}px`,
    width: `${block.styles?.width}px`,
    heigth: `${block.styles?.height}px`,
    position: 'absolute',
    minHeight: '30px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px',
    cursor: 'move',
    zIndex: 100,
    ...block.styles,
  }

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
      blockPositionUpdate({
        id: block.id,
        newX: e.clientX - offset.x,
        newY: e.clientY - offset.y,
      })
    )
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

  // Обновление текста блока
  const updateBlockContent = (id: number, newContent: string | string[]) => {
    console.log('update', id, newContent)
    dispatch(blockContentUpdate({ id, newContent }))
  }
  
  // начало редактирования текста
  const startEditing = (item: Block) => {
    if (!item) return <p>SomeThing Wrong</p>
    console.log('начало редактирования', item,isEditing)
   
    return (
      <div
        style={{
          // position: 'fixed',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          backgroundColor: '#c93c3c',
          padding: '20px',
          border: '1px solid #000',
          zIndex: 1000,
        }}>
        <h3>Редактирование</h3>
        {item.type === 'paragraph' ||
          (item.type === 'header' && (
            <input
              type="text"
              value={item.type}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
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
              updateBlockContent(block.id, e.target.value.split('\n'))
            }
            style={{ width: '100%', minHeight: '100px' }}
          />
        ) : (
          item.type === 'image' && (
            <input
              type="text"
              value={item.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
              placeholder="Введите URL изображения"
              style={{ width: '100%' }}
            />
          ))
        // )} 
        //  {setIsEditing(false)}
  }</div>
    )
  }

  // блок - редактирование блока
  const controls = (block: Block) => {
    return (
      <div
        className="flex justy justify-between content-center absolute"
        style={{ top: '-25px', right: 0 }}
      >
        <button
          className="cursor-no-drop"
          onClick={() => dispatch(blockDelete(block.id))}
          style={{ marginRight: '5px' }}
        >
          <img src={cancel} alt="cancel" />
        </button>
        <button
          onClick={() => {setIsEditing(true);startEditing(block)}}
          style={{ marginRight: '5px' }}
        >
          <img src={edit} alt="edit" />
        </button>
        <span
          style={{ cursor: 'move', padding: '5px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          ⠿
        </span>
      </div>
    )
  }

  const renderEditableField = (block:Block) => {
    switch (block.type) {
      case "textbox":
        return (
          <input
            type="text"
            value={'new'}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Edit text here"
          />
        );
      case "button":
        return (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Edit button text"
          />
        );
      case "p":
        return (
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Edit paragraph text"
          />
        );
      case "ul":
      case "ol":
        return (
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Edit list content"
          />
        );
      default:
        return (
          <textarea className='bg-white'
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Edit text"
          />
        );
    }
  };

  return isEditing 
        ? <div className='border rounded' style={style}>
          
            <button onClick={() => {
              setIsEditing(false);
              updateBlockContent(block.id,newText)}}>Save</button>
          {renderEditableField(block)}
        </div>
        : <div style={style}
          // onMouseOver={handleMouseOver}
          // onMouseOut={handleMouseOut}
       >
      {controls(block)}

      {/* TODO turn into map */}
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
      {block.type === 'divider' && <div><hr/ >Divider</div>}
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
}
