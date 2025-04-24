import { Block } from 'src/store/slices/siteSlice'

export type QuoteBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const QuoteBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: QuoteBlockProps) => {
  return isEditing ? (
    <input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Edit text"
      className="border p-2 w-full"
    />
  ) : (
    <blockquote style={styles}>
      <p>{content}</p>
    </blockquote>
  )
}
