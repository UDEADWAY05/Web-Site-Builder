import { useEffect } from 'react'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { useAppSelector } from '../../../../store/store'
import { Block } from 'src/store/slices/siteSlice'
import { DraggableBlock } from '../draggableBlock/DraggableBlock'
import { selectorPreview } from 'src/store/slices/siteSlice/selectors'
import { selectBlocks,selectSiteBgColor } from 'src/store/slices/siteSlice/selectors'
import { useParams } from 'react-router-dom'
import { child, dbSite, get, off, ref } from 'src/App'
import { setSite } from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { addBlock,deleteBlock,updateBlockContent } from 'src/store/slices/siteSlice/siteSlice'
import { generateBlockByType } from 'src/utils/generateBlockByType'

export function Canvas() {
  const { siteId } = useParams()
  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const dispatch = useAppDispatch()

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
    const blockType = e.dataTransfer.getData('blockType') as Block['type'] //TODO how to make it better?
    const canvasRect = e.currentTarget.getBoundingClientRect()
    const left = e.clientX - canvasRect.left
    const top = e.clientY - canvasRect.top

    const newBlock = generateBlockByType(blockType,left,top)
    dispatch(addBlock(newBlock))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDelete = (id:string) => {dispatch(deleteBlock(id))}
  const onSave = (id:string,content:Block['content']) => {dispatch(updateBlockContent({id,content}))}

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
        <DraggableBlock 
          key={block.id} 
          block={block} 
          onDelete={() => onDelete(block.id)}
          onSave={onSave} />
      ))}
    </div>
      )}
    </>
    
  )
}
