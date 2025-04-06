import { useState } from 'react'
import { Controls } from './Controls'
import { Styles,Block } from 'src/store/slices/siteSlice/types'

export function DraggableBlock(block: Block) {
  const [isEditing, setIsEditing] = useState(false)

  const style:Styles = {
    left: `${block.styles?.left}px`,
    top: `${block.styles?.top}px`,
    width: `${block.styles?.width}px`,
    height: `${block.styles?.height}px`,
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
      {block.type === 'ul' && (
        <ul>
          {Array.isArray(block.content) ? (
            block.content.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>{block.content}</li>
          )}
        </ul>
      )}
      {block.type === 'ol' && (
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