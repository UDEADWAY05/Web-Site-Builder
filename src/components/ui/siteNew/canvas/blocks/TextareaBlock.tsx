import { Textarea } from 'src/components/ui/textarea'
import { Input } from 'src/components/ui/input'
import { Block } from 'src/store/slices/siteSlice/types'
import { setEditingBlockId } from 'src/store/slices/siteSlice/siteSlice'
import { useAppDispatch } from 'src/store/store'

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
  const dispatch = useAppDispatch()
  return isEditing ? (
    <form className="flex">
      <Input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message here"
        style={{
          ...styles,
          width: `${width}px`,
          height: `${height}px`,
          resize: 'none',
        }}
      />
      <button
        type="button"
        onClick={() => dispatch(setEditingBlockId(null))}
        className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-black"
      >
        Готово
      </button>
    </form>
  ) : (
    <Textarea
      placeholder="Type your message here."
      value={content}
      style={{
        ...styles,
        width: `${width}px`,
        height: `${height}px`,
        resize: 'none',
      }}
    />
  )
}
