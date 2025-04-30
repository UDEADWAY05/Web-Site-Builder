import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/store/store'
import { useAppSelector } from '../../../../store/store'
import { Block } from 'src/store/slices/siteSlice'
import { DraggableBlock } from '../draggableBlock/draggableBlock'
import { selectorPreview } from 'src/store/slices/siteSlice/selectors'
import {
  selectBlocks,
  selectSiteBgColor,
} from 'src/store/slices/siteSlice/selectors'
import { child, get, off, ref } from 'src/App'
import { setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import {
  addBlock,
  updateBlockPosition,
} from 'src/store/slices/siteSlice/siteSlice'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { dbSite } from 'src/firebase'

export function Canvas() {
  const { siteId } = useParams()
  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const dispatch = useAppDispatch()
  const userId = useAppSelector((store) => store.user.data?.id)

  useEffect(() => {
    const siteRef = ref(dbSite)

    get(child(siteRef, `sites/${userId}/${siteId}`))
      .then((snapsot) => {
        if (snapsot.exists()) {
          // setSites(snapsot.val())
          console.log('sval', snapsot.val())
          dispatch(setSite(snapsot.val()))
        } else {
          // заглушка - сохранить состояние в slice
          console.log('No data')
        }
      })
      .catch((err) => console.log(err))
    return off(siteRef) // Функция для отписки
  }, [dispatch, siteId, userId])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const blockType = e.dataTransfer.getData('blockType') as Block['type']
    const blockId = e.dataTransfer.getData('blockId')
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX') || '0')
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY') || '0')

    // calculating correct position when user pressed to drag inside block
    const canvasRect = e.currentTarget.getBoundingClientRect()
    const left = e.clientX - canvasRect.left - offsetX
    const top = e.clientY - canvasRect.top - offsetY

    if (blockId) {
      dispatch(
        updateBlockPosition({
          id: blockId,
          left,
          top,
        })
      )
      return
    }

    const newBlock = generateBlockByType(blockType, left, top)
    dispatch(addBlock(newBlock))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <>
      {isPreview ? (
        <Preview />
      ) : (
        <div
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: bgColor,
            overflow: 'hidden',
          }}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
        >
          {blocks.map((block) => (
            <DraggableBlock key={block.id} block={block} />
          ))}
        </div>
      )}
    </>
  )
}
