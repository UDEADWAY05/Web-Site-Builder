import { Button } from 'src/components/ui/button'
import { Checkbox } from 'src/components/ui/checkbox'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Block } from 'src/store/slices/siteSlice'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

export type CheckboxBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const CheckboxBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: CheckboxBlockProps) => {
  const dispatch = useAppDispatch()
  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        className="border p-2 w-full"
      />
      <Button
        type="button"
        onClick={() => dispatch(setEditingBlockId(null))}
        className="text-black bg-gray-100 rounded p-2 hover:bg-gray-200"
      >
        Готово
      </Button>
    </form>
  ) : (
    <form style={styles} className="flex text-center gap-3">
      {/* заглушка, поправить id  */}
      <Checkbox id="checkbox" />
      <Label htmlFor="checkbox">{content}</Label>
    </form>
  )
}
