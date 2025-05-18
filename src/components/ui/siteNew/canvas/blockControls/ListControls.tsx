import { useAppDispatch, useAppSelector } from "src/store/store"
import { selectBlocks, selectEditingBlockId } from "src/store/slices/siteSlice/selectors"
import { updateBlockStyles } from "src/store/slices/siteSlice/siteSlice"
import { TextColorButton } from "./controlElements/TextColorButton"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { FontStyler } from "./controlElements/FontStyler"
import { Block } from "src/store/slices/siteSlice"

export const ListControls = () => {
    const blocks = useAppSelector(selectBlocks)
      const editingBlockId = useAppSelector(selectEditingBlockId)
      const editingBlock = blocks.find(block => block.id === editingBlockId)
      const dispatch = useAppDispatch()    

      if (!editingBlockId || !editingBlock) return null
      
      const toggleFontStyle = (newStyles:Block['styles']) => {
        dispatch(updateBlockStyles({ id: editingBlock?.id, styles: newStyles }))
      }
    
      const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateBlockStyles({
          id: editingBlockId,
          styles: { backgroundColor: e.target.value }
        }))
      }
    
      const handleColorChange = (color:string) => {dispatch(updateBlockStyles({
          id: editingBlockId,
          styles: { color }
        }))
      }
    
      return (
        <div className="flex items-center">
          <FontStyler styles={editingBlock?.styles} onChange={toggleFontStyle}/>
          <BackgroundColorButton
             value={editingBlock?.styles.backgroundColor ?? ""}
             onChange={handleBackgroundColorChange}
          />
          <TextColorButton color={editingBlock?.styles.color ?? ""} onChangeColor={handleColorChange} />
        </div>
      )
}