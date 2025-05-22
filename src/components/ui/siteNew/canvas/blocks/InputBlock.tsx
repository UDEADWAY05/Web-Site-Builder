import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Block } from 'src/store/slices/siteSlice'

export type InputBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  width: number,
  height: number
  styles: Block['styles']
}

export const InputBlock = ({
  content,
  isEditing,
  onChange,
  width,
  height,
  styles,
}: InputBlockProps) => {
  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
      />
    </form>
  ) : (
    <form style={styles} className="flex gap-2">
      <Input
        id={content}
        type="text"
        value={content}
        placeholder="Edit text"
        style={{ ...styles, width: `${width}px`, height: `${height}px` }}
        onChange={(e) => e.target.value}
      />
      <Label htmlFor={content}>"Поле для ввода текста"</Label>
    </form>
  )
}
