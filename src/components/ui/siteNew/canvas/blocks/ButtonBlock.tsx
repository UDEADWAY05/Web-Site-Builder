import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

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
  const dispatch = useAppDispatch()
  
  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Edit text"
        style={{ ...styles, width: `${width}px`, height: `${height}px` }}
      />
      <Button
        type="button"
        onClick={() => dispatch(setEditingBlockId(null))}
        className="text-black bg-gray-200 rounded p-2 hover:bg-gray-300"
      >
        Готово
      </Button>
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
