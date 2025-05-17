import { JSX } from 'react'
import { Button } from 'src/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { Block, HeaderBlockType } from 'src/store/slices/siteSlice/types'
import { useAppDispatch } from 'src/store/store'

interface HeaderBlockProps {
  content: HeaderBlockType['content']
  width: number
  height: number
  isEditing: boolean
  onChange: (newContent: HeaderBlockType['content']) => void
  styles: Block['styles']
}

const HEADER_LEVELS: number[] = [1, 2, 3, 4, 5, 6]

export const HeaderBlock = ({
  content,
  isEditing,
  onChange,
  styles,
}: HeaderBlockProps) => {
  const dispatch = useAppDispatch()
  const HeaderTag = `h${content.level}` as keyof JSX.IntrinsicElements

  const handleLevelChange = (newLevel: string) => {
    const levelNum = parseInt(newLevel, 10)
    onChange({
      text: content.text,
      level: levelNum,
    })
  }
  return isEditing ? (
    <form className="flex gap-2">
      <input
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
        <SelectTrigger className="w-[120px]">
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
      <Button
        type="button"
        onClick={() => dispatch(setEditingBlockId(null))}
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
      >
        Готово
      </Button>
    </form>
  ) : (
    <HeaderTag style={styles}>{content.text}</HeaderTag>
  )
}
