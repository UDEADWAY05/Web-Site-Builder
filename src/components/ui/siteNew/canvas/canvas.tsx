import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/store/store'
import { useAppSelector } from '../../../../store/store'
import { selectActiveBlockButton, selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { selectBlocks,selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'
import { child, dbSite, get, off, ref } from 'src/App'
import { clearSelectedBlockButton, setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { addBlock,updateBlockPosition } from 'src/store/slices/siteSlice/siteSlice'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { BlockButton } from '../sideBar/BlockButton'


export function Canvas() {
  const { siteId } = useParams()
  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const dispatch = useAppDispatch()
  const userId = useAppSelector(store => store.user.data?.id)
  const activeBlockButton = useAppSelector(selectActiveBlockButton)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (activeBlockButton) {
      // If already selected, and user clicks again -> start editing
    dispatch(addBlock(generateBlockByType(activeBlockButton,e.clientX,e.clientY))) 
  }
  }
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
    console.log(canvasRect.left,canvasRect.top)
    const relativeX = e.clientX - canvasRect.left
    const relativeY = e.clientY - canvasRect.top

    if (activeBlockButton){
      const newBlock = generateBlockByType(activeBlockButton,relativeX,relativeY)
      dispatch(addBlock(newBlock))
      dispatch(clearSelectedBlockButton())
    }
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
        onClick={handleClick}
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
          <div className='absolute' style={block.styles}>{block.type}</div>
          // <BlockButton block={block}/>
        ))}
      </div>
      )}
    </> 
  )
}
