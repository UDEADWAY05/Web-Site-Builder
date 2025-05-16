import React, { useState, useRef } from 'react'
import {
  setBlockZIndex,
  setEditingBlockId,
  setSelectedBlockId,
} from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import {
  selectBlockId,
  selectEditingBlockId,
  selectMaxZIndex,
} from 'src/store/slices/siteSlice/selectors'
import { Block } from 'src/store/slices/siteSlice'
import { BlockRenderer } from './BlockRenderer'
import { updateBlockSize } from 'src/store/slices/siteSlice/siteSlice'
import { updateBlockPositionThunk } from 'src/store/slices/projectSlice/thunks'

interface BlockWrapperProps {
  block: Block
}

export const BlockWrapper = ({ block }: BlockWrapperProps) => {
  const dispatch = useAppDispatch()
  const [isResizing, setIsResizing] = useState(false)
  const activeBlockId = useAppSelector(selectBlockId)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const maxZIndex = useAppSelector(selectMaxZIndex)
  const blockRef = useRef<HTMLDivElement | null>(null)
  const isBlockSelected = activeBlockId === block.id
  const isEditing = editingBlockId === block.id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isBlockSelected) {
      dispatch(setSelectedBlockId(block.id))
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    dispatch(setEditingBlockId(block.id))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing || isResizing) return
    dispatch(setBlockZIndex({ id: block.id, zIndex: maxZIndex + 1 }))

    const startX = e.clientX
    const startY = e.clientY
    const initialX = block.position.x
    const initialY = block.position.y

    const handleMouseMove = async (moveEvent: MouseEvent) => {
      if (isResizing) return
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      await dispatch(
        updateBlockPositionThunk({
          id: block.id,
          x: initialX + deltaX,
          y: initialY + deltaY,
        })
      )
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
    window.removeEventListener('mousemove', resizeBlock)
    window.removeEventListener('mouseup', stopResize)
  }

  return (
    <div
      draggable={!isResizing && !isEditing}
      ref={blockRef}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: block.position.x,
        top: block.position.y,
        width: block.dimentions.width || 'auto',
        height: block.dimentions.height || 'auto',
        zIndex: block.zIndex || 1,
      }}
      className={` overflow-hidden border-transparent rounded-sm ${
        isBlockSelected ? 'border border-slate-200' : ''
      }`}
    >
      <BlockRenderer block={block} isEditing={isEditing} />
      <div
        onMouseDown={startResize}
        className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 cursor-se-resize z-100"
      ></div>
    </div>
  )
}
