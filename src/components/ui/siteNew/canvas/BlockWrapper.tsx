import React, { useState, useRef } from 'react'
import { setBlockZIndex, setSelectedBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/store/store'
import { selectBlockId, selectMaxZIndex } from 'src/store/slices/siteSlice/selectors'
import { Block } from 'src/store/slices/siteSlice'
import { BlockRenderer } from './BlockRenderer'
import { updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
import { updateBlockSize } from 'src/store/slices/siteSlice/siteSlice'
import { useClickOutside } from 'src/hooks/useClickOutside'

interface BlockWrapperProps {
  block: Block
}

export const BlockWrapper = ({ block }: BlockWrapperProps) => {
  const [isEditing,setIsEditing] = useState(false)
  const [isResizing,setIsResizing] = useState(false)
  const activeBlockId = useAppSelector(selectBlockId)
  const blockRef = useRef<HTMLDivElement>(null)
  const isBlockSelected = activeBlockId === block.id
  const maxZIndex = useAppSelector(selectMaxZIndex)

  const dispatch = useDispatch()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isBlockSelected) {
      dispatch(setSelectedBlockId(block.id))
    } else {
      setIsEditing(true)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) return 

    dispatch(setBlockZIndex({id: block.id, zIndex: maxZIndex + 1}))

    const startX = e.clientX
    const startY = e.clientY
    const initialX = block.position.x
    const initialY = block.position.y

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      dispatch(updateBlockPosition({
        id: block.id,
        x: initialX + deltaX,
        y: initialY + deltaY,
      }))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation()

    setIsResizing(true)
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
    setIsResizing(false)
    window.removeEventListener('mousemove', resizeBlock)
    window.removeEventListener('mouseup', stopResize)
  }

  useClickOutside(blockRef,() => {console.log(blockRef.current,'out');setIsEditing(false)})

  return (
    <div
      ref={blockRef}
      className={`absolute overflow-hidden border-transparent rounded-sm ${isBlockSelected ? 'border border-slate-200' : ''}`}
      style={{
        left: block.position.x,
        top: block.position.y,
        zIndex: block.zIndex || 1
      }}  
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      // onBlur={() => {console.log('blur out'); setIsEditing(false)}}
    >
        <BlockRenderer block={block} isEditing={isEditing}/>
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-0 h-0 border-b-4 border-r-4 border-transparent border-b-gray-500 border-r-gray-500 cursor-se-resize z-10"
        />
    </div>
  )
}

