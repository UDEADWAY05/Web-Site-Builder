import type { Block } from '../../../../store/slices/layoutSite/types'
import { useState } from 'react'
import { Controls } from './Controls'

export function DraggableBlock(block: Block) {
  const [isEditing, setIsEditing] = useState(false)

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
    zIndex: 10,
    ...block.styles,
  }

  // Изменение параметров блока
  const handleMouseOver = () => {
    setIsEditing(true)
  }

  const handleMouseOut = () => {
    setIsEditing(false)
  }

  return (
    <div
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isEditing && (
        <Controls
          block={block}
          onMouseLeave={handleMouseOver}
          onMouseUp={handleMouseOut}
        />
      )}

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
