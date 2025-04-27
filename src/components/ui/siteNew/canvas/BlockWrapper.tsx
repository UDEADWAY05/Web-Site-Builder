import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { calculateClickPosition } from 'src/utils/calculateClickPosition'

interface BlockWrapperProps {
  block: any
  children: React.ReactNode
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children }) => {
  const [controlsPosition, setControlsPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })
  // const { selectedBlockId, editingBlockId } = useSelector((state: any) => state.editor)
  const blockRef = useRef<HTMLDivElement>(null)
  
  const dispatch = useDispatch()
  
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
    console.log('drag start')
    e.dataTransfer.setData('blockId',block.id)
    e.dataTransfer.setData('offsetX',offsetX.toString())
    e.dataTransfer.setData('offsetY',offsetY.toString())
  }

  return (
    <div
      ref={blockRef}
      className='absolute'
      draggable
      // className={`absolute block ${selectedBlockId === block.id ? 'border-2 border-blue-500' : ''}`}
      style={{
        top: block.styles.top,
        left: block.styles.left,
        width: block.styles.width,
        height: block.styles.height,
      }}
      onDragStart={handleDragStart}
      // onClick={handleClick}
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

