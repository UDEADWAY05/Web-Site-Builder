import React, { useState, useRef } from 'react'
import { setBlockZIndex, setSelectedBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/store/store'
import { selectBlockId, selectMaxZIndex } from 'src/store/slices/siteSlice/selectors'
import { Block } from 'src/store/slices/siteSlice'
import { BlockRenderer } from './BlockRenderer'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'
import { updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
interface BlockWrapperProps {
  block: Block
}

export const BlockWrapper = ({ block }: BlockWrapperProps) => {
  const [isEditing,setIsEditing] = useState(false)
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
    if (isEditing) return // avoid moving while editing
    dispatch(setBlockZIndex({id: block.id,zIndex: maxZIndex + 1}))


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

  return (
    <div
      ref={blockRef}
      className={`absolute p-1 rounded-sm ${isBlockSelected ? 'border border-slate-300' : ''}`}
      style={{
        left: block.position.x,
        top: block.position.y,
        width: block.dimentions.width,
        height: block.dimentions.height,
        zIndex: block.zIndex || 1
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onBlur={() => setIsEditing(false)}
    >
        <BlockRenderer block={block} isEditing={isEditing} setIsEditing={setIsEditing} />
    </div>
  )
}

