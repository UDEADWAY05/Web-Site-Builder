import type { Block } from 'src/store/slices/siteSlice/types'
import { BlockRenderer } from '../canvas/BlockRenderer'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'
import { useAppDispatch } from 'src/store/store'
import { useRef, useState } from 'react'
import { updateBlockSize } from 'src/store/slices/siteSlice/siteSlice'

interface DraggableBlockProps {
  block: Block
}

function DraggableBlock({ block }: DraggableBlockProps) {
  const dispatch = useAppDispatch()
  const [isResizing, setIsResezing] = useState(false)
  const blockRef = useRef<HTMLDivElement>(null)

  //
  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResezing(true)
    window.addEventListener('mousemove', resizeBlock)
    window.addEventListener('mouseup', stopResize)
  }

  const resizeBlock = (e: MouseEvent) => {
    e.preventDefault()
    if (!blockRef.current) return
    const blockRect = blockRef.current.getBoundingClientRect()
    const newWidth = e.clientX - blockRect.left
    const newHeight = e.clientY - blockRect.top

    dispatch(
      updateBlockSize({ id: block.id, width: newWidth, height: newHeight })
    )
  }

  const stopResize = () => {
    setIsResezing(false)
    window.removeEventListener('mousemove', resizeBlock)
    window.removeEventListener('mouseup', stopResize)
  }

  //don't drag if pressing on input or textarea for editing
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLElement &&
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
      draggable={!isResizing}
      onDragStart={onDragStart}
      ref={blockRef}
      style={{
        position: 'absolute',
        left: block.styles.left,
        top: block.styles.top,
        width: block.styles.width || 'auto',
        height: block.styles.height || 'auto',
        padding: '2px',
        resize: 'none',
      }}
      // style={block.styles}
      className="bg-gray-100 rounded-t-lg"
    >
      <BlockRenderer block={block} />
      <div
        onMouseDown={startResize}
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize "
      ></div>
    </div>
  )
}

export { DraggableBlock }
