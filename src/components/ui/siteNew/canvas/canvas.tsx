import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch } from 'src/store/store'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../store/store'
import {
  selectBlockId,
  selectBlockButton,
  selectorPreview,
} from 'src/store/slices/siteSlice/selectors'
import {
  selectBlocks,
  selectSiteBgColor,
} from 'src/store/slices/siteSlice/selectors'
import { child, get, off, ref } from 'firebase/database'
import {
  setSelectedBlockId,
  setSelectedBlockButton,
  setSite,
} from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { BlockWrapper } from './BlockWrapper'
import { Controls } from './Controls'
import { dbSite } from 'src/firebase'
import { addBlockThunk, deleteBlockThunk } from 'src/store/slices/projectSlice/thunks'
import { Block } from 'src/store/slices/siteSlice'

export function Canvas() {
  const { siteId } = useParams()
  const [mouseOverCanvas, setMouseOverCanvas] = useState(false)

  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const userId = useAppSelector((store) => store.user.data?.id)
  const selectedBlockButton = useAppSelector(selectBlockButton)
  const activeBlockId = useAppSelector(selectBlockId)
  const ghostRef = useRef<HTMLSpanElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      const canvasRect = e.currentTarget.getBoundingClientRect()
      const relativeX = e.clientX - canvasRect.left
      const relativeY = e.clientY - canvasRect.top

      if (activeBlockId) {
        dispatch(setSelectedBlockId(null))
      }
      if (selectedBlockButton) {
        const newBlock = generateBlockByType(
          selectedBlockButton,
          relativeX,
          relativeY
        )

        dispatch(addBlockThunk(newBlock))
            .unwrap()
            .then(() => {
                dispatch(setSelectedBlockId(newBlock.id))
                dispatch(setSelectedBlockButton(null))
            })
            .catch((err) => {
                console.error('Ошибка при добавлении блока:', err)
            })
      } else {
        dispatch(setSelectedBlockId(null))
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  //delete by keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && activeBlockId) {
        dispatch(deleteBlockThunk(activeBlockId))
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
          {activeBlockId &&
            canvasRef.current &&
            createPortal(<Controls blocks={blocks} />, canvasRef.current)}
          {blocks.map((block: Block) => (
            <BlockWrapper block={block} key={block.id} />
          ))}
          {selectedBlockButton && mouseOverCanvas && (
            <span
              ref={ghostRef}
              className="absolute opacity-50 pointer-events-none"
              style={{
                border: '1px dotted lightgray',
                borderRadius: '0.3em',
                padding: '0.5em 1em',
              }}
            >
              {selectedBlockButton}
            </span>
          )}
        </div>
      )}
    </>
  )
}
