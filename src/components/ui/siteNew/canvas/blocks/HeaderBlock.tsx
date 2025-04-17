import { CSSProperties, JSX, useState } from 'react'
import { Input } from 'src/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'

export type HeaderBlockProps = {
  content: string
  isEditing: boolean
  onChange: (newContent: string) => void
  styles?: CSSProperties
  onLevelChange?: (newLevel: number) => void
  level?: number
}

export const HeaderBlock = ({
  content,
  isEditing,
  onChange,
  level = 1,
  onLevelChange,
}: HeaderBlockProps) => {
  const [currentLevel, setCurrentLevel] = useState(level)
  const levelMap: number[] = [1, 2, 3, 4, 5, 6] //TODO making better
  const HeaderTag = `h${currentLevel}` as keyof JSX.IntrinsicElements

  const handleLevelChange = (newLevel: string) => {
    const levelNum = parseInt(newLevel, 10)
    setCurrentLevel(levelNum)
    if (onLevelChange) onLevelChange(levelNum)
  }

  return (
    <div>
      {isEditing ? (
        <div className="flex">
          <Input
            type="text"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Edit text"
            className="border p-2 w-full"
          />
          <Select
            value={currentLevel.toString()}
            onValueChange={handleLevelChange}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={`h${currentLevel}`} />
            </SelectTrigger>
            <SelectContent>
              {levelMap.map((lvl) => (
                <SelectItem key={lvl} value={lvl.toString()}>
                  {`h${lvl}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <HeaderTag>{content}</HeaderTag>
      )}
    </div>
  )
}
