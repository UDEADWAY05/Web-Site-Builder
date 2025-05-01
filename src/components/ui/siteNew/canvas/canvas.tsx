import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch } from 'src/store/store'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../store/store'
import { selectBlockId, selectBlockButton,  selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { selectBlocks,selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'
import { child, dbSite, get, off, ref } from 'src/App'
import { setSelectedBlockId, setSelectedBlockButton, setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { addBlock } from 'src/store/slices/siteSlice/siteSlice'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { BlockWrapper } from './BlockWrapper'
import { updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
import { deleteBlock } from 'src/store/slices/siteSlice/siteSlice'
import { Controls } from './Controls'

export function Canvas() {
  const { siteId } = useParams()
  const [mouseOverCanvas,setMouseOverCanvas] = useState(false)

  const blocks = useAppSelector(selectBlocks)
  console.log('blocks in canvas',blocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const userId = useAppSelector(store => store.user.data?.id)
  const selectedBlockButton = useAppSelector(selectBlockButton)
  // const selectedBlockId = useAppSelector(selectBlockId)
  const activeBlockId = useAppSelector(selectBlockId)
  const ghostRef = useRef<HTMLSpanElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    // e.stopPropagation()
    if (e.target === e.currentTarget){
      const canvasRect = e.currentTarget.getBoundingClientRect()
    const relativeX = e.clientX - canvasRect.left
    const relativeY = e.clientY - canvasRect.top

    if (activeBlockId){
      dispatch(setSelectedBlockId(null))
    }
    if (selectedBlockButton){
      const newBlock = generateBlockByType(selectedBlockButton['type'],relativeX,relativeY)
      dispatch(addBlock(newBlock))
      dispatch(setSelectedBlockId(newBlock.id))
      dispatch(setSelectedBlockButton(null))
    }
    else {
      dispatch(setSelectedBlockId(null))

    }
    }
    
    
  }

  const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    if (!selectedBlockButton) return
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
      //TODO delete outside of canvas. Now doesn't work since drop doesn't happen outside canvas

      // if (e.clientX <= canvasRect.left || e.clientY <= canvasRect.top){
      //   console.log('deleting',blockId)
      //   dispatch(deleteBlock(blockId))
      // }
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
      if (e.key === 'Delete' && activeBlockId) {
        dispatch(deleteBlock(activeBlockId))
        dispatch(setSelectedBlockId(null))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeBlockId, dispatch])

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
        onDragEnd={() => console.log('drag end')}
        style={{ 
          flex: 1,
          position: 'relative',
          backgroundColor: bgColor,
          overflow: 'hidden',
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)`,
          backgroundSize: '140px 100px',
        }}
      > 
        {activeBlockId && canvasRef.current && createPortal(<Controls blocks={blocks}/>,canvasRef.current)}
        {blocks.map((block) => (
          <BlockWrapper block={block} key={block.id} /> 
        ))}
        {selectedBlockButton && mouseOverCanvas && (
          <span
            ref={ghostRef}
            className="absolute opacity-50 pointer-events-none"
            style={{
              border:'1px dotted lightgray',
              borderRadius: '0.3em',
              padding:'0.5em 1em'
            }}
          >
            {selectedBlockButton.label}
            <img src={selectedBlockButton.img}/>
          </span>
        )}
      </div>
      )}
    </> 
  )
}
