import { useAppDispatch, useAppSelector } from 'src/store/store'
import { blockControlsMap } from './blockControls/blockControlsMap'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block } from 'src/store/slices/siteSlice'
import { deleteBlockThunk } from 'src/store/slices/projectSlice/thunks'
import { selectEditingBlockId } from 'src/store/slices/siteSlice/selectors'
import { check, delete_icon } from 'src/assets'

export const Controls = (block: Block) => {
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
    <div className=" flex items-center bg-slate-50 pt-0 min-w-80">
      <button
        onClick={onSaveEditing}
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black "
      >
        <img src={check} alt="iconsave" />
      </button>
      <button
        onClick={onDelete}
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
      >
        <img src={delete_icon} alt="icondelete" />
      </button>

      {ControlsByType && <ControlsByType />}
    </div>
  )
}
