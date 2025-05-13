import { useAppDispatch, useAppSelector } from "src/store/store"
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

  if (!activeBlockId) return null

  const editingBlock = blocks.find(block => block.id === activeBlockId)

  const toggleFontStyle = (newStyles: React.CSSProperties) => {
    if (editingBlock) {
        dispatch(updateBlockStylesThunk({ id: editingBlock?.id, styles: newStyles }))
    }
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
      <BackgroundColorButton value={editingBlock?.styles.backgroundColor} onChange={handleBackgroundColorChange}/>   
      <TextColorButton color={editingBlock?.styles.color} onChangeColor={handleColorChange}/>
      <FontSizeButton fontSize={editingBlock?.styles.fontSize} onChangeFontSize={onFontSizeChange}/>
    </div>
  )
}