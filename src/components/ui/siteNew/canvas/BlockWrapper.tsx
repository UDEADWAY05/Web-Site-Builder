import React, { useState, useRef } from 'react'
import { setBlockZIndex, setEditingBlockId, updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { selectEditingBlockId, selectMaxZIndex } from 'src/store/slices/siteSlice/selectors'
import { Block } from 'src/store/slices/siteSlice'
import { BlockRenderer } from './BlockRenderer'
import { updateBlockSize } from 'src/store/slices/siteSlice/siteSlice'
import { updateBlockPositionThunk, updateBlockSizeThunk } from 'src/store/slices/projectSlice/thunks'
import { CornerResizer } from './blockControls/controlElements/CornerResizer'
import { Controls } from './Controls'

export const BlockWrapper = (block: Block) => {
  const [isResizing, setIsResizing] = useState(false)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const maxZIndex = useAppSelector(selectMaxZIndex)
  const blockRef = useRef<HTMLDivElement | null>(null)
  const isEditing = editingBlockId === block.id

  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isEditing) {
      dispatch(setEditingBlockId(block.id))
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing || isResizing) return

    dispatch(setBlockZIndex({ id: block.id, zIndex: maxZIndex + 1 }))

    const startX = e.clientX
    const startY = e.clientY
    const initialX = block.position.x
    const initialY = block.position.y

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      dispatch(
        updateBlockPosition({
          id: block.id,
          x: initialX + deltaX,
          y: initialY + deltaY,
        })
      )
    }

    const handleMouseUp = (upEvent: MouseEvent) => {
      const deltaX = upEvent.clientX - startX
      const deltaY = upEvent.clientY - startY

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      dispatch(
        updateBlockPositionThunk({
          id: block.id,
          x: initialX + deltaX,
          y: initialY + deltaY,
        })
      )
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

    if (!blockRef.current) return
    const blockRect = blockRef.current.getBoundingClientRect()

    dispatch(
      updateBlockSizeThunk({
        id: block.id,
        width: blockRect.width,
        height: blockRect.height,
      })
    )
  }

  return (
    <div
      ref={blockRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: block.position.x,
        top: block.position.y,
        zIndex: block.zIndex || 1,
      }}
      className={'relative rounded-sm shadow-[1px_1px_6px_0px_rgba(0,_0,_0,_0.1)]'}
    >
      {isEditing && <Controls block={block} />}
      <BlockRenderer block={block} isEditing={isEditing} />
      {!isEditing && <CornerResizer startResize={startResize} />}
    </div>
  )
}
