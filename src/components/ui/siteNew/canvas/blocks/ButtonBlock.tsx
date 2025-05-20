import { Input } from 'src/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import { Block } from 'src/store/slices/siteSlice'

export type ButtonBlockProps = {
  content: { text: string; type: string }
  isEditing: boolean
  onChange: (newContent: Block['content']) => void
  width: number
  height: number
  styles: Block['styles']
}

const BUTTON_TYPE = ['button', 'submit', 'reset'] as const

export const ButtonBlock = ({
  content,
  onChange,
  isEditing,
  width,
  height,
  styles,
}: ButtonBlockProps) => {
  const handleTypeChange = (value: string) => {
    onChange({
      ...content,
      type: value,
    })
  }
  const handleTextChange = (value: string) => {
    onChange({
      ...content,
      text: value,
    })
  }

  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content.text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Edit text"
        style={{ ...styles, width: `${width}px`, height: `${height}px` }}
      />
      <Select value={content.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder={content.type} />
        </SelectTrigger>
        <SelectContent>
          {BUTTON_TYPE.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  ) : (
    <button
      type={content.type as 'button' | 'submit' | 'reset'}
      style={{
        ...styles,
        width: `${width}px`,
        height: `${height}px`,
        whiteSpace: 'normal',
      }}
    >
      {content.text}
    </button>
  )
}
