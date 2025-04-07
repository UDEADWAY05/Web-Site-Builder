import { useDispatch } from 'react-redux'
import { DraggableBlock } from '../'
import { useAppSelector } from '../../../../store/store'
import {
  selectorLayoutSiteBgColor,
  selectorLayoutSiteData,
} from 'src/store/slices/layoutSite/selectors'
import { blockCreate } from 'src/store/slices/layoutSite'
import { BlockButtonProp } from 'src/store/slices/layoutSite/types'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { off, onValue, ref } from 'firebase/database'
import { dbSite } from 'src/App'
import { setSite } from 'src/store/slices/layoutSite/layoutSiteSlice'

export function Canvas({ blockTypes }: { blockTypes: BlockButtonProp[] }) {
  const blocks = useAppSelector(selectorLayoutSiteData)
  const bgColor = useAppSelector(selectorLayoutSiteBgColor)
  const dispatch = useDispatch()
  const { siteId } = useParams()

  console.log(blocks)

  //загрузка данных из FireBase
  useEffect(() => {
    const siteRef = ref(dbSite, `sites/${siteId}`)
    onValue(siteRef, (snapshot) => {
      const data = snapshot.val()
      dispatch(setSite(data))
    })
    return off(siteRef) // Функция для отписки
  }, [siteId])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const blockType = e.dataTransfer?.getData('blockType')
    const canvastRest = e.currentTarget.getBoundingClientRect()
    const left = e.clientX - canvastRest.left
    const top = e.clientY - canvastRest.top

    const newBlock = {
      id: Date.now(),
      type: blockType,
      styles: {
        left,
        top,
        width: 'auto',
        height: 'auto',
      },
      content: blockTypes.find((item) => item.type === blockType)
        ?.defaultContent,
    }
    dispatch(blockCreate(newBlock))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
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
      {blocks?.map((block) => (
        <DraggableBlock key={block.id} {...block} />
      ))}
    </div>
  )
}
