import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/store/store'
import { useAppSelector } from '../../../../store/store'
import { selectActiveBlockButton, selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { selectBlocks,selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'
import { child, dbSite, get, off, ref } from 'src/App'
import { clearSelectedBlockButton, setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { addBlock } from 'src/store/slices/siteSlice/siteSlice'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { BlockWrapper } from './BlockWrapper'
import { updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
import { C } from 'vitest/dist/chunks/reporters.66aFHiyX.js'

export function Canvas() {
  const { siteId } = useParams()
  const [mouseOverCanvas,setMouseOverCanvas] = useState(false)

  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const userId = useAppSelector(store => store.user.data?.id)
  const activeBlockButton = useAppSelector(selectActiveBlockButton)
  const ghostRef = useRef<HTMLSpanElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault()

  //   const blockType = e.dataTransfer.getData('blockType') as Block['type']
  //   const blockId = e.dataTransfer.getData('blockId')
  //   const offsetX = parseFloat(e.dataTransfer.getData('offsetX') || '0')
  //   const offsetY = parseFloat(e.dataTransfer.getData('offsetY') || '0')
  
  //   const canvasRect = e.currentTarget.getBoundingClientRect()
  //   const left = e.clientX - canvasRect.left - offsetX
  //   const top = e.clientY - canvasRect.top - offsetY
  
  //   if (blockId) {
  //     dispatch(updateBlockPosition({
  //       id: blockId,
  //       left,
  //       top,
  //     }))
  //     return
  //   }
  
  //   const newBlock = generateBlockByType(blockType, left, top)
  //   dispatch(addBlock(newBlock))
  // }

  // const handleSelect = (id: string) => {
  //   dispatch(selectBlock(id))
  // }

  // const handleDrag = (id: string, x: number, y: number) => {
  //   dispatch(updateBlockPosition({ id, x, y }))
  // }

  // const handleResize = (id: string, width: number, height: number) => {
  //   dispatch(updateBlockSize({ id, width, height }))
  // }

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    const canvasRect = e.currentTarget.getBoundingClientRect()
    const relativeX = e.clientX - canvasRect.left
    const relativeY = e.clientY - canvasRect.top

    if (activeBlockButton){
      const newBlock = generateBlockByType(activeBlockButton,relativeX,relativeY)
      dispatch(addBlock(newBlock))
      dispatch(clearSelectedBlockButton())
    }
  }

  const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    if (!activeBlockButton) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (ghostRef.current) {
      requestAnimationFrame(() => {
        ghostRef.current!.style.transform = `translate(${x}px, ${y}px)`
      })
    }
  }

  const handleCanvasMouseEnter = () => setMouseOverCanvas(true)
  const handleCanvasMouseLeave = () => setMouseOverCanvas(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('handleDrop')
    e.preventDefault()

    // const blockType = e.dataTransfer.getData('blockType') as Block['type']
    const blockId = e.dataTransfer.getData('blockId')
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX') || '0')
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY') || '0')
  
    // calculating correct position when user pressed to drag inside block
    const canvasRect = e.currentTarget.getBoundingClientRect()
    const left = e.clientX - canvasRect.left - offsetX
    const top = e.clientY - canvasRect.top - offsetY
  
    if (blockId) {
      console.log(blockId)
      dispatch(updateBlockPosition({id:blockId, left, top}))
      // return
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  

  useEffect(() => {
    const siteRef = ref(dbSite)
    
    get(child(siteRef, `sites/${userId}/${siteId}`))
      .then((snapsot) => {
        if (snapsot.exists()) {
          // setSites(snapsot.val())
          console.log('sval',snapsot.val())
          dispatch(setSite(snapsot.val()))
        } else {
          // заглушка - сохранить состояние в slice
          console.log('No data')
        }
      })
      .catch((err) => console.log(err))
    return off(siteRef) // Функция для отписки
  }, [dispatch, siteId])

  return (
    <>
  { isPreview 
    ? (<Preview />)
    : (<div
        ref={canvasRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleCanvasMouseEnter}
        onMouseLeave={handleCanvasMouseLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
        flex: 1,
        position: 'relative',
        backgroundColor: bgColor,
        overflow: 'hidden',
        }}
      >
        {blocks.map((block) => (
          // <DraggableBlock 
          //   key={block.id} 
          //   block={block} 
          // />
          
          <BlockWrapper block={block}> 
            
            <div draggable key={block.id} style={block.styles}>{block.type}</div> 

          </BlockWrapper>
          //BlockRenderer??? TODO
        ))}
        {activeBlockButton && mouseOverCanvas && (
          <span
            ref={ghostRef}
            className="absolute opacity-50 pointer-events-none"
            style={{
              border:'1px dotted lightgray',
              borderRadius: '0.3em',
              padding:'0.5em 1em'
            }}
          >
            {activeBlockButton}
          </span>
        )}
      </div>
      )}
    </> 
  )
}
