import { Block } from 'src/store/slices/siteSlice/types'
import { BlockRenderer } from '../canvas/BlockRenderer'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'

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

    const { offsetX, offsetY } = calculateClickPosition(e)
    e.dataTransfer.setData('blockId', block.id)
    e.dataTransfer.setData('offsetX', offsetX.toString())
    e.dataTransfer.setData('offsetY', offsetY.toString())
  }

  return (      
    <div 
      draggable 
      onDragStart={onDragStart}
      style={{ position:'absolute', left:block.styles.left, top:block.styles.top }}
      // style={block.styles}
      className='bg-gray-100 rounded-sm '
    >
      <BlockRenderer block={block} />
    </div>
  )
}

export { DraggableBlock }
