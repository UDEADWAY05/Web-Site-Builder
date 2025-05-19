import { useAppDispatch, useAppSelector } from 'src/store/store'
import {
  selectBlocks,
  selectEditingBlockId,
} from 'src/store/slices/siteSlice/selectors'
import { TextColorButton } from './controlElements/TextColorButton'
import { FontSizeButton } from './controlElements/FontSizeButton'
import { BackgroundColorButton } from './controlElements/BackgroundColorButton'
import { FontStyler } from './controlElements/FontStyler'
import { Block } from 'src/store/slices/siteSlice'
import { updateBlockStylesThunk } from 'src/store/slices/projectSlice/thunks'

export const ParagraphControls = () => {
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
        styles: { ...editingBlock.styles, backgroundColor: e.target.value },
      })
    )
  }

  const handleColorChange = (color: string) => {
    dispatch(
      updateBlockStylesThunk({
        id: editingBlockId,
        styles: { ...editingBlock.styles, color },
      })
    )
  }

  const onFontSizeChange = (size: number) =>
    dispatch(
      updateBlockStylesThunk({
        id: editingBlockId,
        styles: { ...editingBlock.styles, fontSize: size },
      })
    )

  const toggleFontStyle = (newStyles: Block['styles']) => {
    dispatch(
      updateBlockStylesThunk({
        id: editingBlock?.id,
        styles: { ...editingBlock.styles, ...newStyles },
      })
    )
  }
  return (
    <div className="flex items-center gap-1 ">
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
    </div>
  )
}
