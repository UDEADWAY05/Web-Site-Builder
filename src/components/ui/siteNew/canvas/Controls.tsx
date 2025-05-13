import { useState, useRef, useEffect } from "react"
import { selectBlockId } from "src/store/slices/siteSlice/selectors"
import { useAppDispatch, useAppSelector } from "src/store/store"
import { blockControlsMap } from "./blockControls/blockControlsMap"
import { setSelectedBlockId } from "src/store/slices/siteSlice/siteSlice"
import { Block } from "src/store/slices/siteSlice"
import { deleteBlockThunk } from "src/store/slices/projectSlice/thunks"

export const Controls = ({ blocks }:{ blocks:Array<Block> }) => {
  const [position,setPosition] = useState({ x:400,y:50 })
  const isDraggingRef = useRef(false)
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null)

  const activeBlockId = useAppSelector(selectBlockId)
  
  const activeBlock = blocks.find(block => block.id === activeBlockId)
  const activeBlockType = activeBlock?.type
  const ControlsByType = blockControlsMap[activeBlockType]

  const dispatch = useAppDispatch()

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    isDraggingRef.current = true
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !lastMousePosition.current) return

    const deltaX = e.clientX - lastMousePosition.current.x
    const deltaY = e.clientY - lastMousePosition.current.y

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }))

    lastMousePosition.current = { x: e.clientX, y: e.clientY }
  }

  const onDelete = () => {
    if (!activeBlockId){
      return
    }

    dispatch(deleteBlockThunk(activeBlockId))
    dispatch(setSelectedBlockId(null))
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    lastMousePosition.current = null
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div 
        className="absolute flex shadow-lg items-center bg-slate-50"
        style={{ left:position.x, top:position.y }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
          className='w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded'            
          width="24"
          height="24"
          onMouseDown={handleMouseDown}
      >
        <path d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg"
          className='w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded'     
          onClick={onDelete}
          viewBox="0 0 90 170"
      >
        <path d="M75.6,44.8v73c0,3.4-2.8,6.2-6.2,6.2H21.3c-3.4,0-6.2-2.8-6.2-6.2v-73H75.6L75.6,44.8z M59.9,52.9v62.8h3.6V52.9H59.9  L59.9,52.9z M43.6,52.9v62.8h3.6V52.9H43.6L43.6,52.9z M27.3,52.9v62.8h3.6V52.9H27.3L27.3,52.9z M31.3,27.9v-5.2  c0-3.3,2.6-5.9,5.9-5.9h16.4c3.3,0,5.9,2.6,5.9,5.9v5.2h18.1c3.4,0,6.2,2.8,6.2,6.2v4.3H7V34c0-3.4,2.8-6.2,6.2-6.2H31.3L31.3,27.9z   M37.2,20.8c-1,0-1.8,0.8-1.8,1.8v5.2h20.1v-5.2c0-1-0.8-1.8-1.8-1.8H37.2L37.2,20.8z" />
      </svg>
      <ControlsByType />
    </div>
  )
}
