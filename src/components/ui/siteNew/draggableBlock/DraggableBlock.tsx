import { useState } from 'react'
import { Block } from 'src/store/slices/siteSlice/types'
import { Controls } from './Controls'
import { BlockRenderer } from '../canvas/BlockRenderer'


type DraggableBlockProps = {
  block: Block
  onDelete: () => void
  onSave: (id:Block['id'],updatedContent: Block['content']) => void
}

function DraggableBlock({ block, onDelete, onSave }: DraggableBlockProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState(block.content)

  console.log(block.styles)
  const handleSave = () => {
    setIsEditing(false)
    onSave(block.id,editingContent)
  }

  return (
    <div style={block.styles} className="p-2 border rounded mb-4" draggable>
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
        styles={block.styles}
      />
    </div>
  )
}

export { DraggableBlock }