import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/store/store'
import { selectActiveBlock } from 'src/store/slices/siteSlice/selectors'
import { clearSelectedBlock, setSelectedBlock, setSelectedBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block } from 'src/store/slices/siteSlice'
import { BlockRenderer } from './BlockRenderer'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'
import { Controls } from './Controls'

interface BlockWrapperProps {
  block: Block
}

export const BlockWrapper = ({ block }: BlockWrapperProps) => {
  const [isEditing,setIsEditing] = useState(false)
  const activeBlock = useAppSelector(selectActiveBlock)
  const blockRef = useRef<HTMLDivElement>(null)
  const isBlockSelected = activeBlock?.id === block.id

  const dispatch = useDispatch()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(clearSelectedBlock())
    // if (e.target.contains())
  
    if (!isBlockSelected) {
      dispatch(setSelectedBlockId(block.id))
      dispatch(setSelectedBlock(block))
    }
    else if (isBlockSelected){
      setIsEditing(true)
    } 
    // else if (editingBlockId !== block.id) {
    //   dispatch(startEditingBlock(block.id))
    // }
  }
  
  // const handleClick = () => {
  //   if (selectedBlockId !== block.id) {
  //     dispatch(selectBlock(block.id))  // Select the block
  //   } else if (editingBlockId !== block.id) {
  //     dispatch(startEditingBlock(block.id))  // Start editing the block
  //   }
  // }

  // When the block is selected, calculate the position of controls
  // useEffect(() => {
  //   if (selectedBlockId === block.id && blockRef.current) {
  //     const rect = blockRef.current.getBoundingClientRect()
  //     setControlsPosition({
  //       top: rect.top - 40,  // Position above the block
  //       left: rect.left,
  //     })
  //   }
  // }, [selectedBlockId, block.id])
  const handleDragStart = (e:React.DragEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = calculateClickPosition(e)

    e.dataTransfer.setData('blockId',block.id)
    e.dataTransfer.setData('offsetX',offsetX.toString())
    e.dataTransfer.setData('offsetY',offsetY.toString())

    dispatch(setSelectedBlockId(block.id))
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

