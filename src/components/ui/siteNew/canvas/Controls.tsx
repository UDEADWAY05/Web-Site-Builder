import { useAppDispatch, useAppSelector } from 'src/store/store'
import { blockControlsMap } from './blockControls/blockControlsMap'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block } from 'src/store/slices/siteSlice'
import { deleteBlockThunk } from 'src/store/slices/projectSlice/thunks'
import { selectEditingBlockId } from 'src/store/slices/siteSlice/selectors'
import { check, delete_icon } from 'src/assets'

interface ControlProps {
  block: Block
}

export const Controls = ({block}: ControlProps) => {
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

  return (
    <div className="absolute bottom-full flex items-center bg-slate-100 rounded-sm">
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

      {ControlsByType && <ControlsByType block={block}/>}
    </div>
  )
}
