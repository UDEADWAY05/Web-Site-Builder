import { useState,useRef } from 'react'
import { Block } from 'src/store/slices/siteSlice/types'
import { Controls } from './Controls'
import { BlockRenderer } from '../canvas/BlockRenderer'

interface DraggableBlockProps {
  block: Block
  onDelete: () => void
  onSave: (id:Block['id'],updatedContent: Block['content']) => void
}

function DraggableBlock({ block, onDelete, onSave }: DraggableBlockProps) {
  const [isDragging,setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState(block.content)

  const handleSave = () => {
    setIsEditing(false)
    onSave(block.id,editingContent)
  }

  //don't drag if pressing on input or textarea for editing
  const onDragStart = (e:React.DragEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement &&
      (e.target.tagName === 'INPUT' ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.isContentEditable)
    ) {
      e.preventDefault()
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    e.dataTransfer.setData('blockId', block.id)
    e.dataTransfer.setData('offsetX', offsetX.toString())
    e.dataTransfer.setData('offsetY', offsetY.toString())
  }

  return (
    <div 
      draggable
      className='px-3 py-1 bg-gray-100 absolute rounded-sm max-w-[20%] w-fit cursor-move'
      style={{ left:block.styles.left,top:block.styles.top }}
      onDragStart={onDragStart}
    >
      <Controls
        isEditing={isEditing}
        isDragging={isDragging}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        onDelete={onDelete}
        block={block}
      />
      
      <BlockRenderer
        type={block.type}
        content={editingContent}
        isEditing={isEditing}
        onChange={setEditingContent}
        styles={block.styles}
      />
    </div>
  )
}
export { DraggableBlock }
