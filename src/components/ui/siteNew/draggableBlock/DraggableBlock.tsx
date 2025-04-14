import { useState,useRef } from 'react'
import { Block } from 'src/store/slices/siteSlice/types'
import { Controls } from './Controls'
import { BlockRenderer } from '../canvas/BlockRenderer'
import { useAppDispatch } from 'src/store/store'
import { updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'

interface DraggableBlockProps {
  block: Block
  onDelete: () => void
  onSave: (id:Block['id'],updatedContent: Block['content']) => void
}

function DraggableBlock({ block, onDelete, onSave }: DraggableBlockProps) {
  const [isDragging,setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState(block.content)

  const offset = useRef({ x: 0, y: 0 })
  const dispatch = useAppDispatch()

  const handleSave = () => {
    setIsEditing(false)
    onSave(block.id,editingContent)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    offset.current = {
      x: e.clientX - block.styles.left,
      y: e.clientY - block.styles.top,
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const left = e.clientX - offset.current.x
    const top = e.clientY - offset.current.y

    console.log(e.clientX,offset.current.x)
    console.log(e.clientY,offset.current.y)
    console.log('ber ois upd')
    dispatch(
      updateBlockPosition({
        id: block.id,
        left,
        top,
      })
    )
  }

  return (
    <div className='bg-gray-50 absolute rounded-sm max-w-[20%] w-fit'
      style={{ left:block.styles.left,top:block.styles.top }}
    >
      <Controls
        isEditing={isEditing}
        isDragging={isDragging}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        onDelete={onDelete}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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