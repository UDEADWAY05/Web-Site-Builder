import { DraggableBlock } from './draggableBlock/draggableBlock'
import { Block } from '../../../store/slices/layoutSite/types'

export function Canvas({
  blocks,
  onDrop,
  onDragOver,
  bgColor,
  updateBlockPosition,
  updateBlockContent,
  deleteBlock,
}: {
  blocks: Block[]
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  bgColor: string
  updateBlockPosition: (id: number, newX: number, newY: number) => void
  updateBlockContent: (id: number, value: string | string[]) => void
  deleteBlock: (id: number) => void
}) {
  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: bgColor,
        overflow: 'hidden',
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          block={block}
          updatePosition={updateBlockPosition}
          updateContent={updateBlockContent}
          deleteBlock={deleteBlock}
        />
      ))}
    </div>
  )
}
