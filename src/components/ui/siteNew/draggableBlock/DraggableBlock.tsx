import { Block } from 'src/store/slices/siteSlice/types'
import { BlockRenderer } from '../canvas/BlockRenderer'

interface DraggableBlockProps {
  block: Block
}

function DraggableBlock({ block }: DraggableBlockProps) {

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
     
      <BlockRenderer 
        block={block}
      />
    </div>
  )
}
export { DraggableBlock }
