import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'
import { useAppSelector } from 'src/store/store'
import { selectBlockId } from 'src/store/slices/siteSlice/selectors'
import { setSelectedBlockId } from 'src/store/slices/siteSlice/siteSlice'

interface BlockWrapperProps {
  block: any
  children: React.ReactNode
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children }) => {
  const [controlsPosition, setControlsPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })
  // const { selectedBlockId, editingBlockId } = useSelector((state: any) => state.editor)
  const blockRef = useRef<HTMLDivElement>(null)
  const selectedBlockId = useAppSelector(selectBlockId)  

  const dispatch = useDispatch()
  const isBlockSelected = selectedBlockId === block.id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  
    if (!isBlockSelected) {
      dispatch(setSelectedBlockId(block.id))
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
      className={`absolute px-2 py-1 rounded-sm ${isBlockSelected ? 'border border-slate-300' : ''}`}
      style={{
        top: block.styles.top,
        left: block.styles.left,
        width: block.styles.width,
        height: block.styles.height,
      }}
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      {children}

      {/* {selectedBlockId === block.id && ReactDOM.createPortal(
        <Controls style={{ position: 'absolute', top: controlsPosition.top, left: controlsPosition.left }} />,
        document.body // Controls rendered to the body or a specific div
      )} */}
      
    
      {/* {editingBlockId === block.id && (
        <input
          type="text"
          defaultValue={block.content}
          onBlur={() => dispatch(startEditingBlock(''))} // Stop editing
        />
      )} */}
    </div>
  )
}

