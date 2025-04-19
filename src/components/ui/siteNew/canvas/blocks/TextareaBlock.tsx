import { Textarea } from 'src/components/ui/textarea'
import { Input } from 'src/components/ui/input'

export type TextareaBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
}

export const TextareaBlock = ({
  content,
  isEditing,
  onChange,
}: TextareaBlockProps) => {
  return isEditing ? (
    <Input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your message here"
      className="border p-2 w-full"
    />
  ) : (
    <form className="flex gap-2">
      <Textarea placeholder="Type your message here." value={content} />
    </form>
  )
}
