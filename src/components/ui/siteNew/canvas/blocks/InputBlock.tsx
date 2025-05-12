import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Block } from 'src/store/slices/siteSlice'

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
  return isEditing ? (
    <Input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Edit text"
      className="border p-2 w-full"
    />
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
