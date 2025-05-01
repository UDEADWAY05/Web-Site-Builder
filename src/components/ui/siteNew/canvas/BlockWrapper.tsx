import React, { useState, useRef } from 'react'
import { setSelectedBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/store/store'
import { selectBlockId } from 'src/store/slices/siteSlice/selectors'
import { Block } from 'src/store/slices/siteSlice'
import { BlockRenderer } from './BlockRenderer'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'

interface BlockWrapperProps {
  block: Block
}

export const BlockWrapper = ({ block }: BlockWrapperProps) => {
  const [isEditing,setIsEditing] = useState(false)
  const activeBlockId = useAppSelector(selectBlockId)
  const blockRef = useRef<HTMLDivElement>(null)
  const isBlockSelected = activeBlockId === block.id

  const dispatch = useDispatch()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  
    if (!isBlockSelected) {
      dispatch(setSelectedBlockId(block.id))
    }
    else if (isBlockSelected){
      setIsEditing(true)
    } 
  }
  
  const handleDragStart = (e:React.DragEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = calculateClickPosition(e)

    e.dataTransfer.setData('blockId',block.id)
    e.dataTransfer.setData('offsetX',offsetX.toString())
    e.dataTransfer.setData('offsetY',offsetY.toString())
  }

  return (
    <div
      ref={blockRef}
      draggable
      className={`absolute rounded-sm ${isBlockSelected ? 'border border-slate-300' : ''}`}
      style={{
        top: block.styles.top,
        left: block.styles.left,
        width: block.styles.width,
        height: block.styles.height,
      }}
      onDragStart={handleDragStart}
      onClick={handleClick}
      // onFocus={() => console.log('focus',block.type,block.id)}
      // onBlur={() => console.log('blur',block.type,block.id)}
    >
        <BlockRenderer block={block} isEditing={isEditing} setIsEditing={setIsEditing} />

        {/* {isBlockSelected && blockRef.current && createPortal(
          <div style={{position:'absolute',bottom:'5em'}}><Controls/></div>,
          blockRef.current // Controls rendered to the body or a specific div
        )} */}
    </div>
  )
}

