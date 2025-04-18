import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'

export type InputBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
}

export const InputBlock = ({
  content,
  isEditing,
  onChange,
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
    <form className="flex gap-2">
      <Input
        type="text"
        value="Поле для ввода текста"
        placeholder="Edit text"
        className="border p-2 w-full"
        onChange={(e) => e.target.value}
      />
      <Label htmlFor="checkbox">{content}</Label>
    </form>
  )
}
