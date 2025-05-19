import { useAppDispatch, useAppSelector } from "src/store/store"
import { Block } from "src/store/slices/siteSlice"
import { selectBlocks, selectEditingBlockId } from "src/store/slices/siteSlice/selectors"
import { TextColorButton } from "./controlElements/TextColorButton"
import { FontSizeButton } from "./controlElements/FontSizeButton"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { FontStyler } from "./controlElements/FontStyler"
import { updateBlockStylesThunk } from "src/store/slices/projectSlice/thunks"

export const ButtonControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const dispatch = useAppDispatch()

  const editingBlock = blocks.find(block => block.id === editingBlockId)

  if (!editingBlockId || !editingBlock) return null

  const toggleFontStyle = (newStyles: Block['styles']) => {
      dispatch(updateBlockStylesThunk({ id: editingBlock?.id, styles: newStyles }))
 }

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBlockStylesThunk({
      id: editingBlockId,
      styles: { backgroundColor: e.target.value }
    }))
  }

  const handleColorChange = (color:string) => {dispatch(updateBlockStylesThunk({
      id: editingBlockId,
      styles: { color }
    }))
  }

    const onFontSizeChange = (size: number) => dispatch(updateBlockStylesThunk({
    id: editingBlockId,
    styles: { fontSize: size }
  }))

  return (
    <div className="flex items-center">
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