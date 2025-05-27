import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Block } from 'src/store/slices/siteSlice'
import {
  selectBlocks,
  selectEditingBlockId,
} from 'src/store/slices/siteSlice/selectors'
import { TextColorButton } from './controlElements/TextColorButton'
import { FontSizeButton } from './controlElements/FontSizeButton'
import { BackgroundColorButton } from './controlElements/BackgroundColorButton'
import { FontStyler } from './controlElements/FontStyler'
import { updateBlockStylesThunk } from 'src/store/slices/siteSlice/thunk'

interface TextareaControlProps {
  block: Block
}

export const TextareaControls = ({block}: TextareaControlProps) => {
  const blocks = useAppSelector(selectBlocks)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const dispatch = useAppDispatch()

  const editingBlock = blocks?.find((block) => block.id === editingBlockId)

  if (!editingBlockId || !editingBlock) return null

  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateBlockStylesThunk({
        id: editingBlockId,
        styles: { backgroundColor: e.target.value },
      })
    )
  }

  const onFontSizeChange = (size: number) =>
    dispatch(
      updateBlockStylesThunk({
        id: editingBlockId,
        styles: { fontSize: size },
      })
    )

  return (
    <div className="flex items-center gap-1 relative">
      <FontStyler styles={block.styles} id={block.id} />
      <BackgroundColorButton
        value={editingBlock?.styles.backgroundColor ?? ''}
        onChange={handleBackgroundColorChange}
      />
      <TextColorButton
        id={block.id}
        styles={block.styles}
      />
      <FontSizeButton
        fontSize={editingBlock?.styles.fontSize ?? 16}
        onChangeFontSize={onFontSizeChange}
      />
    </div>
  )
}
