import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { useParams } from 'react-router-dom'
import {
  selectBlockButton,
  selectEditingBlockId,
  selectorPreview,
  selectBlocks,
  selectSiteBgColor,
} from 'src/store/slices/siteSlice/selectors'
import {
  setEditingBlockId,
  setSelectedBlockButton,
} from 'src/store/slices/siteSlice/siteSlice'
import { Preview } from '../Preview/preview'
import { generateBlockByType } from 'src/utils/generateBlockByType'
import { BlockWrapper } from './BlockWrapper'
import {
  addBlockThunk,
  deleteBlockThunk,
  fetchSiteById,
} from 'src/store/slices/projectSlice/thunks'
import { Block } from 'src/store/slices/siteSlice'

export function Canvas() {
  const dispatch = useAppDispatch()
  const { siteId } = useParams()
  const [mouseOverCanvas, setMouseOverCanvas] = useState(false)

  const blocks = useAppSelector(selectBlocks)
  const bgColor = useAppSelector(selectSiteBgColor)
  const isPreview = useAppSelector(selectorPreview)
  const selectedBlockButton = useAppSelector(selectBlockButton)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const ghostRef = useRef<HTMLSpanElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      const canvasRect = e.currentTarget.getBoundingClientRect()
      const relativeX = e.clientX - canvasRect.left
      const relativeY = e.clientY - canvasRect.top

      if (editingBlockId) {
        dispatch(setEditingBlockId(null))
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
            dispatch(setEditingBlockId(newBlock.id))
            dispatch(setSelectedBlockButton(null))
          })
          .catch((err) => {
            console.error('Ошибка при добавлении блока:', err)
          })
      } else {
        dispatch(setEditingBlockId(null))
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
    if (siteId) {
      dispatch(fetchSiteById(siteId))
    }
  }, [dispatch, siteId])

  //delete by keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && editingBlockId) {
        dispatch(deleteBlockThunk(editingBlockId))
        dispatch(setEditingBlockId(null))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [editingBlockId, dispatch])

  return (
    <>
      {isPreview ? (
        <Preview />
      ) : (
        <div
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
          }}
        >
          {blocks.map((block: Block) => (
            <BlockWrapper {...block} key={block.id} />
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
