import { useAppDispatch, useAppSelector } from 'src/store/store'
import { blockControlsMap } from './blockControls/blockControlsMap'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block } from 'src/store/slices/siteSlice'
import { deleteBlockThunk, updateBlockZIndexThunk } from 'src/store/slices/siteSlice/thunk'
import { selectEditingBlockId } from 'src/store/slices/siteSlice/selectors'
import { check, delete_icon } from 'src/assets'
import { ZIndexButton } from './blockControls/controlElements/ZIndexButton'

interface ControlProps {
  block: Block
}

export const Controls = ({ block }: ControlProps) => {
  const dispatch = useAppDispatch()
  const editingBlockId = useAppSelector(selectEditingBlockId)
  const ControlsByType = blockControlsMap[block.type]

  const onDelete = () => {
    if (!editingBlockId) {
      return
    }

    dispatch(deleteBlockThunk(editingBlockId))
    dispatch(setEditingBlockId(null))
  }

  const onSaveEditing = () => {
    if (!editingBlockId) {
      return
    }
    dispatch(setEditingBlockId(null))
  }

  const handleZIndexChange = (zIndex: number) => {
    dispatch(
      updateBlockZIndexThunk({
        id: block.id,
        zIndex: zIndex,
      })
    )
  }

  return (
    <div className="absolute bottom-full z-21 flex items-center bg-slate-100 rounded-sm">
      <ZIndexButton zindex={block.zIndex} onChangeZIndex={handleZIndexChange} />
      <button
        onClick={onSaveEditing}
        className="min-w-[40px] min-h-[40px] bg-gray-100 rounded p-2 hover:bg-gray-200 text-black flex items-center justify-center"
      >
        <img src={check} alt="iconsave" />
      </button>
      <button
        onClick={onDelete}
        className="min-w-[40px] min-h-[40px] bg-gray-100 rounded p-2 hover:bg-gray-200 text-black flex items-center justify-center"
      >
        <img src={delete_icon} alt="icondelete" />
      </button>

      {ControlsByType && <ControlsByType block={block} />}
    </div>
  )
}
