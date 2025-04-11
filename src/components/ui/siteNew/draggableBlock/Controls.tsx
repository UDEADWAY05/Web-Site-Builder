import { Button } from '../../button'

type ControlsProps = {
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
  onSave: () => void
  onCancel: () => void
}

export const Controls = ({ isEditing, onEdit, onDelete, onSave, onCancel }: ControlsProps) => {
  return (
    <div className="flex gap-0.2 text-xs">
      {isEditing ? (
        <>
          <Button variant='ghost'onClick={onSave}>
            Save
          </Button>
          <Button variant='ghost' onClick={onCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button variant='secondary' onClick={onEdit}>
            Edit
          </Button>
          <Button variant='ghost' onClick={onDelete}>
            Delete
          </Button>
        </>
      )}
    </div>
  )
}
