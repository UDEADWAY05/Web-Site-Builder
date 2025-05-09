import { CSSProperties, JSX } from 'react'
import { Input } from 'src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'

interface HeaderBlockProps {
  content: { text: string; level: number }
  isEditing: boolean
  onChange: (newContent: { text: string; level: number }) => void
  styles?: CSSProperties
}

const HEADER_LEVELS: number[] = [1, 2, 3, 4, 5, 6]

export const HeaderBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: HeaderBlockProps) => {
  const HeaderTag = `h${content.level}` as keyof JSX.IntrinsicElements

  const handleLevelChange = (newLevel: string) => {
    const levelNum = parseInt(newLevel, 10)
    onChange({
      text: content.text,
      level: levelNum,
    })
  }

  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content.text}
        onChange={(e) =>
          onChange({
            text: e.target.value,
            level: content.level,
          })
        }
        placeholder="Edit text"
        className="border p-2 w-full"
      />
      <Select
        value={content.level.toString()}
        onValueChange={handleLevelChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={`h${content.level}`} />
        </SelectTrigger>
        <SelectContent>
          {HEADER_LEVELS.map((lvl) => (
            <SelectItem key={lvl} value={lvl.toString()}>
              {`h${lvl}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  ) : (
    <HeaderTag style={styles}>{content.text}</HeaderTag>
  )
}
