import { Textarea } from 'src/components/ui/textarea'
import { Block } from 'src/store/slices/siteSlice/types'

export type TextareaBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  width: number
  height: number
  styles: Block['styles']
}

export const TextareaBlock = ({
  content,
  isEditing,
  onChange,
  width,
  height,
  styles,
}: TextareaBlockProps) => {
  return isEditing ? (
    <form className="flex">
      <textarea
        value={content || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message here"
        style={{
          ...styles,
          width: `${width}px`,
          height: `${height}px`,
          resize: 'none',
        }}
      />
    </form>
  ) : (
    <Textarea
      placeholder="Type your message here."
      value={content}
      onChange={(e) => e.target.value}
      style={{
        ...styles,
        width: `${width}px`,
        height: `${height}px`,
        resize: 'none',
      }}
    />
  )
}
