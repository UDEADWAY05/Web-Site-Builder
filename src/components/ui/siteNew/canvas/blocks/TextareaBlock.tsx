import { Textarea } from 'src/components/ui/textarea'
import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice/types'

export type TextareaBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const TextareaBlock = ({
  content,
  isEditing,
  onChange,
  styles,
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
    <Textarea
      style={styles}
      placeholder="Type your message here."
      value={content}
    />
  )
}
