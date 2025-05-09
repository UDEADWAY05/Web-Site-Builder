import { useAppDispatch, useAppSelector } from "src/store/store"
import { selectBlockId, selectBlocks } from "src/store/slices/siteSlice/selectors"
import { updateBlockStyles } from "src/store/slices/siteSlice/siteSlice"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"

export const DividerControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const activeBlockId = useAppSelector(selectBlockId)
  const dispatch = useAppDispatch()

  if (!activeBlockId) return null

  const editingBlock = blocks.find(block => block.id === activeBlockId)

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBlockStyles({
      id: activeBlockId,
      styles: { backgroundColor: e.target.value }
    }))
  }

  return (
    <div className="flex items-center">
      <BackgroundColorButton value={editingBlock?.styles.backgroundColor} onChange={handleBackgroundColorChange}/>   
    </div>
  )
}