import { useState } from 'react'
import { Controls } from './Controls'
import { Block } from 'src/store/slices/siteSlice'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { deleteBlock,updateBlockContent } from 'src/store/slices/siteSlice/siteSlice'
import { Button } from '../../button'

export function DraggableBlock(block: Block) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState(block.content)

  console.log('isEditing',isEditing)
  console.log('content',block.content)

  const dispatch = useAppDispatch()

  const handleSave = () => {
    console.log('save content:', editingContent)
    dispatch(updateBlockContent({ id: String(block.id), content:editingContent }))
    setIsEditing(false)
  }

  const startEditing = () => setIsEditing(true)

  const handleCancel = () => {
    setIsEditing(false)
    setEditingContent(block.content) // Reset changes
  }

  return (
    <div style={block.styles}>
      {isEditing 
        ? <>
            <Button variant='secondary' onClick={handleSave}>Save</Button>
            <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
            {renderEditableField(block, editingContent, setEditingContent)}
          </>
        : <>
          <Controls
            block={block}
            onEdit={startEditing}
            onDelete={() => {dispatch(deleteBlock(block.id))}}
          />
          {block.type === 'paragraph' && <p>{block.content}</p>}
          {block.type === 'text' && <span>{block.content}</span>}
          {block.type === 'button' && <button>{block.content}</button>}
          {block.type === 'header' && <h1>{block.content}</h1>}
          {block.type === 'ul' && (
            <ul>
              {block.content.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {block.type === 'ol' && (
            <ol>
              {block.content.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          )}
        
        </>
      }
    </div>
  )
}

const renderEditableField = (
    block: Block,
    editingContent: any,
    setEditingContent: (content: any) => void
  ) => {
    switch (block.type) {
      case 'text':
      case 'button':
        return (
          <input
            type="text"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Edit text"
          />
        )
  
      case 'paragraph':
        return (
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Edit paragraph"
          />
        )
  
      case 'ul':
      case 'ol':
        return (
          <div className="space-y-2">
            {editingContent.items.map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedItems = [...editingContent.items]
                    updatedItems[index] = e.target.value
                    setEditingContent({ ...editingContent, items: updatedItems })
                  }}
                  className="border p-1 rounded"
                />
                <button
                  onClick={() => {
                    const updatedItems = editingContent.items.filter(
                      (_: string, i: number) => i !== index
                    )
                    setEditingContent({ ...editingContent, items: updatedItems })
                  }}
                  className="text-red-500 hover:underline"
                >
                  ✕
                </button>
              </div>
            ))}
  
            <button
              onClick={() =>
                setEditingContent({
                  ...editingContent,
                  items: [...editingContent.items, '']
                })
              }
              className="text-blue-600 hover:underline"
            >
              + Add item
            </button>
          </div>
        )
  
      default:
        return (
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Edit content"
          />
        )
    }
  }
  