import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Block } from 'src/store/slices/siteSlice'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

export type InputBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const InputBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: InputBlockProps) => {
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
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
      >
        Готово
      </Button>
    </form>
  ) : (
    <form style={styles} className="flex gap-2">
      <Input
        id={content}
        type="text"
        value={content}
        placeholder="Edit text"
        className="border p-2 w-full"
        onChange={(e) => e.target.value}
      />
      <Label htmlFor={content}>"Поле для ввода текста"</Label>
    </form>
  )
}
