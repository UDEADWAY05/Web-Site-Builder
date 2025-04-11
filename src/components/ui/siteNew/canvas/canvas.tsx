import { useDispatch } from 'react-redux'
import { DraggableBlock } from '../'
import { useAppSelector } from '../../../../store/store'
import { selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { Block, BlockButton } from 'src/store/slices/siteSlice/types'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { child, dbSite, get, off, ref } from 'src/App'
import { setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { addBlock, setBlocks } from 'src/store/slices/siteSlice/siteSlice'
import { selectBlocks,selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'

export function Canvas({ blockTypes }: { blockTypes: BlockButton[] }) {
  const { siteId } = useParams()
  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const dispatch = useDispatch()

  //загрузка данных из FireBase
  useEffect(() => {
    const siteRef = ref(dbSite)
    
    get(child(siteRef, `sites/${siteId}`))
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const blockType = e.dataTransfer.getData('blockType')
    const canvastRect = e.currentTarget.getBoundingClientRect()
    const left = e.clientX - canvastRect.left
    const top = e.clientY - canvastRect.top

    const newBlock:Block = {
      id: Date.now().toString(), //TODO
      type: blockType,
      styles: {
        left,
        top,
        width: 'auto',
        height: 'auto',
      },
      
      content: blockTypes.find((item) => item.type === blockType)?.defaultContent,
    }
    // dispatch(blockCreate(newBlock))
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
            <DraggableBlock key={block.id} {...block} />
          ))}
        </div>
      )}
    </>
  )
}
