import { useAppDispatch, useAppSelector } from 'src/store/store'
import { blockControlsMap } from './blockControls/blockControlsMap'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block } from 'src/store/slices/siteSlice'
import { deleteBlockThunk } from 'src/store/slices/projectSlice/thunks'
import { selectEditingBlockId } from 'src/store/slices/siteSlice/selectors'

export const Controls = (block: Block) => {
  const editingBlockId = useAppSelector(selectEditingBlockId)

  const ControlsByType = blockControlsMap[block.type]

  const dispatch = useAppDispatch()

  const onDelete = () => {
    if (!editingBlockId) {
      return
    }

    dispatch(deleteBlockThunk(editingBlockId))
    dispatch(setEditingBlockId(null))
  }

  return (
    <div className=" flex items-center bg-slate-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded"
        onClick={onDelete}
        viewBox="0 0 90 170"
      >
        <path d="M75.6,44.8v73c0,3.4-2.8,6.2-6.2,6.2H21.3c-3.4,0-6.2-2.8-6.2-6.2v-73H75.6L75.6,44.8z M59.9,52.9v62.8h3.6V52.9H59.9  L59.9,52.9z M43.6,52.9v62.8h3.6V52.9H43.6L43.6,52.9z M27.3,52.9v62.8h3.6V52.9H27.3L27.3,52.9z M31.3,27.9v-5.2  c0-3.3,2.6-5.9,5.9-5.9h16.4c3.3,0,5.9,2.6,5.9,5.9v5.2h18.1c3.4,0,6.2,2.8,6.2,6.2v4.3H7V34c0-3.4,2.8-6.2,6.2-6.2H31.3L31.3,27.9z   M37.2,20.8c-1,0-1.8,0.8-1.8,1.8v5.2h20.1v-5.2c0-1-0.8-1.8-1.8-1.8H37.2L37.2,20.8z" />
      </svg>
      {ControlsByType && <ControlsByType />}
    </div>
  )
}
