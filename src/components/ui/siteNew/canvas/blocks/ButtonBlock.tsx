import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice'

export type ButtonBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: Block['content']) => void
  width: number
  height: number
  styles: Block['styles']
}

export const ButtonBlock = ({
  content,
  onChange,
  isEditing,
  width,
  height,
  styles,
}: ButtonBlockProps) => {
  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        style={{ ...styles, width: `${width}px`, height: `${height}px` }}
      />
    </form>
  ) : (
    <button
      type="submit"
      style={{
        ...styles,
        width: `${width}px`,
        height: `${height}px`,
        whiteSpace: 'normal',
      }}
    >
      {content}
    </button>
  )
}
