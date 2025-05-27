import { useAppDispatch, useAppSelector } from 'src/store/store'
import { selectBlocks, selectEditingBlockId } from 'src/store/slices/siteSlice/selectors'
import { TextColorButton } from './controlElements/TextColorButton'
import { BackgroundColorButton } from './controlElements/BackgroundColorButton'
import { FontStyler } from './controlElements/FontStyler'
import { Block } from 'src/store/slices/siteSlice'
import { updateBlockStylesThunk } from 'src/store/slices/siteSlice/thunk'

interface ListContolProps {
  block: Block
}

export const ListControls = ({block}: ListContolProps) => {
  const blocks = useAppSelector(selectBlocks)
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const editingBlock = blocks?.find((block) => block.id === editingBlockId)
  const dispatch = useAppDispatch()

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

  return (
    <div className="flex items-center gap-1">
      <FontStyler styles={block.styles} id={block.id} />
      <BackgroundColorButton
        value={editingBlock?.styles.backgroundColor ?? ''}
        onChange={handleBackgroundColorChange}
      />
      <TextColorButton
        id={block.id}
        styles={block.styles}
      />
    </div>
  )
}
