import { useAppDispatch, useAppSelector } from "src/store/store"
import { selectBlocks, selectEditingBlockId } from "src/store/slices/siteSlice/selectors"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { updateBlockStylesThunk } from "src/store/slices/projectSlice/thunks"

export const DividerControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const dispatch = useAppDispatch()

  if (!editingBlockId) return null

  const editingBlock = blocks.find(block => block.id === editingBlockId)

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBlockStylesThunk({
      id: editingBlockId,
      styles: { backgroundColor: e.target.value }
    }))
  }

  return (
    <div className="flex items-center">
      <BackgroundColorButton value={editingBlock?.styles.backgroundColor ?? '#000000'} onChange={handleBackgroundColorChange}/>   
    </div>
  )
}