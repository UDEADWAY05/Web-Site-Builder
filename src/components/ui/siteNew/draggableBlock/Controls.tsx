import { Block } from "src/store/slices/siteSlice"
import { Button } from '../../button'

export type ControlsProps = {
  block: Block
  onEdit: () => void
  onDelete: () => void
  onSave?: () => void
  onCancel?: () => void
}

export function Controls({ block, onEdit, onDelete }: ControlsProps) {
  return (
    <div className="flex gap-2 mb-2">
      {/* {onEdit && ( */}
        <Button variant='secondary' onClick={onEdit} className="">
          Edit
        </Button>
      {/* )} */}
      {/* {onDelete && ( */}
        <Button variant='secondary' onClick={onDelete} className="">
          Delete
        </Button>
      {/* )} */}
    </div>
  )
}
