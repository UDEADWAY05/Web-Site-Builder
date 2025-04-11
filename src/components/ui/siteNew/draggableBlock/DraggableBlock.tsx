import { useState } from 'react'
import { Block } from 'src/store/slices/siteSlice/types'
import { Controls } from './Controls'
import { BlockRenderer } from '../canvas/BlockRenderer'
interface DraggableBlockProps {
  block: Block
  onDelete: () => void
  onSave: (id:Block['id'],updatedContent: Block['content']) => void
}

function DraggableBlock({ block, onDelete, onSave }: DraggableBlockProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState(block.content)

  const onDragStart = (e:React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('blockId',block.id)
  }

  const handleSave = () => {
    setIsEditing(false)
    onSave(block.id,editingContent)
  }

  return (
    <div style={block.styles}
     className="p-2 border rounded mb-4"
     draggable 
     onDragStart={onDragStart}
    >
      <Controls
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        onDelete={onDelete}
      />

      <BlockRenderer
        type={block.type}
        content={editingContent}
        isEditing={isEditing}
        onChange={setEditingContent}
      />
    </div>
  )
}

export { DraggableBlock }