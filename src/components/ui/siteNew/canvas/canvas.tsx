import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/store/store'
import { useAppSelector } from '../../../../store/store'
import { selectActiveBlockButton, selectBlockId, selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { selectBlocks,selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'
import { child, dbSite, get, off, ref } from 'src/App'
import { clearSelectedBlockButton, setSelectedBlockId, setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { addBlock } from 'src/store/slices/siteSlice/siteSlice'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { BlockWrapper } from './BlockWrapper'
import { updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
import { deleteBlock } from 'src/store/slices/siteSlice/siteSlice'

export function Canvas() {
  const { siteId } = useParams()
  const [mouseOverCanvas,setMouseOverCanvas] = useState(false)

  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const userId = useAppSelector(store => store.user.data?.id)
  const activeBlockButton = useAppSelector(selectActiveBlockButton)
  const selectedBlockId = useAppSelector(selectBlockId)
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
      const newBlock = generateBlockByType(activeBlockButton.type,relativeX,relativeY)
      dispatch(addBlock(newBlock))
      dispatch(setSelectedBlockId(newBlock.id))
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
    e.preventDefault()

    const blockId = e.dataTransfer.getData('blockId')
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX') || '0')
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY') || '0')
  
    // calculating correct position when user pressed to drag inside block
    const canvasRect = e.currentTarget.getBoundingClientRect()
    const left = e.clientX - canvasRect.left - offsetX
    const top = e.clientY - canvasRect.top - offsetY
  
    if (blockId) {
      dispatch(updateBlockPosition({ id:blockId, left, top }))
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

  //delete by keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedBlockId) {
        dispatch(deleteBlock(selectedBlockId))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedBlockId, dispatch])

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
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      >
        {blocks.map((block) => (
          // <DraggableBlock 
          //   key={block.id} 
          //   block={block} 
          // />
          
          <BlockWrapper block={block} key={block.id}> 
            {/* <BlockRenderer /> */}
            {/* <div draggable key={block.id} style={block.styles}>{block.type}</div>  */}

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
            {activeBlockButton.label}
            <img src={activeBlockButton.img}/>
          </span>
        )}
      </div>
      )}
    </> 
  )
}
