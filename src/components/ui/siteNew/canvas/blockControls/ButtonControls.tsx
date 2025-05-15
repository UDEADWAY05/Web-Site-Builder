import { useAppDispatch, useAppSelector } from "src/store/store"
import { Block } from "src/store/slices/siteSlice"
import { selectBlockId, selectBlocks } from "src/store/slices/siteSlice/selectors"
import { updateBlockStyles } from "src/store/slices/siteSlice/siteSlice"
import { TextColorButton } from "./controlElements/TextColorButton"
import { FontSizeButton } from "./controlElements/FontSizeButton"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { FontStyler } from "./controlElements/FontStyler"
import { updateBlockStylesThunk } from "src/store/slices/projectSlice/thunks"

export const ButtonControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const activeBlockId = useAppSelector(selectBlockId)
  const dispatch = useAppDispatch()

  const editingBlock = blocks.find(block => block.id === activeBlockId)

  if (!activeBlockId || !editingBlock) return null

  const toggleFontStyle = (newStyles: Block['styles']) => {
     dispatch(updateBlockStyles({ id: editingBlock?.id, styles: newStyles }))
 }

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBlockStylesThunk({
      id: activeBlockId,
      styles: { backgroundColor: e.target.value }
    }))
  }

  const handleColorChange = (color:string) => {dispatch(updateBlockStyles({
      id: activeBlockId,
      styles: { color }
    }))
  }

  const onFontSizeChange = (size:number) => dispatch(updateBlockStyles({
    id: activeBlockId,
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