import { useAppDispatch, useAppSelector } from "src/store/store"
import { selectBlockId, selectBlocks } from "src/store/slices/siteSlice/selectors"
import { TextColorButton } from "./controlElements/TextColorButton"
import { FontSizeButton } from "./controlElements/FontSizeButton"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { updateBlockStyles } from "src/store/slices/siteSlice/siteSlice"
import { FontStyler } from "./controlElements/FontStyler"
import { Block } from "src/store/slices/siteSlice"

export const ParagraphControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const activeBlockId = useAppSelector(selectBlockId)
  const dispatch = useAppDispatch()

  const editingBlock = blocks.find(block => block.id === activeBlockId)

  if (!activeBlockId || !editingBlock) return null

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBlockStyles({
      id: activeBlockId,
      styles: { backgroundColor: e.target.value }
    }))
  }

  const handleColorChange = (color:string) => {
    dispatch(updateBlockStyles({
      id: activeBlockId,
      styles: { color }
    }))
  }

  const onFontSizeChange = (size:number) => dispatch(
    updateBlockStyles({
      id: activeBlockId,
      styles: { fontSize: size }
  }))

  const toggleFontStyle = (newStyles: Block['styles']) => {
    dispatch(updateBlockStyles({ id: editingBlock?.id, styles: newStyles }))
  }

  return (
    <div className="flex align-baseline gap-1 relative">
      <FontStyler styles={editingBlock?.styles} onChange={toggleFontStyle}/>
      <BackgroundColorButton
        value={editingBlock?.styles.backgroundColor ?? ""}
        onChange={handleBackgroundColorChange}
      />
      <TextColorButton color={editingBlock?.styles.color ?? ""} onChangeColor={handleColorChange} />
      <FontSizeButton fontSize={editingBlock?.styles.fontSize ?? 16} onChangeFontSize={onFontSizeChange}/>
    </div>
  )
}