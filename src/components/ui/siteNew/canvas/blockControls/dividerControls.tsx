import { useAppDispatch, useAppSelector } from "src/store/store"
import { selectBlockId, selectBlocks } from "src/store/slices/siteSlice/selectors"
import { BackgroundColorButton } from "./controlElements/BackgroundColorButton"
import { updateBlockStylesThunk } from "src/store/slices/projectSlice/thunks"

export const DividerControls = () => {
  const blocks = useAppSelector(selectBlocks)
  const activeBlockId = useAppSelector(selectBlockId)
  const dispatch = useAppDispatch()

  if (!activeBlockId) return null

  const editingBlock = blocks.find(block => block.id === activeBlockId)

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateBlockStylesThunk({
      id: activeBlockId,
      styles: { backgroundColor: e.target.value }
    }))
  }

  return (
    <div className="flex items-center">
      <BackgroundColorButton value={editingBlock?.styles.backgroundColor ?? '#000000'} onChange={handleBackgroundColorChange}/>   
    </div>
  )
}