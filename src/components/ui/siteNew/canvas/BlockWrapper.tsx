import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { selectedBlockId } from 'src/store/slices/siteSlice/selectors'
import { updateBlockPosition, updateBlockSize } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { ControlsOverlay } from '../ControlsOverlay'
interface BlockWrapperProps {
  block: {
    id: string
    styles: {
      top: number
      left: number
      width: number
      height: number
    }
  }
  // isSelected: boolean
  onSelect: () => void
  // onDrag: (id: string, top: number, left: number) => void
  onResize: (id: string, width: number, height: number) => void
  canvasRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

export const BlockWrapper = ({ block, onSelect, children,canvasRef }: BlockWrapperProps) => {
  console.log('wrapper render',block.id)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { id, styles } = block

  const selectedBlock = useAppSelector(selectedBlockId)
  const isSelected = selectedBlock === block.id
  console.log('isSelected',isSelected)
  const dispatch = useAppDispatch()

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()

    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      // onDrag(id, startTop + deltaY, startLeft + deltaX)
      dispatch(updateBlockPosition({ id,left: e.clientX - canvasRect.left ,top: e.clientY - canvasRect.top }))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = styles.width
    const startHeight = styles.height

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      dispatch(updateBlockSize({id,width:startWidth + deltaX, height:startHeight + deltaY}))
      // onResize(id, startWidth + deltaX, startHeight + deltaY)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    if (isSelected && ref.current) {
      setRect(ref.current.getBoundingClientRect())
    }
  }, [isSelected])

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleDragStart}
      className={`absolute border ${isSelected ? 'border-orange-500' : 'border-transparent'}`}
      style={{
        top: styles.top,
        left: styles.left,
        width: styles.width,
        height: styles.height,
        cursor: 'grab',
        zIndex: isSelected ? 10 : 1
      }}
    >
      {children}
      {/* {isSelected && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 cursor-nwse-resize rounded-full"
        />
      )} */}
     
      {id}
      {isSelected && createPortal(
        <ControlsOverlay
          id={block.id}
          // isEditing={isE}
          // isVisible={isSelected} 
          onDragHandleMouseDown={() => {}} 
          onResizeHandleMouseDown={() => {}} 
        />, wrapperRef.current
      )}
       {isSelected && createPortal(
        <div className='absolute'>portal</div>, document.body
      )}
    </div>
  )
}
