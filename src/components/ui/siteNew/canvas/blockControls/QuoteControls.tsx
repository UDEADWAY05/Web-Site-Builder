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
import { updateBlockStylesThunk } from 'src/store/slices/projectSlice/thunks'
import { updateBlockStyles } from 'src/store/slices/siteSlice/siteSlice'

export const QuoteControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const dispatch = useAppDispatch()

  const editingBlock = blocks.find((block) => block.id === editingBlockId)

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

  const handleColorChange = (color: string) => {
    dispatch(
      updateBlockStylesThunk({
        id: editingBlockId,
        styles: { color },
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

  const toggleFontStyle = (newStyles: Block['styles']) => {
    dispatch(updateBlockStyles({ id: editingBlock?.id, styles: newStyles }))
  }

  return (
    <div className="flex align-baseline gap-1 relative">
      <FontStyler styles={editingBlock?.styles} onChange={toggleFontStyle} />
      <BackgroundColorButton
        value={editingBlock?.styles.backgroundColor ?? ''}
        onChange={handleBackgroundColorChange}
      />
      <TextColorButton
        color={editingBlock?.styles.color ?? ''}
        onChangeColor={handleColorChange}
      />
      <FontSizeButton
        fontSize={editingBlock?.styles.fontSize ?? 16}
        onChangeFontSize={onFontSizeChange}
      />
      Quote
    </div>
  )
}
