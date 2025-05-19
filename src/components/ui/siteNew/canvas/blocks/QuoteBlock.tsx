import { Block } from 'src/store/slices/siteSlice'

export type QuoteBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  width: number
  height: number
  styles: Block['styles']
}

export const QuoteBlock = ({
  content,
  isEditing,
  onChange,
  width,
  height,
  styles,
}: QuoteBlockProps) => {
  return isEditing ? (
    <form className="flex">
      <input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        style={{ ...styles, width: `${width}px`, height: `${height}px` }}
      />
    </form>
  ) : (
    <blockquote
      style={{ ...styles, width: `${width}px`, height: `${height}px` }}
    >
      {content}
    </blockquote>
  )
}
