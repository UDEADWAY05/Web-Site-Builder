import { Block } from 'src/store/slices/siteSlice'

export type ParagraphBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles: Block['styles']
}

export const ParagraphBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: ParagraphBlockProps) => {
  return isEditing ? (
    <textarea value={content} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <p style={styles}>{content}</p>
  )
}
